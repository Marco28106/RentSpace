package bookings

import (
	"net/http"
	"strconv"

	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Handler struct {
	service *Service
}

func NewHandler(db *gorm.DB) *Handler {
	repo := NewRepository(db)
	return &Handler{
		service: NewService(repo),
	}
}

func (h *Handler) RegisterRoutes(group *gin.RouterGroup, authMiddleware gin.HandlerFunc) {
	bookingsGroup := group.Group("/bookings")
	{
		bookingsGroup.POST("", authMiddleware, h.CreateBooking)
		bookingsGroup.GET("", authMiddleware, h.ListBookings)
		bookingsGroup.GET("/:id", authMiddleware, h.GetBooking)
		bookingsGroup.POST("/:id/cancel", authMiddleware, h.CancelBooking)
	}
}

func (h *Handler) CreateBooking(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	var req CreateBookingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid request body.", "BAD_REQUEST", nil)
		return
	}

	result, appErr := h.service.CreateBooking(userID.(string), req)
	if appErr != nil {
		response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
		return
	}

	response.Success(c, http.StatusCreated, "Booking created successfully", result)
}

func (h *Handler) GetBooking(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	bookingID := c.Param("id")
	result, appErr := h.service.GetBooking(userID.(string), bookingID)
	if appErr != nil {
		response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
		return
	}

	response.Success(c, http.StatusOK, "Booking retrieved successfully", result)
}

func (h *Handler) ListBookings(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	page := 1
	limit := 20
	if p := c.Query("page"); p != "" {
		if parsed, err := strconv.Atoi(p); err == nil && parsed > 0 {
			page = parsed
		}
	}
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil && parsed > 0 && parsed <= 100 {
			limit = parsed
		}
	}

	results, total, appErr := h.service.ListUserBookings(userID.(string), page, limit)
	if appErr != nil {
		response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
		return
	}

	response.Success(c, http.StatusOK, "Bookings retrieved successfully", gin.H{
		"items": results,
		"pagination": gin.H{
			"page":        page,
			"limit":       limit,
			"total":       total,
			"total_pages": (total + int64(limit) - 1) / int64(limit),
		},
	})
}

func (h *Handler) CancelBooking(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	bookingID := c.Param("id")
	appErr := h.service.CancelBooking(userID.(string), bookingID)
	if appErr != nil {
		response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
		return
	}

	response.Success(c, http.StatusOK, "Booking cancelled successfully", nil)
}

package payments

import (
	"net/http"

	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Handler struct {
	service *Service
}

func NewHandler(db *gorm.DB, midtransServerKey string) *Handler {
	repo := NewRepository(db)
	return &Handler{
		service: NewService(repo, midtransServerKey),
	}
}

func (h *Handler) RegisterRoutes(group *gin.RouterGroup, authMiddleware gin.HandlerFunc) {
	// Public webhook endpoint (no auth)
	group.POST("/payments/webhook", h.MidtransWebhook)

	// Authenticated payment endpoints
	paymentsGroup := group.Group("/bookings/:id/payment")
	{
		paymentsGroup.GET("", authMiddleware, h.GetPayment)
	}
}

func (h *Handler) GetPayment(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	bookingID := c.Param("id")
	result, appErr := h.service.GetPaymentByBooking(userID.(string), bookingID)
	if appErr != nil {
		response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
		return
	}

	response.Success(c, http.StatusOK, "Payment retrieved successfully", result)
}

func (h *Handler) MidtransWebhook(c *gin.Context) {
	var req MidtransWebhookRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid webhook payload.", "BAD_REQUEST", nil)
		return
	}

	appErr := h.service.HandleMidtransWebhook(req)
	if appErr != nil {
		response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
		return
	}

	response.Success(c, http.StatusOK, "Webhook processed successfully", nil)
}

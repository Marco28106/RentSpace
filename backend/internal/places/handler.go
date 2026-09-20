package places

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

func (h *Handler) RegisterRoutes(group *gin.RouterGroup, authMiddleware gin.HandlerFunc, requireOwner gin.HandlerFunc) {
	// Public place routes
	group.GET("/places", h.ListPublicPlaces)
	group.GET("/places/:id", h.GetPublicPlace)

	// Owner place management routes
	ownerGroup := group.Group("/owner/places")
	ownerGroup.Use(authMiddleware, requireOwner)
	{
		ownerGroup.POST("", h.CreatePlace)
		ownerGroup.GET("", h.ListOwnerPlaces)
		ownerGroup.GET("/:id", h.GetOwnerPlace)
		ownerGroup.PATCH("/:id", h.UpdatePlace)
		ownerGroup.DELETE("/:id", h.DeletePlace)
	}
}

func (h *Handler) CreatePlace(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	var req CreatePlaceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid request body.", "BAD_REQUEST", nil)
		return
	}

	place, appErr := h.service.CreatePlace(userID.(string), req)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusCreated, "Place created successfully", place)
}

func (h *Handler) ListOwnerPlaces(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	page, limit := getPaginationParams(c)
	items, total, appErr := h.service.ListOwnerPlaces(userID.(string), page, limit)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))
	response.Success(c, http.StatusOK, "Places retrieved successfully", response.PaginatedData{
		Items: items,
		Pagination: response.PaginationMeta{
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: totalPages,
		},
	})
}

func (h *Handler) GetOwnerPlace(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	placeID := c.Param("id")
	place, appErr := h.service.GetOwnerPlace(userID.(string), placeID)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusOK, "Place retrieved successfully", place)
}

func (h *Handler) UpdatePlace(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	var req UpdatePlaceRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid request body.", "BAD_REQUEST", nil)
		return
	}

	placeID := c.Param("id")
	place, appErr := h.service.UpdatePlace(userID.(string), placeID, req)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusOK, "Place updated successfully", place)
}

func (h *Handler) DeletePlace(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	placeID := c.Param("id")
	appErr := h.service.DeletePlace(userID.(string), placeID)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusOK, "Place deactivated successfully", nil)
}

func (h *Handler) ListPublicPlaces(c *gin.Context) {
	page, limit := getPaginationParams(c)
	filter := parsePlaceFilter(c)
	items, total, appErr := h.service.ListPublicPlaces(filter, page, limit)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))
	response.Success(c, http.StatusOK, "Places retrieved successfully", response.PaginatedData{
		Items: items,
		Pagination: response.PaginationMeta{
			Page:       page,
			Limit:      limit,
			Total:      total,
			TotalPages: totalPages,
		},
	})
}

func (h *Handler) GetPublicPlace(c *gin.Context) {
	placeID := c.Param("id")
	place, appErr := h.service.GetPublicPlace(placeID)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusOK, "Place retrieved successfully", place)
}

func getPaginationParams(c *gin.Context) (int, int) {
	page, err := strconv.Atoi(c.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		page = 1
	}

	limit, err := strconv.Atoi(c.DefaultQuery("limit", "12"))
	if err != nil || limit < 1 {
		limit = 12
	}
	if limit > 100 {
		limit = 100
	}

	return page, limit
}

func parsePlaceFilter(c *gin.Context) PlaceFilter {
	filter := PlaceFilter{
		Search:   c.Query("search"),
		Category: c.Query("category"),
		City:     c.Query("city"),
		Facility: c.Query("facility"),
		Sort:     c.Query("sort"),
	}

	if minPrice := c.Query("min_price"); minPrice != "" {
		if val, err := strconv.ParseFloat(minPrice, 64); err == nil {
			filter.MinPrice = &val
		}
	}

	if maxPrice := c.Query("max_price"); maxPrice != "" {
		if val, err := strconv.ParseFloat(maxPrice, 64); err == nil {
			filter.MaxPrice = &val
		}
	}

	if minRating := c.Query("min_rating"); minRating != "" {
		if val, err := strconv.ParseFloat(minRating, 64); err == nil {
			filter.MinRating = &val
		}
	}

	if capacity := c.Query("capacity"); capacity != "" {
		if val, err := strconv.Atoi(capacity); err == nil {
			filter.Capacity = &val
		}
	}

	return filter
}

func writeAppError(c *gin.Context, appErr *AppError) {
	response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
}
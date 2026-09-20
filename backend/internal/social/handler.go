package social

import (
	"net/http"
	"time"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Handler struct {
	db *gorm.DB
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{db: db}
}

func (h *Handler) RegisterRoutes(group *gin.RouterGroup, authMiddleware gin.HandlerFunc) {
	// Favorites
	favGroup := group.Group("/favorites")
	{
		favGroup.GET("", authMiddleware, h.ListFavorites)
		favGroup.POST("", authMiddleware, h.AddFavorite)
		favGroup.DELETE("/:placeId", authMiddleware, h.RemoveFavorite)
	}

	// Notifications
	notifGroup := group.Group("/notifications")
	{
		notifGroup.GET("", authMiddleware, h.ListNotifications)
		notifGroup.PATCH("/:id/read", authMiddleware, h.MarkAsRead)
		notifGroup.POST("/read-all", authMiddleware, h.MarkAllAsRead)
	}

	// Reviews
	reviewGroup := group.Group("/places/:id/reviews")
	{
		reviewGroup.GET("", h.ListReviews)
		reviewGroup.POST("", authMiddleware, h.CreateReview)
	}
}

func (h *Handler) ListFavorites(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	var favorites []model.Favorite
	if err := h.db.Preload("Place.Category").Preload("Place.Images").Preload("Place.Pricing").Where("user_id = ?", userUUID).Find(&favorites).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not load favorites", "INTERNAL_ERROR", nil)
		return
	}

	response.Success(c, http.StatusOK, "Favorites retrieved", gin.H{"items": favorites, "count": len(favorites)})
}

func (h *Handler) AddFavorite(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	var req struct {
		PlaceID string `json:"place_id" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid request", "BAD_REQUEST", nil)
		return
	}

	placeUUID, err := uuid.Parse(req.PlaceID)
	if err != nil {
		response.Error(c, http.StatusUnprocessableEntity, "Invalid place ID", "VALIDATION_ERROR", nil)
		return
	}

	fav := model.Favorite{
		UserID:  userUUID,
		PlaceID: placeUUID,
	}

	if err := h.db.FirstOrCreate(&fav).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not add favorite", "INTERNAL_ERROR", nil)
		return
	}

	response.Success(c, http.StatusCreated, "Added to favorites", nil)
}

func (h *Handler) RemoveFavorite(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	placeID := c.Param("placeId")
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		response.Error(c, http.StatusUnprocessableEntity, "Invalid place ID", "VALIDATION_ERROR", nil)
		return
	}

	if err := h.db.Where("user_id = ? AND place_id = ?", userUUID, placeUUID).Delete(&model.Favorite{}).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not remove favorite", "INTERNAL_ERROR", nil)
		return
	}

	response.Success(c, http.StatusOK, "Removed from favorites", nil)
}

func (h *Handler) ListNotifications(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	var notifs []model.Notification
	if err := h.db.Where("user_id = ?", userUUID).Order("created_at DESC").Limit(50).Find(&notifs).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not load notifications", "INTERNAL_ERROR", nil)
		return
	}

	var unreadCount int64
	h.db.Model(&model.Notification{}).Where("user_id = ? AND is_read = false", userUUID).Count(&unreadCount)

	response.Success(c, http.StatusOK, "Notifications retrieved", gin.H{
		"items":        notifs,
		"unread_count": unreadCount,
	})
}

func (h *Handler) MarkAsRead(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	notifID := c.Param("id")
	notifUUID, err := uuid.Parse(notifID)
	if err != nil {
		response.Error(c, http.StatusUnprocessableEntity, "Invalid notification ID", "VALIDATION_ERROR", nil)
		return
	}

	if err := h.db.Model(&model.Notification{}).Where("id = ? AND user_id = ?", notifUUID, userUUID).Update("is_read", true).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not update notification", "INTERNAL_ERROR", nil)
		return
	}

	response.Success(c, http.StatusOK, "Marked as read", nil)
}

func (h *Handler) MarkAllAsRead(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	if err := h.db.Model(&model.Notification{}).Where("user_id = ?", userUUID).Update("is_read", true).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not mark notifications as read", "INTERNAL_ERROR", nil)
		return
	}

	response.Success(c, http.StatusOK, "All notifications marked as read", nil)
}

func (h *Handler) ListReviews(c *gin.Context) {
	placeID := c.Param("id")
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		response.Error(c, http.StatusUnprocessableEntity, "Invalid place ID", "VALIDATION_ERROR", nil)
		return
	}

	var reviews []model.Review
	if err := h.db.Preload("User").Where("place_id = ?", placeUUID).Order("created_at DESC").Find(&reviews).Error; err != nil {
		response.Error(c, http.StatusInternalServerError, "Could not load reviews", "INTERNAL_ERROR", nil)
		return
	}

	response.Success(c, http.StatusOK, "Reviews retrieved", gin.H{"items": reviews, "count": len(reviews)})
}

func (h *Handler) CreateReview(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required", "UNAUTHORIZED", nil)
		return
	}
	userUUID, _ := uuid.Parse(userID.(string))

	placeID := c.Param("id")
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		response.Error(c, http.StatusUnprocessableEntity, "Invalid place ID", "VALIDATION_ERROR", nil)
		return
	}

	var req struct {
		BookingID string  `json:"booking_id" binding:"required"`
		Rating    int     `json:"rating" binding:"required"`
		Comment   *string `json:"comment"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid review payload", "BAD_REQUEST", nil)
		return
	}

	bookingUUID, err := uuid.Parse(req.BookingID)
	if err != nil {
		response.Error(c, http.StatusUnprocessableEntity, "Invalid booking ID", "VALIDATION_ERROR", nil)
		return
	}

	if req.Rating < 1 || req.Rating > 5 {
		response.Error(c, http.StatusUnprocessableEntity, "Rating must be between 1 and 5", "VALIDATION_ERROR", nil)
		return
	}

	// Verify booking eligibility
	var booking model.Booking
	if err := h.db.Where("id = ? AND user_id = ? AND place_id = ?", bookingUUID, userUUID, placeUUID).First(&booking).Error; err != nil {
		response.Error(c, http.StatusForbidden, "Booking not found or not eligible for review", "FORBIDDEN", nil)
		return
	}

	review := model.Review{
		UserID:    userUUID,
		PlaceID:   placeUUID,
		BookingID: bookingUUID,
		Rating:    req.Rating,
		Comment:   req.Comment,
		CreatedAt: time.Now(),
	}

	if err := h.db.Create(&review).Error; err != nil {
		response.Error(c, http.StatusConflict, "Review already exists for this booking", "DUPLICATE_REVIEW", nil)
		return
	}

	response.Success(c, http.StatusCreated, "Review created", review)
}

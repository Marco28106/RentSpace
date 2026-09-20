package auth

import (
	"net/http"

	"github.com/Marco28106/rentspace/backend/internal/config"
	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

const authCookieName = "rentspace_token"

type Handler struct {
	service *Service
	cfg     *config.Config
}

func NewHandler(cfg *config.Config, db *gorm.DB) *Handler {
	repo := NewRepository(db)
	tokens := NewTokenManager(cfg.JWT.Secret, cfg.JWT.ExpirationHours)
	return &Handler{
		service: NewService(repo, tokens),
		cfg:     cfg,
	}
}

func (h *Handler) RegisterRoutes(group *gin.RouterGroup) {
	authGroup := group.Group("/auth")
	{
		authGroup.POST("/register", h.Register)
		authGroup.POST("/login", h.Login)
		authGroup.POST("/logout", h.AuthMiddleware(), h.Logout)
		authGroup.GET("/me", h.AuthMiddleware(), h.Me)
		authGroup.POST("/become-owner", h.AuthMiddleware(), h.BecomeOwner)
	}
}

func (h *Handler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid request body.", "BAD_REQUEST", nil)
		return
	}

	authResponse, appErr := h.service.Register(req)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	h.setAuthCookie(c, authResponse.Token)
	response.Success(c, http.StatusCreated, "Registration successful", authResponse)
}

func (h *Handler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid request body.", "BAD_REQUEST", nil)
		return
	}

	authResponse, appErr := h.service.Login(req)
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	h.setAuthCookie(c, authResponse.Token)
	response.Success(c, http.StatusOK, "Login successful", authResponse)
}

func (h *Handler) Logout(c *gin.Context) {
	secure := h.cfg.App.Env == "production"
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(authCookieName, "", -1, "/", "", secure, true)
	response.Success(c, http.StatusOK, "Logout successful", nil)
}

func (h *Handler) Me(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	user, appErr := h.service.GetCurrentUser(userID.(string))
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusOK, "User retrieved successfully", user)
}

func (h *Handler) BecomeOwner(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
		return
	}

	user, appErr := h.service.BecomeOwner(userID.(string))
	if appErr != nil {
		writeAppError(c, appErr)
		return
	}

	response.Success(c, http.StatusOK, "Upgraded to owner successfully", user)
}

func (h *Handler) setAuthCookie(c *gin.Context, token string) {
	secure := h.cfg.App.Env == "production"
	maxAge := h.cfg.JWT.ExpirationHours * 60 * 60
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(authCookieName, token, maxAge, "/", "", secure, true)
}

func writeAppError(c *gin.Context, appErr *AppError) {
	response.Error(c, appErr.StatusCode, appErr.Message, appErr.Code, nil)
}

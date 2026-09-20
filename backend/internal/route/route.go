package route

import (
	"net/http"

	"github.com/Marco28106/rentspace/backend/internal/auth"
	"github.com/Marco28106/rentspace/backend/internal/bookings"
	"github.com/Marco28106/rentspace/backend/internal/config"
	"github.com/Marco28106/rentspace/backend/internal/middleware"
	"github.com/Marco28106/rentspace/backend/internal/payments"
	"github.com/Marco28106/rentspace/backend/internal/places"
	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/Marco28106/rentspace/backend/internal/social"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// SetupRouter initializes and configures the Gin engine with standard routes and middleware
func SetupRouter(cfg *config.Config, db *gorm.DB) *gin.Engine {
	if cfg.App.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.New()

	// Global Middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(middleware.CORSMiddleware(cfg.CORS.AllowedOrigins))

	// Root Health Check
	r.GET("/health", func(c *gin.Context) {
		response.Success(c, http.StatusOK, "RentSpace API is operational", gin.H{
			"app":     cfg.App.Name,
			"version": "1.0.0",
			"env":     cfg.App.Env,
		})
	})

	// API v1 Group
	v1 := r.Group("/api/v1")
	{
		if db != nil {
			authHandler := auth.NewHandler(cfg, db)
			authHandler.RegisterRoutes(v1)

			placesHandler := places.NewHandler(db)
			placesHandler.RegisterRoutes(v1, authHandler.AuthMiddleware(), middleware.RequireOwner())

			bookingsHandler := bookings.NewHandler(db)
			bookingsHandler.RegisterRoutes(v1, authHandler.AuthMiddleware())

			paymentsHandler := payments.NewHandler(db, cfg.Payment.MidtransServerKey)
			paymentsHandler.RegisterRoutes(v1, authHandler.AuthMiddleware())

			socialHandler := social.NewHandler(db)
			socialHandler.RegisterRoutes(v1, authHandler.AuthMiddleware())
		} else {
			authGroup := v1.Group("/auth")
			authUnavailable := func(c *gin.Context) {
				response.Error(c, http.StatusServiceUnavailable, "Authentication service is not available.", "SERVICE_UNAVAILABLE", nil)
			}
			authGroup.POST("/register", authUnavailable)
			authGroup.POST("/login", authUnavailable)
			authGroup.POST("/logout", authUnavailable)
			authGroup.GET("/me", authUnavailable)
		}

		v1.GET("/health", func(c *gin.Context) {
			dbStatus := "connected"
			if db != nil {
				sqlDB, err := db.DB()
				if err != nil || sqlDB.Ping() != nil {
					dbStatus = "disconnected"
				}
			} else {
				dbStatus = "not_initialized"
			}

			response.Success(c, http.StatusOK, "RentSpace v1 API is ready", gin.H{
				"app":      cfg.App.Name,
				"env":      cfg.App.Env,
				"database": dbStatus,
			})
		})

		// Categories List (from database)
		v1.GET("/categories", func(c *gin.Context) {
			type CategoryDTO struct {
				ID   string `json:"id"`
				Slug string `json:"slug"`
				Name string `json:"name"`
			}

			var categories []CategoryDTO
			if db != nil {
				if err := db.Table("categories").Select("id, slug, name").Scan(&categories).Error; err != nil {
					response.Error(c, http.StatusInternalServerError, "Could not load categories.", "INTERNAL_ERROR", nil)
					return
				}
			}

			response.Success(c, http.StatusOK, "Categories retrieved", gin.H{"count": len(categories), "items": categories})
		})
	}

	// 404 Route Handler
	r.NoRoute(func(c *gin.Context) {
		response.Error(c, http.StatusNotFound, "Route not found", "NOT_FOUND", nil)
	})

	return r
}
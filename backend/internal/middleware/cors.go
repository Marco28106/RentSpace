package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// CORSMiddleware configures Cross-Origin Resource Sharing based on allowed origins
func CORSMiddleware(allowedOrigins []string) gin.HandlerFunc {
	allowedMap := make(map[string]bool)
	for _, origin := range allowedOrigins {
		allowedMap[origin] = true
	}

	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")

		if origin != "" && (allowedMap[origin] || len(allowedOrigins) == 0) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		} else if origin != "" && allowedOrigins[0] == "*" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		}

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Accept, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

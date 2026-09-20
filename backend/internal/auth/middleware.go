package auth

import (
	"net/http"
	"strings"

	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/gin-gonic/gin"
)

func (h *Handler) AuthMiddleware() gin.HandlerFunc {
	tokenManager := h.service.tokens

	return func(c *gin.Context) {
		token := bearerToken(c.GetHeader("Authorization"))
		if token == "" {
			if cookieToken, err := c.Cookie(authCookieName); err == nil {
				token = cookieToken
			}
		}
		if token == "" {
			response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
			c.Abort()
			return
		}

		claims, err := tokenManager.Validate(token)
		if err != nil {
			response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
			c.Abort()
			return
		}

		c.Set("user_id", claims.Subject)
		c.Set("user_email", claims.Email)
		c.Set("user_role", claims.Role)
		c.Next()
	}
}

func bearerToken(header string) string {
	const prefix = "Bearer "
	if !strings.HasPrefix(header, prefix) {
		return ""
	}
	return strings.TrimSpace(strings.TrimPrefix(header, prefix))
}

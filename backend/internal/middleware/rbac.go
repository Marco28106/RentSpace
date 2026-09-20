package middleware

import (
	"net/http"

	"github.com/Marco28106/rentspace/backend/internal/response"
	"github.com/gin-gonic/gin"
)

// RequireRole returns a middleware that restricts access to users with one of the specified roles.
// The user role must be set by the authentication middleware (e.g., AuthMiddleware).
func RequireRole(roles ...string) gin.HandlerFunc {
	allowed := make(map[string]bool)
	for _, role := range roles {
		allowed[role] = true
	}

	return func(c *gin.Context) {
		role, exists := c.Get("user_role")
		if !exists {
			response.Error(c, http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED", nil)
			c.Abort()
			return
		}

		roleStr, ok := role.(string)
		if !ok || !allowed[roleStr] {
			response.Error(c, http.StatusForbidden, "You do not have permission to perform this action.", "FORBIDDEN", nil)
			c.Abort()
			return
		}

		c.Next()
	}
}

// RequireCustomer restricts access to CUSTOMER role only.
func RequireCustomer() gin.HandlerFunc {
	return RequireRole("CUSTOMER")
}

// RequireOwner restricts access to OWNER role only.
func RequireOwner() gin.HandlerFunc {
	return RequireRole("OWNER")
}

// RequireAdmin restricts access to ADMIN role only.
func RequireAdmin() gin.HandlerFunc {
	return RequireRole("ADMIN")
}
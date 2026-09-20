package response

import (
	"github.com/gin-gonic/gin"
)

type SuccessResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

type ErrorDetail struct {
	Code    string      `json:"code"`
	Details interface{} `json:"details,omitempty"`
}

type ErrorResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
	Error   ErrorDetail `json:"error"`
}

// Success returns a standard JSON success response
func Success(c *gin.Context, statusCode int, message string, data interface{}) {
	c.JSON(statusCode, SuccessResponse{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// Error returns a standard JSON error response
func Error(c *gin.Context, statusCode int, message string, errorCode string, details interface{}) {
	c.JSON(statusCode, ErrorResponse{
		Success: false,
		Data:    nil,
		Message: message,
		Error: ErrorDetail{
			Code:    errorCode,
			Details: details,
		},
	})
}

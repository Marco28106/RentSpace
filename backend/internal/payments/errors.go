package payments

type AppError struct {
	StatusCode int
	Message    string
	Code       string
}

func newAppError(statusCode int, message string, code string) *AppError {
	return &AppError{
		StatusCode: statusCode,
		Message:    message,
		Code:       code,
	}
}

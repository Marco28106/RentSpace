package places

type AppError struct {
	StatusCode int
	Message    string
	Code       string
}

func (e *AppError) Error() string {
	return e.Message
}

func newAppError(statusCode int, message string, code string) *AppError {
	return &AppError{
		StatusCode: statusCode,
		Message:    message,
		Code:       code,
	}
}
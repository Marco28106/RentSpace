package response

// PaginationMeta represents the standard pagination metadata
type PaginationMeta struct {
	Page       int   `json:"page"`
	Limit      int   `json:"limit"`
	Total      int64 `json:"total"`
	TotalPages int   `json:"total_pages"`
}

// PaginatedData wraps a list of items with pagination metadata
type PaginatedData struct {
	Items      interface{}    `json:"items"`
	Pagination PaginationMeta `json:"pagination"`
}
package places

import "time"

// CreatePlaceRequest represents the request body for creating a place
type CreatePlaceRequest struct {
	CategoryID  string   `json:"category_id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Address     string   `json:"address"`
	City        string   `json:"city"`
	District    *string  `json:"district,omitempty"`
	Latitude    *float64 `json:"latitude,omitempty"`
	Longitude   *float64 `json:"longitude,omitempty"`
	Capacity    *int     `json:"capacity,omitempty"`
}

// UpdatePlaceRequest represents the request body for updating a place
type UpdatePlaceRequest struct {
	CategoryID  *string  `json:"category_id,omitempty"`
	Name        *string  `json:"name,omitempty"`
	Description *string  `json:"description,omitempty"`
	Address     *string  `json:"address,omitempty"`
	City        *string  `json:"city,omitempty"`
	District    *string  `json:"district,omitempty"`
	Latitude    *float64 `json:"latitude,omitempty"`
	Longitude   *float64 `json:"longitude,omitempty"`
	Capacity    *int     `json:"capacity,omitempty"`
	Status      *string  `json:"status,omitempty"`
}

// CategoryResponse represents category data in place responses
type CategoryResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
}

// PlaceImageResponse represents an image in place responses
type PlaceImageResponse struct {
	ID        string `json:"id"`
	ImageURL  string `json:"image_url"`
	IsPrimary bool   `json:"is_primary"`
	SortOrder int    `json:"sort_order"`
}

// PlacePricingResponse represents pricing data in place responses
type PlacePricingResponse struct {
	ID        string  `json:"id"`
	DayOfWeek int     `json:"day_of_week"`
	StartTime string  `json:"start_time"`
	EndTime   string  `json:"end_time"`
	Price     float64 `json:"price"`
}

// OperatingHourResponse represents operating hours in place responses
type OperatingHourResponse struct {
	ID        string  `json:"id"`
	DayOfWeek int     `json:"day_of_week"`
	OpenTime  *string `json:"open_time,omitempty"`
	CloseTime *string `json:"close_time,omitempty"`
	IsClosed  bool    `json:"is_closed"`
}

// FacilityResponse represents a facility in place responses
type FacilityResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Icon *string `json:"icon,omitempty"`
}

// ReviewSummaryResponse represents review summary data
type ReviewSummaryResponse struct {
	AverageRating float64 `json:"average_rating"`
	ReviewCount   int     `json:"review_count"`
}

// PlaceResponse represents the public place data returned to clients
type PlaceResponse struct {
	ID          string                   `json:"id"`
	OwnerID     string                   `json:"owner_id"`
	CategoryID  string                   `json:"category_id"`
	Name        string                   `json:"name"`
	Description string                   `json:"description"`
	Address     string                   `json:"address"`
	City        string                   `json:"city"`
	District    *string                  `json:"district,omitempty"`
	Latitude    *float64                 `json:"latitude,omitempty"`
	Longitude   *float64                 `json:"longitude,omitempty"`
	Capacity    *int                     `json:"capacity,omitempty"`
	Status      string                   `json:"status"`
	CreatedAt   time.Time                `json:"created_at"`
	UpdatedAt   time.Time                `json:"updated_at"`

	// Relations
	Category       *CategoryResponse       `json:"category,omitempty"`
	Images         []PlaceImageResponse    `json:"images,omitempty"`
	Pricing        []PlacePricingResponse  `json:"pricing,omitempty"`
	OperatingHours []OperatingHourResponse `json:"operating_hours,omitempty"`
	Facilities     []FacilityResponse      `json:"facilities,omitempty"`
	ReviewSummary  *ReviewSummaryResponse  `json:"review_summary,omitempty"`
}

// PlaceListItem represents a compact place item for list endpoints
type PlaceListItem struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Category    string   `json:"category"`
	City        string   `json:"city"`
	District    *string  `json:"district,omitempty"`
	Price       *float64 `json:"price,omitempty"`
	Rating      *float64 `json:"rating,omitempty"`
	ReviewCount *int     `json:"review_count,omitempty"`
	ImageURL    *string  `json:"image_url,omitempty"`
	Status      string   `json:"status"`
}
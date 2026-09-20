package bookings

import "time"

type CreateBookingRequest struct {
	PlaceID     string  `json:"place_id" binding:"required"`
	BookingDate string  `json:"booking_date" binding:"required"` // YYYY-MM-DD
	StartTime   string  `json:"start_time" binding:"required"`   // HH:MM
	EndTime     string  `json:"end_time" binding:"required"`     // HH:MM
	Notes       *string `json:"notes,omitempty"`
}

type BookingResponse struct {
	ID              string     `json:"id"`
	UserID          string     `json:"user_id"`
	PlaceID         string     `json:"place_id"`
	BookingDate     string     `json:"booking_date"`
	StartTime       string     `json:"start_time"`
	EndTime         string     `json:"end_time"`
	DurationMinutes int        `json:"duration_minutes"`
	TotalAmount     float64    `json:"total_amount"`
	Status          string     `json:"status"`
	Notes           *string    `json:"notes,omitempty"`
	CreatedAt       time.Time  `json:"created_at"`
	UpdatedAt       time.Time  `json:"updated_at"`
	Place           *any       `json:"place,omitempty"`
	Payment         *any       `json:"payment,omitempty"`
}

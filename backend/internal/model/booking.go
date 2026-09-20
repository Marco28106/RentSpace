package model

import (
	"time"

	"github.com/google/uuid"
)

// Booking represents the bookings table
type Booking struct {
	ID              uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID          uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	PlaceID         uuid.UUID `gorm:"type:uuid;not null;index" json:"place_id"`
	BookingDate     string    `gorm:"type:date;not null;index" json:"booking_date"`
	StartTime       string    `gorm:"type:time;not null" json:"start_time"`
	EndTime         string    `gorm:"type:time;not null" json:"end_time"`
	DurationMinutes int       `gorm:"type:integer;not null" json:"duration_minutes"`
	TotalAmount     float64   `gorm:"type:decimal(12,2);not null" json:"total_amount"`
	Status          string    `gorm:"type:varchar(20);not null;default:'PENDING';index" json:"status"`
	Notes           *string   `gorm:"type:text" json:"notes,omitempty"`
	CreatedAt       time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt       time.Time `gorm:"not null;autoUpdateTime" json:"updated_at"`

	// Relations
	User    User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Place   Place    `gorm:"foreignKey:PlaceID" json:"place,omitempty"`
	Payment *Payment `gorm:"foreignKey:BookingID" json:"payment,omitempty"`
	Review  *Review  `gorm:"foreignKey:BookingID" json:"review,omitempty"`
}

// BookingStatus constants
const (
	BookingStatusPending   = "PENDING"
	BookingStatusConfirmed = "CONFIRMED"
	BookingStatusCompleted = "COMPLETED"
	BookingStatusCancelled = "CANCELLED"
	BookingStatusExpired   = "EXPIRED"
)

// Payment represents the payments table
type Payment struct {
	ID            uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	BookingID     uuid.UUID  `gorm:"type:uuid;not null;uniqueIndex" json:"booking_id"`
	Provider      string     `gorm:"type:varchar(50);not null" json:"provider"`
	TransactionID *string    `gorm:"type:varchar(255)" json:"transaction_id,omitempty"`
	Amount        float64    `gorm:"type:decimal(12,2);not null" json:"amount"`
	Status        string     `gorm:"type:varchar(20);not null;default:'UNPAID';index" json:"status"`
	PaidAt        *time.Time `gorm:"" json:"paid_at,omitempty"`
	CreatedAt     time.Time  `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt     time.Time  `gorm:"not null;autoUpdateTime" json:"updated_at"`

	// Relations
	Booking Booking `gorm:"foreignKey:BookingID" json:"booking,omitempty"`
}

// PaymentStatus constants
const (
	PaymentStatusUnpaid   = "UNPAID"
	PaymentStatusPending  = "PENDING"
	PaymentStatusPaid     = "PAID"
	PaymentStatusFailed   = "FAILED"
	PaymentStatusRefunded = "REFUNDED"
)

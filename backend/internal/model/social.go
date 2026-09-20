package model

import (
	"time"

	"github.com/google/uuid"
)

// Review represents the reviews table
type Review struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	PlaceID   uuid.UUID `gorm:"type:uuid;not null;index" json:"place_id"`
	BookingID uuid.UUID `gorm:"type:uuid;not null;uniqueIndex" json:"booking_id"`
	Rating    int       `gorm:"type:smallint;not null" json:"rating"` // 1-5
	Comment   *string   `gorm:"type:text" json:"comment,omitempty"`
	CreatedAt time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"not null;autoUpdateTime" json:"updated_at"`

	// Relations
	User    User    `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Place   Place   `gorm:"foreignKey:PlaceID" json:"place,omitempty"`
	Booking Booking `gorm:"foreignKey:BookingID" json:"booking,omitempty"`
}

// Favorite represents the favorites table (composite PK: user_id + place_id)
type Favorite struct {
	UserID    uuid.UUID `gorm:"type:uuid;primaryKey" json:"user_id"`
	PlaceID   uuid.UUID `gorm:"type:uuid;primaryKey;index" json:"place_id"`
	CreatedAt time.Time `gorm:"not null;autoCreateTime" json:"created_at"`

	// Relations
	User  User  `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Place Place `gorm:"foreignKey:PlaceID" json:"place,omitempty"`
}

// Notification represents the notifications table
type Notification struct {
	ID            uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID        uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	Type          string    `gorm:"type:varchar(50);not null" json:"type"`
	Title         string    `gorm:"type:varchar(150);not null" json:"title"`
	Message       string    `gorm:"type:text;not null" json:"message"`
	ReferenceType *string   `gorm:"type:varchar(50)" json:"reference_type,omitempty"`
	ReferenceID   *uuid.UUID `gorm:"type:uuid" json:"reference_id,omitempty"`
	IsRead        bool      `gorm:"not null;default:false;index" json:"is_read"`
	CreatedAt     time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
}

// Report represents the reports table
type Report struct {
	ID          uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	ReporterID  uuid.UUID  `gorm:"type:uuid;not null;index" json:"reporter_id"`
	TargetType  string     `gorm:"type:varchar(50);not null" json:"target_type"`
	TargetID    uuid.UUID  `gorm:"type:uuid;not null" json:"target_id"`
	Reason      string     `gorm:"type:varchar(255);not null" json:"reason"`
	Description *string    `gorm:"type:text" json:"description,omitempty"`
	Status      string     `gorm:"type:varchar(20);not null;default:'PENDING'" json:"status"`
	ResolvedBy  *uuid.UUID `gorm:"type:uuid" json:"resolved_by,omitempty"`
	ResolvedAt  *time.Time `gorm:"" json:"resolved_at,omitempty"`
	CreatedAt   time.Time  `gorm:"not null;autoCreateTime" json:"created_at"`

	// Relations
	Reporter User `gorm:"foreignKey:ReporterID" json:"reporter,omitempty"`
}

// ReportStatus constants
const (
	ReportStatusPending   = "PENDING"
	ReportStatusReviewing = "REVIEWING"
	ReportStatusResolved  = "RESOLVED"
	ReportStatusRejected  = "REJECTED"
)

// AuditLog represents the audit_logs table
type AuditLog struct {
	ID         uuid.UUID  `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID     *uuid.UUID `gorm:"type:uuid;index" json:"user_id,omitempty"`
	Action     string     `gorm:"type:varchar(100);not null" json:"action"`
	EntityType string     `gorm:"type:varchar(50);not null" json:"entity_type"`
	EntityID   *uuid.UUID `gorm:"type:uuid" json:"entity_id,omitempty"`
	Metadata   *string    `gorm:"type:jsonb" json:"metadata,omitempty"`
	CreatedAt  time.Time  `gorm:"not null;autoCreateTime" json:"created_at"`
}

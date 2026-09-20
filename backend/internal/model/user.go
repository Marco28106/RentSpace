package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// User represents the users table
type User struct {
	ID           uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name         string         `gorm:"type:varchar(100);not null" json:"name"`
	Email        string         `gorm:"type:varchar(255);not null;uniqueIndex" json:"email"`
	PasswordHash *string        `gorm:"type:text" json:"-"`
	Role         string         `gorm:"type:varchar(20);not null;default:'CUSTOMER'" json:"role"`
	AvatarURL    *string        `gorm:"type:text" json:"avatar_url,omitempty"`
	Phone        *string        `gorm:"type:varchar(30)" json:"phone,omitempty"`
	IsActive     bool           `gorm:"not null;default:true" json:"is_active"`
	CreatedAt    time.Time      `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"not null;autoUpdateTime" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`

	// Relations
	OwnerProfile  *OwnerProfile  `gorm:"foreignKey:UserID" json:"owner_profile,omitempty"`
	Bookings      []Booking      `gorm:"foreignKey:UserID" json:"bookings,omitempty"`
	Reviews       []Review       `gorm:"foreignKey:UserID" json:"reviews,omitempty"`
	Favorites     []Favorite     `gorm:"foreignKey:UserID" json:"favorites,omitempty"`
	Notifications []Notification `gorm:"foreignKey:UserID" json:"notifications,omitempty"`
}

// UserRole constants
const (
	RoleCustomer = "CUSTOMER"
	RoleOwner    = "OWNER"
	RoleAdmin    = "ADMIN"
)

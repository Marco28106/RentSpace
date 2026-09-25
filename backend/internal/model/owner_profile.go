package model

import (
	"time"

	"github.com/google/uuid"
)

// OwnerProfile represents the owner_profiles table
type OwnerProfile struct {
	ID           uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	UserID       uuid.UUID `gorm:"type:uuid;not null;uniqueIndex" json:"user_id"`
	BusinessName string    `gorm:"type:varchar(150);not null" json:"business_name"`
	Email        *string   `gorm:"type:varchar(255)" json:"email,omitempty"`
	Description  *string   `gorm:"type:text" json:"description,omitempty"`
	Address      *string   `gorm:"type:text" json:"address,omitempty"`
	Phone        *string   `gorm:"type:varchar(30)" json:"phone,omitempty"`
	Verified     bool      `gorm:"not null;default:false" json:"verified"`
	Superhost    bool      `gorm:"not null;default:false" json:"superhost"`
	CreatedAt    time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt    time.Time `gorm:"not null;autoUpdateTime" json:"updated_at"`

	// Relations
	User   User    `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

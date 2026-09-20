package model

import (
	"time"

	"github.com/google/uuid"
)

// Category represents the categories table
type Category struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name        string    `gorm:"type:varchar(100);not null;uniqueIndex" json:"name"`
	Slug        string    `gorm:"type:varchar(120);not null;uniqueIndex" json:"slug"`
	Description *string   `gorm:"type:text" json:"description,omitempty"`
	CreatedAt   time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time `gorm:"not null;autoUpdateTime" json:"updated_at"`

	// Relations
	Places []Place `gorm:"foreignKey:CategoryID" json:"places,omitempty"`
}

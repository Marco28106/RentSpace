package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Facility represents the facilities table
type Facility struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	Name      string    `gorm:"type:varchar(100);not null;uniqueIndex" json:"name"`
	Icon      *string   `gorm:"type:varchar(100)" json:"icon,omitempty"`
	CreatedAt time.Time `gorm:"not null;autoCreateTime" json:"created_at"`

	// Relations (many-to-many through place_facilities)
	Places []Place `gorm:"many2many:place_facilities;" json:"places,omitempty"`
}

// PlaceFacility represents the place_facilities join table
type PlaceFacility struct {
	PlaceID    uuid.UUID `gorm:"type:uuid;primaryKey" json:"place_id"`
	FacilityID uuid.UUID `gorm:"type:uuid;primaryKey" json:"facility_id"`
}

// Place represents the places table
type Place struct {
	ID          uuid.UUID      `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	OwnerID     uuid.UUID      `gorm:"type:uuid;not null;index" json:"owner_id"`
	CategoryID  uuid.UUID      `gorm:"type:uuid;not null;index" json:"category_id"`
	Name        string         `gorm:"type:varchar(150);not null" json:"name"`
	Description string         `gorm:"type:text;not null" json:"description"`
	Address     string         `gorm:"type:text;not null" json:"address"`
	City        string         `gorm:"type:varchar(100);not null;index" json:"city"`
	District    *string        `gorm:"type:varchar(100)" json:"district,omitempty"`
	Latitude    *float64       `gorm:"type:decimal(10,8)" json:"latitude,omitempty"`
	Longitude   *float64       `gorm:"type:decimal(11,8)" json:"longitude,omitempty"`
	Capacity    *int           `gorm:"type:integer" json:"capacity,omitempty"`
	Price       int64          `gorm:"type:bigint;default:0" json:"price"`
	ImageURL    *string        `gorm:"type:text" json:"image_url,omitempty"`
	Status      string         `gorm:"type:varchar(20);not null;default:'ACTIVE';index" json:"status"`
	CreatedAt   time.Time      `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"not null;autoUpdateTime" json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`

	Owner              User               `gorm:"foreignKey:OwnerID;references:ID" json:"owner,omitempty"`
	Category           Category           `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
	Images             []PlaceImage       `gorm:"foreignKey:PlaceID" json:"images,omitempty"`
	Pricing            []PlacePricing     `gorm:"foreignKey:PlaceID" json:"pricing,omitempty"`
	OperatingHours     []OperatingHour    `gorm:"foreignKey:PlaceID" json:"operating_hours,omitempty"`
	AvailabilityBlocks []AvailabilityBlock `gorm:"foreignKey:PlaceID" json:"availability_blocks,omitempty"`
	Facilities         []Facility         `gorm:"many2many:place_facilities;" json:"facilities,omitempty"`
	Bookings           []Booking          `gorm:"foreignKey:PlaceID" json:"bookings,omitempty"`
	Reviews            []Review           `gorm:"foreignKey:PlaceID" json:"reviews,omitempty"`
}

// PlaceStatus constants
const (
	PlaceStatusActive   = "ACTIVE"
	PlaceStatusInactive = "INACTIVE"
)

// PlaceImage represents the place_images table
type PlaceImage struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	PlaceID   uuid.UUID `gorm:"type:uuid;not null;index" json:"place_id"`
	ImageURL  string    `gorm:"type:text;not null" json:"image_url"`
	IsPrimary bool      `gorm:"not null;default:false" json:"is_primary"`
	SortOrder int       `gorm:"not null;default:0" json:"sort_order"`
	CreatedAt time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
}

// PlacePricing represents the place_pricings table
type PlacePricing struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	PlaceID   uuid.UUID `gorm:"type:uuid;not null;index" json:"place_id"`
	DayOfWeek int       `gorm:"type:smallint;not null" json:"day_of_week"` // 0=Sunday, 6=Saturday
	StartTime string    `gorm:"type:time;not null" json:"start_time"`
	EndTime   string    `gorm:"type:time;not null" json:"end_time"`
	Price     float64   `gorm:"type:decimal(12,2);not null" json:"price"`
	CreatedAt time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"not null;autoUpdateTime" json:"updated_at"`
}

func (PlacePricing) TableName() string {
	return "place_pricings"
}

// OperatingHour represents the operating_hours table
type OperatingHour struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	PlaceID   uuid.UUID `gorm:"type:uuid;not null;index" json:"place_id"`
	DayOfWeek int       `gorm:"type:smallint;not null" json:"day_of_week"` // 0=Sunday, 6=Saturday
	OpenTime  *string   `gorm:"type:time" json:"open_time,omitempty"`
	CloseTime *string   `gorm:"type:time" json:"close_time,omitempty"`
	IsClosed  bool      `gorm:"not null;default:false" json:"is_closed"`
}

// AvailabilityBlock represents the availability_blocks table
type AvailabilityBlock struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid()" json:"id"`
	PlaceID   uuid.UUID `gorm:"type:uuid;not null;index" json:"place_id"`
	StartAt   time.Time `gorm:"not null" json:"start_at"`
	EndAt     time.Time `gorm:"not null" json:"end_at"`
	Reason    *string   `gorm:"type:varchar(255)" json:"reason,omitempty"`
	CreatedAt time.Time `gorm:"not null;autoCreateTime" json:"created_at"`
}

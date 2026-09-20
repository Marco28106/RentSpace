package database

import (
	"log"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"gorm.io/gorm"
)

// Migrate runs auto-migration for all models
// NOTE: For development only. Production should use versioned SQL migrations.
func Migrate(db *gorm.DB) error {
	log.Println("Running database migrations...")

	err := db.AutoMigrate(
		// Core entities
		&model.User{},
		&model.OwnerProfile{},
		&model.Category{},

		// Place domain
		&model.Facility{},
		&model.Place{},
		&model.PlaceImage{},
		&model.PlacePricing{},
		&model.OperatingHour{},
		&model.AvailabilityBlock{},

		// Booking domain
		&model.Booking{},
		&model.Payment{},

		// Social domain
		&model.Review{},
		&model.Favorite{},
		&model.Notification{},
		&model.Report{},
		&model.AuditLog{},
	)
	if err != nil {
		return err
	}

	// Create composite index for booking overlap detection
	if !db.Migrator().HasIndex(&model.Booking{}, "idx_bookings_place_date") {
		err = db.Exec("CREATE INDEX IF NOT EXISTS idx_bookings_place_date ON bookings(place_id, booking_date)").Error
		if err != nil {
			log.Printf("Warning: Could not create composite index idx_bookings_place_date: %v\n", err)
		}
	}

	log.Println("Database migrations completed successfully")
	return nil
}

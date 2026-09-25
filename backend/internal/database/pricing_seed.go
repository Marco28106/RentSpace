package database

import (
	"fmt"
	"log"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"gorm.io/gorm"
)

func EnsurePricing(db *gorm.DB) error {
	var count int64
	if err := db.Model(&model.PlacePricing{}).Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return nil
	}
	var places []model.Place
	if err := db.Find(&places).Error; err != nil {
		return err
	}

	for _, p := range places {
		for dow := 0; dow < 7; dow++ {
			price := 150000.0
			if dow >= 5 {
				price = 175000.0
			}
			sql := fmt.Sprintf(
				"INSERT INTO place_pricings (place_id, day_of_week, start_time, end_time, price, created_at, updated_at) VALUES ('%s', %d, '08:00'::time, '23:59'::time, %f, NOW(), NOW())",
				p.ID, dow, price,
			)
			if err := db.Exec(sql).Error; err != nil {
				log.Printf("Warning: Could not insert pricing for place %s day %d: %v", p.ID, dow, err)
			}
		}
	}
	log.Printf("Seeded pricing for %d places", len(places))
	return nil
}



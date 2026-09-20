package database

import (
	"log"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Seed populates the database with initial development data
func Seed(db *gorm.DB) error {
	log.Println("Running database seed...")

	if err := seedUsers(db); err != nil {
		return err
	}
	if err := seedCategories(db); err != nil {
		return err
	}
	if err := seedFacilities(db); err != nil {
		return err
	}
	if err := seedPlaces(db); err != nil {
		return err
	}

	log.Println("Database seed completed successfully")
	return nil
}

func seedUsers(db *gorm.DB) error {
	var count int64
	db.Model(&model.User{}).Count(&count)
	if count > 0 {
		log.Println("Users already seeded, skipping...")
		return nil
	}

	password := "password123"
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	hashStr := string(hash)

	users := []model.User{
		{
			Name:         "Admin RentSpace",
			Email:        "admin@rentspace.id",
			PasswordHash: &hashStr,
			Role:         model.RoleAdmin,
			IsActive:     true,
		},
		{
			Name:         "Budi Pemilik",
			Email:        "owner@rentspace.id",
			PasswordHash: &hashStr,
			Role:         model.RoleOwner,
			IsActive:     true,
		},
		{
			Name:         "Andi Customer",
			Email:        "customer@rentspace.id",
			PasswordHash: &hashStr,
			Role:         model.RoleCustomer,
			IsActive:     true,
		},
	}

	if err := db.Create(&users).Error; err != nil {
		return err
	}

	// Create owner profile for the owner user
	var ownerUser model.User
	db.Where("email = ?", "owner@rentspace.id").First(&ownerUser)

	ownerDesc := "Penyedia lapangan olahraga dan ruang sewa terbaik di Jakarta"
	ownerAddr := "Jl. Sudirman No. 123, Jakarta Selatan"
	ownerPhone := "08123456789"
	ownerProfile := model.OwnerProfile{
		UserID:       ownerUser.ID,
		BusinessName: "Budi Sport & Space",
		Description:  &ownerDesc,
		Address:      &ownerAddr,
		Phone:        &ownerPhone,
	}
	if err := db.Create(&ownerProfile).Error; err != nil {
		return err
	}

	log.Printf("Seeded %d users (password: %s)\n", len(users), password)
	return nil
}

func seedCategories(db *gorm.DB) error {
	var count int64
	db.Model(&model.Category{}).Count(&count)
	if count > 0 {
		log.Println("Categories already seeded, skipping...")
		return nil
	}

	categories := []model.Category{
		{Name: "Futsal", Slug: "futsal", Description: strPtr("Lapangan futsal indoor dan outdoor")},
		{Name: "Badminton", Slug: "badminton", Description: strPtr("Lapangan badminton indoor")},
		{Name: "Basketball", Slug: "basketball", Description: strPtr("Lapangan basket indoor dan outdoor")},
		{Name: "Photo Studio", Slug: "photo-studio", Description: strPtr("Studio foto profesional dengan peralatan lengkap")},
		{Name: "Music Studio", Slug: "music-studio", Description: strPtr("Ruang latihan dan rekaman musik")},
		{Name: "Meeting Room", Slug: "meeting-room", Description: strPtr("Ruang meeting dan rapat profesional")},
		{Name: "Coworking Space", Slug: "coworking-space", Description: strPtr("Ruang kerja bersama modern")},
		{Name: "Classroom", Slug: "classroom", Description: strPtr("Ruang kelas dan pelatihan")},
		{Name: "Event Venue", Slug: "event-venue", Description: strPtr("Venue untuk acara dan event")},
	}

	if err := db.Create(&categories).Error; err != nil {
		return err
	}

	log.Printf("Seeded %d categories\n", len(categories))
	return nil
}

func seedFacilities(db *gorm.DB) error {
	var count int64
	db.Model(&model.Facility{}).Count(&count)
	if count > 0 {
		log.Println("Facilities already seeded, skipping...")
		return nil
	}

	facilities := []model.Facility{
		{Name: "Parking", Icon: strPtr("car")},
		{Name: "Wi-Fi", Icon: strPtr("wifi")},
		{Name: "Air Conditioning", Icon: strPtr("snowflake")},
		{Name: "Projector", Icon: strPtr("projector")},
		{Name: "Sound System", Icon: strPtr("speaker")},
		{Name: "Locker", Icon: strPtr("lock")},
		{Name: "Shower", Icon: strPtr("shower-head")},
		{Name: "Toilet", Icon: strPtr("toilet")},
		{Name: "Changing Room", Icon: strPtr("door-open")},
		{Name: "CCTV", Icon: strPtr("cctv")},
		{Name: "Canteen", Icon: strPtr("utensils")},
		{Name: "First Aid", Icon: strPtr("first-aid")},
	}

	if err := db.Create(&facilities).Error; err != nil {
		return err
	}

	log.Printf("Seeded %d facilities\n", len(facilities))
	return nil
}

func seedPlaces(db *gorm.DB) error {
	var count int64
	db.Model(&model.Place{}).Count(&count)
	if count > 0 {
		log.Println("Places already seeded, skipping...")
		return nil
	}

	// Find an owner and a category to relate
	var owner model.OwnerProfile
	if err := db.First(&owner).Error; err != nil {
		return err
	}
	var category model.Category
	if err := db.Where("slug = ?", "futsal").First(&category).Error; err != nil {
		return err
	}

	places := []model.Place{
		{
			OwnerID:     owner.UserID,
			CategoryID:  category.ID,
			Name:        "Budi Futsal Arena",
			Description: "Indoor futsal arena with quality turf and lights",
			Address:     "Jl. Sudirman No. 123",
			City:        "Jakarta",
			Capacity:    intPtr(20),
			Status:      model.PlaceStatusActive,
		},
	}

	if err := db.Create(&places).Error; err != nil {
		return err
	}

	log.Printf("Seeded %d places\n", len(places))
	return nil
}

func intPtr(i int) *int { return &i }

func strPtr(s string) *string {
	return &s
}

package places

import (
	"errors"
	"strings"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) CreatePlace(place *model.Place) error {
	return r.db.Create(place).Error
}

func (r *Repository) CreatePlaceImage(image *model.PlaceImage) error {
	return r.db.Create(image).Error
}

func (r *Repository) CreatePlacePricing(pricing *model.PlacePricing) error {
	return r.db.Create(pricing).Error
}

func (r *Repository) UpdatePricingByPlaceID(placeID uuid.UUID, price int64) error {
	return r.db.Model(&model.PlacePricing{}).Where("place_id = ?", placeID).Update("price", price).Error
}

func (r *Repository) FindPlaceByID(id uuid.UUID) (*model.Place, error) {
	var place model.Place
	if err := r.db.Preload("Category").Preload("Images").Preload("Pricing").Preload("OperatingHours").Preload("Facilities").Preload("Reviews").Preload("Owner.OwnerProfile").First(&place, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &place, nil
}

func (r *Repository) FindOwnerPlaceByID(ownerID uuid.UUID, placeID uuid.UUID) (*model.Place, error) {
	var place model.Place
	if err := r.db.Where("id = ? AND owner_id = ?", placeID, ownerID).First(&place).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &place, nil
}

func (r *Repository) ListOwnerPlaces(ownerID uuid.UUID, page int, limit int) ([]model.Place, int64, error) {
	offset := (page - 1) * limit

	var places []model.Place
	if err := r.db.Where("owner_id = ?", ownerID).Preload("Category").Preload("Images").Order("created_at DESC").Limit(limit).Offset(offset).Find(&places).Error; err != nil {
		return nil, 0, err
	}

	var total int64
	if err := r.db.Model(&model.Place{}).Where("owner_id = ?", ownerID).Count(&total).Error; err != nil {
		return nil, 0, err
	}

	return places, total, nil
}

func (r *Repository) GetBookingsByDate(placeID uuid.UUID, date string) ([]model.Booking, error) {
	var bookings []model.Booking
	if err := r.db.Where("place_id = ? AND booking_date = ?", placeID, date).Find(&bookings).Error; err != nil {
		return nil, err
	}
	return bookings, nil
}

func (r *Repository) UpdatePlace(place *model.Place) error {
	return r.db.Save(place).Error
}

func (r *Repository) DeletePlace(place *model.Place) error {
	return r.db.Delete(place).Error
}

func (r *Repository) FindOwnerProfileByUserID(userID uuid.UUID) (*model.OwnerProfile, error) {
	var owner model.OwnerProfile
	if err := r.db.Where("user_id = ?", userID).First(&owner).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &owner, nil
}

func (r *Repository) FindCategoryByID(id uuid.UUID) (*model.Category, error) {
	var category model.Category
	if err := r.db.First(&category, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &category, nil
}

// PlaceFilter represents search/filter criteria for public place listing
type PlaceFilter struct {
	Search    string
	Category  string
	City      string
	MinPrice  *int64
	MaxPrice  *int64
	MinRating *float64
	Capacity  *int
	Facility  string
	Sort      string
}

func (r *Repository) ListPlaces(filter PlaceFilter, page int, limit int) ([]model.Place, int64, error) {
	offset := (page - 1) * limit

	query := r.db.Model(&model.Place{}).Where("status = ?", model.PlaceStatusActive)

	// Apply search filter on name, description, city, address
	if strings.TrimSpace(filter.Search) != "" {
		searchTerm := "%" + strings.TrimSpace(filter.Search) + "%"
		query = query.Where("(name ILIKE ? OR description ILIKE ? OR city ILIKE ? OR address ILIKE ?)",
			searchTerm, searchTerm, searchTerm, searchTerm)
	}

	// Apply category filter (by slug)
	if strings.TrimSpace(filter.Category) != "" {
		query = query.Joins("JOIN categories ON categories.id = places.category_id").
			Where("categories.slug = ?", filter.Category)
	}

	// Apply city filter
	if strings.TrimSpace(filter.City) != "" {
		query = query.Where("city ILIKE ?", "%"+strings.TrimSpace(filter.City)+"%")
	}

	// Apply price filters via places.price
	if filter.MinPrice != nil || filter.MaxPrice != nil {
		if filter.MinPrice != nil {
			query = query.Where("price >= ?", *filter.MinPrice)
		}
		if filter.MaxPrice != nil {
			query = query.Where("price <= ?", *filter.MaxPrice)
		}
	}

	// Apply capacity filter
	if filter.Capacity != nil {
		query = query.Where("capacity >= ?", *filter.Capacity)
	}

	// Apply minimum rating filter via reviews
	if filter.MinRating != nil {
		query = query.Joins("LEFT JOIN reviews ON reviews.place_id = places.id").
			Group("places.id").
			Having("COALESCE(AVG(reviews.rating), 0) >= ?", *filter.MinRating)
	}

	// Apply facility filter
	if strings.TrimSpace(filter.Facility) != "" {
		query = query.Joins("JOIN place_facilities ON place_facilities.place_id = places.id").
			Joins("JOIN facilities ON facilities.id = place_facilities.facility_id").
			Where("facilities.name ILIKE ?", "%"+strings.TrimSpace(filter.Facility)+"%")
	}

	// Count total before pagination
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Apply sorting
	switch filter.Sort {
	case "price_low":
		query = query.Order("price ASC")
	case "price_high":
		query = query.Order("price DESC")
	case "rating":
		query = query.Order("rating DESC")
	case "newest":
		query = query.Order("created_at DESC")
	default:
		query = query.Order("created_at DESC")
	}

	// Apply pagination
	var places []model.Place
	if err := query.Select("places.*").Preload("Category").Preload("Images").Preload("Pricing").Limit(limit).Offset(offset).Find(&places).Error; err != nil {
		return nil, 0, err
	}

	return places, total, nil
}
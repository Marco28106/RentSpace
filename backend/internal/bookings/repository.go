package bookings

import (
	"errors"

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

func (r *Repository) DB() *gorm.DB {
	return r.db
}

func (r *Repository) CreateBooking(tx *gorm.DB, booking *model.Booking) error {
	db := r.db
	if tx != nil {
		db = tx
	}
	return db.Create(booking).Error
}

func (r *Repository) HasConflict(tx *gorm.DB, placeID uuid.UUID, bookingDate string, startTime string, endTime string) (bool, error) {
	db := r.db
	if tx != nil {
		db = tx
	}

	var count int64
	// Overlap check: existing.start_time < new.end_time AND existing.end_time > new.start_time
	// Status checked: PENDING or CONFIRMED
	err := db.Model(&model.Booking{}).
		Where("place_id = ? AND booking_date = ?", placeID, bookingDate).
		Where("status IN ('PENDING', 'CONFIRMED')").
		Where("start_time < ? AND end_time > ?", endTime, startTime).
		Count(&count).Error

	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func (r *Repository) FindBookingByID(id uuid.UUID) (*model.Booking, error) {
	var booking model.Booking
	if err := r.db.Preload("Place").Preload("Payment").Preload("User").First(&booking, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &booking, nil
}

func (r *Repository) ListUserBookings(userID uuid.UUID, page int, limit int) ([]model.Booking, int64, error) {
	offset := (page - 1) * limit
	var bookings []model.Booking

	query := r.db.Model(&model.Booking{}).Where("user_id = ?", userID)

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := query.Preload("Place").Preload("Payment").Order("created_at DESC").Limit(limit).Offset(offset).Find(&bookings).Error; err != nil {
		return nil, 0, err
	}

	return bookings, total, nil
}

func (r *Repository) ListOwnerBookings(ownerID uuid.UUID, page int, limit int) ([]model.Booking, int64, error) {
	offset := (page - 1) * limit
	var bookings []model.Booking

	query := r.db.Model(&model.Booking{}).
		Joins("JOIN places ON places.id = bookings.place_id").
		Where("places.owner_id = ?", ownerID)

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	if err := query.Preload("Place").Preload("Payment").Preload("User").Order("bookings.created_at DESC").Limit(limit).Offset(offset).Find(&bookings).Error; err != nil {
		return nil, 0, err
	}

	return bookings, total, nil
}

func (r *Repository) UpdateBooking(booking *model.Booking) error {
	return r.db.Save(booking).Error
}

func (r *Repository) FindPlaceByID(id uuid.UUID) (*model.Place, error) {
	var place model.Place
	if err := r.db.Preload("Pricing").First(&place, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &place, nil
}

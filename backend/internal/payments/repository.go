package payments

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

func (r *Repository) FindPaymentByBookingID(bookingID uuid.UUID) (*model.Payment, error) {
	var payment model.Payment
	if err := r.db.Preload("Booking").First(&payment, "booking_id = ?", bookingID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &payment, nil
}

func (r *Repository) FindPaymentByID(id uuid.UUID) (*model.Payment, error) {
	var payment model.Payment
	if err := r.db.Preload("Booking").First(&payment, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &payment, nil
}

func (r *Repository) FindBookingByID(id uuid.UUID) (*model.Booking, error) {
	var booking model.Booking
	if err := r.db.First(&booking, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &booking, nil
}

func (r *Repository) UpdatePayment(payment *model.Payment) error {
	return r.db.Save(payment).Error
}

func (r *Repository) UpdateBooking(booking *model.Booking) error {
	return r.db.Save(booking).Error
}

func (r *Repository) DB() *gorm.DB {
	return r.db
}

package bookings

import (
	"net/http"
	"strings"
	"time"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/google/uuid"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreateBooking(userID string, req CreateBookingRequest) (*BookingResponse, *AppError) {
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	placeUUID, err := uuid.Parse(req.PlaceID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place ID must be valid UUID.", "VALIDATION_ERROR")
	}

	// Validate date format
	bookingDate := strings.TrimSpace(req.BookingDate)
	if _, err := time.Parse("2006-01-02", bookingDate); err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Booking date must be YYYY-MM-DD format.", "VALIDATION_ERROR")
	}

	// Parse times
	startTime := strings.TrimSpace(req.StartTime)
	endTime := strings.TrimSpace(req.EndTime)
	if startTime == "" || endTime == "" {
		return nil, newAppError(http.StatusUnprocessableEntity, "Start time and end time required.", "VALIDATION_ERROR")
	}

	// Validate time format
	if _, err := time.Parse("15:04", startTime); err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Start time must be HH:MM format.", "VALIDATION_ERROR")
	}
	if _, err := time.Parse("15:04", endTime); err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "End time must be HH:MM format.", "VALIDATION_ERROR")
	}

	if startTime >= endTime {
		return nil, newAppError(http.StatusUnprocessableEntity, "Start time must be before end time.", "VALIDATION_ERROR")
	}

	// Load place with pricing
	place, err := s.repo.FindPlaceByID(placeUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
	}
	if place == nil {
		return nil, newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
	}
	if place.Status != model.PlaceStatusActive {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place is not available.", "PLACE_UNAVAILABLE")
	}

	// Calculate duration and price
	startT, _ := time.Parse("15:04", startTime)
	endT, _ := time.Parse("15:04", endTime)
	duration := int(endT.Sub(startT).Minutes())
	if duration <= 0 {
		return nil, newAppError(http.StatusUnprocessableEntity, "Duration must be positive.", "VALIDATION_ERROR")
	}

	// Get price from pricing table
	price := s.calculatePrice(place, bookingDate, startTime, endTime, duration)
	if price <= 0 {
		return nil, newAppError(http.StatusUnprocessableEntity, "Could not calculate price.", "PRICE_CALCULATION_ERROR")
	}

	// Use transaction to prevent double-booking race condition
	tx := s.repo.DB().Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	// Lock on (place_id, booking_date) for pessimistic locking
	conflict, err := s.repo.HasConflict(tx, placeUUID, bookingDate, startTime, endTime)
	if err != nil {
		tx.Rollback()
		return nil, newAppError(http.StatusInternalServerError, "Could not check availability.", "INTERNAL_ERROR")
	}
	if conflict {
		tx.Rollback()
		return nil, newAppError(http.StatusConflict, "Selected time slot is no longer available.", "BOOKING_SLOT_UNAVAILABLE")
	}

	// Create booking
	booking := &model.Booking{
		UserID:          userUUID,
		PlaceID:         placeUUID,
		BookingDate:     bookingDate,
		StartTime:       startTime,
		EndTime:         endTime,
		DurationMinutes: duration,
		TotalAmount:     price,
		Status:          model.BookingStatusPending,
		Notes:           req.Notes,
	}

	if err := s.repo.CreateBooking(tx, booking); err != nil {
		tx.Rollback()
		return nil, newAppError(http.StatusInternalServerError, "Could not create booking.", "INTERNAL_ERROR")
	}

	// Create payment record
	payment := &model.Payment{
		BookingID: booking.ID,
		Provider:  "MIDTRANS",
		Amount:    price,
		Status:    model.PaymentStatusUnpaid,
	}
	if err := tx.Create(payment).Error; err != nil {
		tx.Rollback()
		return nil, newAppError(http.StatusInternalServerError, "Could not create payment record.", "INTERNAL_ERROR")
	}

	if err := tx.Commit().Error; err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not complete booking transaction.", "INTERNAL_ERROR")
	}

	return mapBookingResponse(booking), nil
}

func (s *Service) GetBooking(userID string, bookingID string) (*BookingResponse, *AppError) {
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	bookingUUID, err := uuid.Parse(bookingID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Booking ID must be valid UUID.", "VALIDATION_ERROR")
	}

	booking, err := s.repo.FindBookingByID(bookingUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load booking.", "INTERNAL_ERROR")
	}
	if booking == nil {
		return nil, newAppError(http.StatusNotFound, "Booking not found.", "BOOKING_NOT_FOUND")
	}

	// Authorization: only customer who made booking or owner of place
	if booking.UserID != userUUID {
		// Could also check if user is owner of place - skipped for MVP
		return nil, newAppError(http.StatusForbidden, "You do not have permission to view this booking.", "FORBIDDEN")
	}

	return mapBookingResponse(booking), nil
}

func (s *Service) ListUserBookings(userID string, page int, limit int) ([]BookingResponse, int64, *AppError) {
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return nil, 0, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	bookings, total, err := s.repo.ListUserBookings(userUUID, page, limit)
	if err != nil {
		return nil, 0, newAppError(http.StatusInternalServerError, "Could not load bookings.", "INTERNAL_ERROR")
	}

	responses := []BookingResponse{}
	for _, b := range bookings {
		responses = append(responses, *mapBookingResponse(&b))
	}

	return responses, total, nil
}

func (s *Service) CancelBooking(userID string, bookingID string) *AppError {
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		return newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	bookingUUID, err := uuid.Parse(bookingID)
	if err != nil {
		return newAppError(http.StatusUnprocessableEntity, "Booking ID must be valid UUID.", "VALIDATION_ERROR")
	}

	booking, err := s.repo.FindBookingByID(bookingUUID)
	if err != nil {
		return newAppError(http.StatusInternalServerError, "Could not load booking.", "INTERNAL_ERROR")
	}
	if booking == nil {
		return newAppError(http.StatusNotFound, "Booking not found.", "BOOKING_NOT_FOUND")
	}

	if booking.UserID != userUUID {
		return newAppError(http.StatusForbidden, "You do not have permission to cancel this booking.", "FORBIDDEN")
	}

	if booking.Status == model.BookingStatusCancelled {
		return newAppError(http.StatusUnprocessableEntity, "Booking is already cancelled.", "BOOKING_ALREADY_CANCELLED")
	}

	if booking.Status == model.BookingStatusCompleted {
		return newAppError(http.StatusUnprocessableEntity, "Cannot cancel completed booking.", "BOOKING_COMPLETED")
	}

	booking.Status = model.BookingStatusCancelled
	if err := s.repo.UpdateBooking(booking); err != nil {
		return newAppError(http.StatusInternalServerError, "Could not cancel booking.", "INTERNAL_ERROR")
	}

	return nil
}

func (s *Service) calculatePrice(place *model.Place, bookingDate string, startTime string, endTime string, durationMinutes int) float64 {
	if len(place.Pricing) == 0 {
		return 0
	}

	// For MVP: use first pricing entry (simple pricing)
	// TODO: extend to support time-based pricing
	basePrice := place.Pricing[0].Price
	durationHours := float64(durationMinutes) / 60.0
	return basePrice * durationHours
}

func mapBookingResponse(booking *model.Booking) *BookingResponse {
	return &BookingResponse{
		ID:              booking.ID.String(),
		UserID:          booking.UserID.String(),
		PlaceID:         booking.PlaceID.String(),
		BookingDate:     booking.BookingDate,
		StartTime:       booking.StartTime,
		EndTime:         booking.EndTime,
		DurationMinutes: booking.DurationMinutes,
		TotalAmount:     booking.TotalAmount,
		Status:          booking.Status,
		Notes:           booking.Notes,
		CreatedAt:       booking.CreatedAt,
		UpdatedAt:       booking.UpdatedAt,
	}
}

package payments

import (
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/google/uuid"
)

type Service struct {
	repo            *Repository
	midtransServerKey string
}

func NewService(repo *Repository, midtransServerKey string) *Service {
	return &Service{
		repo:            repo,
		midtransServerKey: midtransServerKey,
	}
}

func (s *Service) GetPaymentByBooking(userID string, bookingID string) (*PaymentResponse, *AppError) {
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

	// Authorization check
	if booking.UserID != userUUID {
		return nil, newAppError(http.StatusForbidden, "You do not have permission to view this payment.", "FORBIDDEN")
	}

	payment, err := s.repo.FindPaymentByBookingID(bookingUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load payment.", "INTERNAL_ERROR")
	}
	if payment == nil {
		return nil, newAppError(http.StatusNotFound, "Payment not found.", "PAYMENT_NOT_FOUND")
	}

	return mapPaymentResponse(payment), nil
}

// HandleMidtransWebhook processes Midtrans payment notification webhook
// Reference: https://docs.midtrans.com/en/after-payment/http-notification
func (s *Service) HandleMidtransWebhook(req MidtransWebhookRequest) *AppError {
	// Verify signature
	if !s.verifyMidtransSignature(req) {
		log.Printf("Invalid Midtrans signature for order: %s", req.OrderID)
		return newAppError(http.StatusUnauthorized, "Invalid signature.", "INVALID_SIGNATURE")
	}

	// Order ID should be booking ID
	bookingUUID, err := uuid.Parse(req.OrderID)
	if err != nil {
		log.Printf("Invalid order ID format: %s", req.OrderID)
		return newAppError(http.StatusUnprocessableEntity, "Invalid order ID.", "VALIDATION_ERROR")
	}

	// Find payment by booking ID
	payment, err := s.repo.FindPaymentByBookingID(bookingUUID)
	if err != nil {
		log.Printf("Error finding payment for booking %s: %v", bookingUUID, err)
		return newAppError(http.StatusInternalServerError, "Could not load payment.", "INTERNAL_ERROR")
	}
	if payment == nil {
		log.Printf("Payment not found for booking: %s", bookingUUID)
		return newAppError(http.StatusNotFound, "Payment not found.", "PAYMENT_NOT_FOUND")
	}

	// Idempotency: if already paid, skip processing
	if payment.Status == model.PaymentStatusPaid {
		log.Printf("Payment already marked as PAID for booking: %s", bookingUUID)
		return nil
	}

	// Process based on transaction status
	tx := s.repo.DB().Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	switch req.TransactionStatus {
	case "capture", "settlement":
		// Payment successful
		now := time.Now()
		payment.Status = model.PaymentStatusPaid
		payment.TransactionID = &req.TransactionID
		payment.PaidAt = &now

		if err := tx.Save(payment).Error; err != nil {
			tx.Rollback()
			log.Printf("Error updating payment: %v", err)
			return newAppError(http.StatusInternalServerError, "Could not update payment.", "INTERNAL_ERROR")
		}

		// Update booking to CONFIRMED
		booking, err := s.repo.FindBookingByID(payment.BookingID)
		if err != nil {
			tx.Rollback()
			log.Printf("Error finding booking: %v", err)
			return newAppError(http.StatusInternalServerError, "Could not load booking.", "INTERNAL_ERROR")
		}
		if booking != nil && booking.Status == model.BookingStatusPending {
			booking.Status = model.BookingStatusConfirmed
			if err := tx.Save(booking).Error; err != nil {
				tx.Rollback()
				log.Printf("Error updating booking: %v", err)
				return newAppError(http.StatusInternalServerError, "Could not update booking.", "INTERNAL_ERROR")
			}
		}

		if err := tx.Commit().Error; err != nil {
			log.Printf("Error committing transaction: %v", err)
			return newAppError(http.StatusInternalServerError, "Could not complete transaction.", "INTERNAL_ERROR")
		}

		log.Printf("Payment successful for booking: %s", bookingUUID)

	case "pending":
		payment.Status = model.PaymentStatusPending
		payment.TransactionID = &req.TransactionID
		if err := tx.Save(payment).Error; err != nil {
			tx.Rollback()
			return newAppError(http.StatusInternalServerError, "Could not update payment.", "INTERNAL_ERROR")
		}
		tx.Commit()

	case "deny", "cancel", "expire":
		payment.Status = model.PaymentStatusFailed
		payment.TransactionID = &req.TransactionID
		if err := tx.Save(payment).Error; err != nil {
			tx.Rollback()
			return newAppError(http.StatusInternalServerError, "Could not update payment.", "INTERNAL_ERROR")
		}

		// Update booking to EXPIRED
		booking, err := s.repo.FindBookingByID(payment.BookingID)
		if err == nil && booking != nil && booking.Status == model.BookingStatusPending {
			booking.Status = model.BookingStatusExpired
			tx.Save(booking)
		}
		tx.Commit()

	default:
		tx.Rollback()
		log.Printf("Unknown transaction status: %s for booking: %s", req.TransactionStatus, bookingUUID)
	}

	return nil
}

// verifyMidtransSignature validates the webhook signature from Midtrans
func (s *Service) verifyMidtransSignature(req MidtransWebhookRequest) bool {
	// Signature verification: SHA512(order_id+status_code+gross_amount+ServerKey)
	// For MVP: simplified verification - production should use full signature validation
	if s.midtransServerKey == "" {
		log.Println("Warning: Midtrans server key not configured, skipping signature verification")
		return true // Allow in development
	}

	signaturePayload := fmt.Sprintf("%s%s%s%s", req.OrderID, req.TransactionStatus, req.GrossAmount, s.midtransServerKey)
	hash := sha512.Sum512([]byte(signaturePayload))
	expectedSignature := hex.EncodeToString(hash[:])

	return expectedSignature == req.SignatureKey
}

func mapPaymentResponse(payment *model.Payment) *PaymentResponse {
	return &PaymentResponse{
		ID:            payment.ID.String(),
		BookingID:     payment.BookingID.String(),
		Provider:      payment.Provider,
		TransactionID: payment.TransactionID,
		Amount:        payment.Amount,
		Status:        payment.Status,
		PaidAt:        payment.PaidAt,
		CreatedAt:     payment.CreatedAt,
		UpdatedAt:     payment.UpdatedAt,
	}
}

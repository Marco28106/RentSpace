package payments

import "time"

type CreatePaymentRequest struct {
	BookingID string `json:"booking_id" binding:"required"`
}

type PaymentResponse struct {
	ID            string     `json:"id"`
	BookingID     string     `json:"booking_id"`
	Provider      string     `json:"provider"`
	TransactionID *string    `json:"transaction_id,omitempty"`
	Amount        float64    `json:"amount"`
	Status        string     `json:"status"`
	PaidAt        *time.Time `json:"paid_at,omitempty"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

type MidtransWebhookRequest struct {
	TransactionStatus string `json:"transaction_status"`
	OrderID           string `json:"order_id"`
	GrossAmount       string `json:"gross_amount"`
	PaymentType       string `json:"payment_type"`
	TransactionID     string `json:"transaction_id"`
	SignatureKey      string `json:"signature_key"`
}

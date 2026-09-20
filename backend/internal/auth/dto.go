package auth

import "time"

type RegisterRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
	Role     string `json:"role"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserResponse struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	Email     string  `json:"email"`
	Role      string  `json:"role"`
	AvatarURL *string `json:"avatar_url,omitempty"`
}

type AuthResponse struct {
	User      UserResponse `json:"user"`
	Token     string       `json:"token"`
	ExpiresAt time.Time    `json:"expires_at"`
}

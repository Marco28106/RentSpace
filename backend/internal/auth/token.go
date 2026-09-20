package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/google/uuid"
)

type TokenManager struct {
	secret     []byte
	expiration time.Duration
}

type Claims struct {
	Subject string `json:"sub"`
	Email   string `json:"email"`
	Name    string `json:"name"`
	Role    string `json:"role"`
	Issued  int64  `json:"iat"`
	Expires int64  `json:"exp"`
}

func NewTokenManager(secret string, expirationHours int) *TokenManager {
	if expirationHours <= 0 {
		expirationHours = 24
	}
	return &TokenManager{
		secret:     []byte(secret),
		expiration: time.Duration(expirationHours) * time.Hour,
	}
}

func (tm *TokenManager) Generate(user *model.User) (string, time.Time, error) {
	now := time.Now().UTC()
	expiresAt := now.Add(tm.expiration)
	claims := Claims{
		Subject: user.ID.String(),
		Email:   user.Email,
		Name:    user.Name,
		Role:    user.Role,
		Issued:  now.Unix(),
		Expires: expiresAt.Unix(),
	}

	header := map[string]string{"alg": "HS256", "typ": "JWT"}
	headerJSON, err := json.Marshal(header)
	if err != nil {
		return "", time.Time{}, err
	}
	claimsJSON, err := json.Marshal(claims)
	if err != nil {
		return "", time.Time{}, err
	}

	unsigned := base64.RawURLEncoding.EncodeToString(headerJSON) + "." + base64.RawURLEncoding.EncodeToString(claimsJSON)
	signature := tm.sign(unsigned)

	return unsigned + "." + signature, expiresAt, nil
}

func (tm *TokenManager) Validate(token string) (*Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	unsigned := parts[0] + "." + parts[1]
	expectedSignature := tm.sign(unsigned)
	if !hmac.Equal([]byte(expectedSignature), []byte(parts[2])) {
		return nil, errors.New("invalid token signature")
	}

	claimsJSON, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, fmt.Errorf("invalid token claims: %w", err)
	}

	var claims Claims
	if err := json.Unmarshal(claimsJSON, &claims); err != nil {
		return nil, fmt.Errorf("invalid token payload: %w", err)
	}
	if _, err := uuid.Parse(claims.Subject); err != nil {
		return nil, errors.New("invalid token subject")
	}
	if time.Now().UTC().Unix() >= claims.Expires {
		return nil, errors.New("token expired")
	}

	return &claims, nil
}

func (tm *TokenManager) sign(unsigned string) string {
	mac := hmac.New(sha256.New, tm.secret)
	mac.Write([]byte(unsigned))
	return base64.RawURLEncoding.EncodeToString(mac.Sum(nil))
}

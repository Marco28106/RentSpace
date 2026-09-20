package auth

import (
	"net/http"
	"net/mail"
	"strings"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type UserRepository interface {
	CreateUser(user *model.User) error
	FindUserByEmail(email string) (*model.User, error)
	FindUserByID(id uuid.UUID) (*model.User, error)
	UpdateUser(user *model.User) error
	CreateOwnerProfile(profile *model.OwnerProfile) error
	FindOwnerProfileByUserID(userID uuid.UUID) (*model.OwnerProfile, error)
}

type Service struct {
	repo   UserRepository
	tokens *TokenManager
}

func NewService(repo UserRepository, tokens *TokenManager) *Service {
	return &Service{repo: repo, tokens: tokens}
}

func (s *Service) Register(req RegisterRequest) (*AuthResponse, *AppError) {
	name := strings.TrimSpace(req.Name)
	email := normalizeEmail(req.Email)
	phone := strings.TrimSpace(req.Phone)
	role := normalizeRole(req.Role)

	if len(name) < 2 {
		return nil, newAppError(http.StatusUnprocessableEntity, "Name must be at least 2 characters.", "VALIDATION_ERROR")
	}
	if !isValidEmail(email) {
		return nil, newAppError(http.StatusUnprocessableEntity, "Email must be valid.", "VALIDATION_ERROR")
	}
	if len(req.Password) < 8 {
		return nil, newAppError(http.StatusUnprocessableEntity, "Password must be at least 8 characters.", "VALIDATION_ERROR")
	}
	if role != model.RoleCustomer && role != model.RoleOwner {
		return nil, newAppError(http.StatusUnprocessableEntity, "Role must be CUSTOMER or OWNER.", "VALIDATION_ERROR")
	}

	existing, err := s.repo.FindUserByEmail(email)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not check existing account.", "INTERNAL_ERROR")
	}
	if existing != nil {
		return nil, newAppError(http.StatusConflict, "An account with this email already exists.", "EMAIL_ALREADY_EXISTS")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not secure password.", "INTERNAL_ERROR")
	}
	hashStr := string(hash)
	var phonePtr *string
	if phone != "" {
		phonePtr = &phone
	}
	user := &model.User{
		Name:         name,
		Email:        email,
		PasswordHash: &hashStr,
		Phone:        phonePtr,
		Role:         role,
		IsActive:     true,
	}

	if err := s.repo.CreateUser(user); err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not create account.", "INTERNAL_ERROR")
	}

	return s.buildAuthResponse(user)
}

func (s *Service) Login(req LoginRequest) (*AuthResponse, *AppError) {
	email := normalizeEmail(req.Email)
	if !isValidEmail(email) || req.Password == "" {
		return nil, newAppError(http.StatusUnauthorized, "Invalid email or password.", "INVALID_CREDENTIALS")
	}

	user, err := s.repo.FindUserByEmail(email)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load account.", "INTERNAL_ERROR")
	}
	if user == nil || user.PasswordHash == nil {
		return nil, newAppError(http.StatusUnauthorized, "Invalid email or password.", "INVALID_CREDENTIALS")
	}
	if !user.IsActive {
		return nil, newAppError(http.StatusForbidden, "Account is inactive.", "ACCOUNT_INACTIVE")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(*user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Invalid email or password.", "INVALID_CREDENTIALS")
	}

	return s.buildAuthResponse(user)
}

func (s *Service) GetCurrentUser(userID string) (*UserResponse, *AppError) {
	parsedID, err := uuid.Parse(userID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	user, err := s.repo.FindUserByID(parsedID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load account.", "INTERNAL_ERROR")
	}
	if user == nil || !user.IsActive {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	response := mapUserResponse(user)
	return &response, nil
}

func (s *Service) BecomeOwner(userID string) (*AuthResponse, *AppError) {
	parsedID, err := uuid.Parse(userID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	user, err := s.repo.FindUserByID(parsedID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load account.", "INTERNAL_ERROR")
	}
	if user == nil || !user.IsActive {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	if user.Role == model.RoleOwner {
		responseUser := mapUserResponse(user)
		token, expiresAt, err := s.tokens.Generate(user)
		if err != nil {
			return nil, newAppError(http.StatusInternalServerError, "Could not create auth token.", "INTERNAL_ERROR")
		}
		return &AuthResponse{User: responseUser, Token: token, ExpiresAt: expiresAt}, nil
	}

	// Allow all roles (e.g. CUSTOMER) to upgrade
	user.Role = model.RoleOwner
	if err := s.repo.UpdateUser(user); err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not upgrade account.", "INTERNAL_ERROR")
	}

	// Create profile if it doesn't exist
	ownerProfile, err := s.repo.FindOwnerProfileByUserID(user.ID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not check profile.", "INTERNAL_ERROR")
	}
	if ownerProfile == nil {
		ownerProfile = &model.OwnerProfile{
			UserID:       user.ID,
			BusinessName: user.Name,
		}
		if err := s.repo.CreateOwnerProfile(ownerProfile); err != nil {
			return nil, newAppError(http.StatusInternalServerError, "Could not create owner profile.", "INTERNAL_ERROR")
		}
	}

	return s.buildAuthResponse(user)
}

func (s *Service) buildAuthResponse(user *model.User) (*AuthResponse, *AppError) {
	token, expiresAt, err := s.tokens.Generate(user)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not create authentication token.", "INTERNAL_ERROR")
	}

	return &AuthResponse{
		User:      mapUserResponse(user),
		Token:     token,
		ExpiresAt: expiresAt,
	}, nil
}

func mapUserResponse(user *model.User) UserResponse {
	return UserResponse{
		ID:        user.ID.String(),
		Name:      user.Name,
		Email:     user.Email,
		Role:      user.Role,
		AvatarURL: user.AvatarURL,
	}
}

func normalizeEmail(email string) string {
	return strings.ToLower(strings.TrimSpace(email))
}

func normalizeRole(role string) string {
	role = strings.ToUpper(strings.TrimSpace(role))
	if role == "" {
		return model.RoleCustomer
	}
	return role
}

func isValidEmail(email string) bool {
	if email == "" {
		return false
	}
	parsed, err := mail.ParseAddress(email)
	return err == nil && parsed.Address == email
}

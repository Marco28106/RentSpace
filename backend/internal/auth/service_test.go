package auth

import (
	"testing"

	"github.com/Marco28106/rentspace/backend/internal/model"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type fakeUserRepo struct {
	users map[string]*model.User
}

func newFakeUserRepo() *fakeUserRepo {
	return &fakeUserRepo{users: map[string]*model.User{}}
}

func (r *fakeUserRepo) CreateUser(user *model.User) error {
	if user.ID == uuid.Nil {
		user.ID = uuid.New()
	}
	r.users[user.Email] = user
	return nil
}

func (r *fakeUserRepo) FindUserByEmail(email string) (*model.User, error) {
	return r.users[email], nil
}

func (r *fakeUserRepo) FindUserByID(id uuid.UUID) (*model.User, error) {
	for _, user := range r.users {
		if user.ID == id {
			return user, nil
		}
	}
	return nil, nil
}

func (r *fakeUserRepo) UpdateUser(user *model.User) error {
	r.users[user.Email] = user
	return nil
}

func (r *fakeUserRepo) FindOwnerProfileByUserID(userID uuid.UUID) (*model.OwnerProfile, error) {
	return nil, nil
}

func (r *fakeUserRepo) CreateOwnerProfile(profile *model.OwnerProfile) error {
	return nil
}

func newTestService(repo *fakeUserRepo) *Service {
	return NewService(repo, NewTokenManager("test-secret-with-enough-length", 24))
}

func TestRegisterCreatesCustomerWithHashedPassword(t *testing.T) {
	repo := newFakeUserRepo()
	service := newTestService(repo)

	result, appErr := service.Register(RegisterRequest{
		Name:     "Marco Suherman",
		Email:    "Marco@Example.com",
		Password: "password123",
		Role:     "",
	})

	if appErr != nil {
		t.Fatalf("expected registration to succeed, got %v", appErr)
	}
	if result.User.Role != model.RoleCustomer {
		t.Fatalf("expected default role CUSTOMER, got %s", result.User.Role)
	}
	if result.Token == "" {
		t.Fatal("expected token to be generated")
	}

	created := repo.users["marco@example.com"]
	if created == nil {
		t.Fatal("expected normalized email to be stored")
	}
	if created.PasswordHash == nil || *created.PasswordHash == "password123" {
		t.Fatal("expected password to be hashed")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(*created.PasswordHash), []byte("password123")); err != nil {
		t.Fatalf("expected password hash to match password: %v", err)
	}
}

func TestRegisterRejectsAdminRole(t *testing.T) {
	service := newTestService(newFakeUserRepo())

	_, appErr := service.Register(RegisterRequest{
		Name:     "Admin User",
		Email:    "admin@example.com",
		Password: "password123",
		Role:     model.RoleAdmin,
	})

	if appErr == nil || appErr.Code != "VALIDATION_ERROR" {
		t.Fatalf("expected validation error, got %#v", appErr)
	}
}

func TestRegisterRejectsDuplicateEmail(t *testing.T) {
	repo := newFakeUserRepo()
	service := newTestService(repo)

	req := RegisterRequest{Name: "Andi", Email: "andi@example.com", Password: "password123", Role: model.RoleCustomer}
	if _, appErr := service.Register(req); appErr != nil {
		t.Fatalf("first registration failed: %v", appErr)
	}

	_, appErr := service.Register(req)
	if appErr == nil || appErr.Code != "EMAIL_ALREADY_EXISTS" {
		t.Fatalf("expected duplicate email error, got %#v", appErr)
	}
}

func TestLoginValidatesPassword(t *testing.T) {
	repo := newFakeUserRepo()
	service := newTestService(repo)

	if _, appErr := service.Register(RegisterRequest{
		Name:     "Andi Customer",
		Email:    "andi@example.com",
		Password: "password123",
		Role:     model.RoleCustomer,
	}); appErr != nil {
		t.Fatalf("registration failed: %v", appErr)
	}

	if _, appErr := service.Login(LoginRequest{Email: "andi@example.com", Password: "wrong-password"}); appErr == nil || appErr.Code != "INVALID_CREDENTIALS" {
		t.Fatalf("expected invalid credentials, got %#v", appErr)
	}

	result, appErr := service.Login(LoginRequest{Email: "andi@example.com", Password: "password123"})
	if appErr != nil {
		t.Fatalf("expected login to succeed, got %v", appErr)
	}
	if result.User.Email != "andi@example.com" || result.Token == "" {
		t.Fatalf("unexpected login response: %#v", result)
	}
}

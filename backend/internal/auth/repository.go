package auth

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

func (r *Repository) CreateUser(user *model.User) error {
	return r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(user).Error; err != nil {
			return err
		}

		if user.Role == model.RoleOwner {
			ownerProfile := &model.OwnerProfile{
				UserID:       user.ID,
				BusinessName: user.Name,
				Email:        &user.Email,
				Phone:        user.Phone,
			}
			if err := tx.Create(ownerProfile).Error; err != nil {
				return err
			}
		}

		return nil
	})
}

func (r *Repository) FindUserByEmail(email string) (*model.User, error) {
	var user model.User
	if err := r.db.Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *Repository) FindUserByID(id uuid.UUID) (*model.User, error) {
	var user model.User
	if err := r.db.First(&user, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func (r *Repository) UpdateUser(user *model.User) error {
	return r.db.Save(user).Error
}

func (r *Repository) CreateOwnerProfile(profile *model.OwnerProfile) error {
	return r.db.Create(profile).Error
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

package places

import (
    "fmt"
    "net/http"
    "strings"
	"mime/multipart"

    "github.com/Marco28106/rentspace/backend/internal/model"
    "github.com/google/uuid"
)

type PlaceRepository interface {
	CreatePlace(place *model.Place) error
	CreatePlaceImage(image *model.PlaceImage) error
	CreatePlacePricing(pricing *model.PlacePricing) error
	UpdatePricingByPlaceID(placeID uuid.UUID, price int64) error
	FindPlaceByID(id uuid.UUID) (*model.Place, error)
	FindOwnerPlaceByID(ownerID uuid.UUID, placeID uuid.UUID) (*model.Place, error)
	ListOwnerPlaces(ownerID uuid.UUID, page int, limit int) ([]model.Place, int64, error)
	UpdatePlace(place *model.Place) error
	DeletePlace(place *model.Place) error
	FindCategoryByID(id uuid.UUID) (*model.Category, error)
	FindOwnerProfileByUserID(userID uuid.UUID) (*model.OwnerProfile, error)
	ListPlaces(filter PlaceFilter, page int, limit int) ([]model.Place, int64, error)
	GetBookingsByDate(placeID uuid.UUID, date string) ([]model.Booking, error)
}

type Service struct {
	repo PlaceRepository
}

func NewService(repo PlaceRepository) *Service {
	return &Service{repo: repo}
}

func (s *Service) CreatePlace(ownerID string, req CreatePlaceRequest) (*PlaceResponse, *AppError) {
	userUUID, err := uuid.Parse(ownerID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	owner, err := s.repo.FindOwnerProfileByUserID(userUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not validate owner profile.", "INTERNAL_ERROR")
	}
	if owner == nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Owner profile not found.", "OWNER_PROFILE_NOT_FOUND")
	}

	categoryUUID, err := uuid.Parse(req.CategoryID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Category ID must be a valid UUID.", "VALIDATION_ERROR")
	}

	name := strings.TrimSpace(req.Name)
	if len(name) < 2 {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place name must be at least 2 characters.", "VALIDATION_ERROR")
	}
	if strings.TrimSpace(req.Description) == "" {
		return nil, newAppError(http.StatusUnprocessableEntity, "Description is required.", "VALIDATION_ERROR")
	}
	if strings.TrimSpace(req.Address) == "" {
		return nil, newAppError(http.StatusUnprocessableEntity, "Address is required.", "VALIDATION_ERROR")
	}
	if strings.TrimSpace(req.City) == "" {
		return nil, newAppError(http.StatusUnprocessableEntity, "City is required.", "VALIDATION_ERROR")
	}

	category, err := s.repo.FindCategoryByID(categoryUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not validate category.", "INTERNAL_ERROR")
	}
	if category == nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Category not found.", "CATEGORY_NOT_FOUND")
	}

	place := &model.Place{
		OwnerID:     owner.UserID,
		CategoryID:  categoryUUID,
		Name:        name,
		Description: strings.TrimSpace(req.Description),
		Address:     strings.TrimSpace(req.Address),
		City:        strings.TrimSpace(req.City),
		District:    req.District,
		Latitude:    req.Latitude,
		Longitude:   req.Longitude,
		Capacity:    req.Capacity,
		Price:       0,
		ImageURL:    req.ImageURL,
		Status:      model.PlaceStatusActive,
	}

	// Set price if provided
	if req.Price != nil && *req.Price > 0 {
		place.Price = *req.Price
	}

	if err := s.repo.CreatePlace(place); err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not create place.", "INTERNAL_ERROR")
	}

	if req.ImageData != nil && *req.ImageData != "" {
		println("DEBUG: ImageData received, length:", len(*req.ImageData))
		placeImage := &model.PlaceImage{
			PlaceID:   place.ID,
			ImageURL:  *req.ImageData,
			IsPrimary: true,
			SortOrder: 0,
		}
		if err := s.repo.CreatePlaceImage(placeImage); err != nil {
			println("DEBUG: Failed to create image:", err.Error())
			return nil, newAppError(http.StatusInternalServerError, "Could not save image.", "INTERNAL_ERROR")
		}
		println("DEBUG: Image saved successfully")
	} else {
		println("DEBUG: No image data provided")
	}

	response := mapPlaceResponse(place)
	return &response, nil
}

func (s *Service) GetOwnerPlace(ownerID string, placeID string) (*PlaceResponse, *AppError) {
	ownerUUID, err := uuid.Parse(ownerID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place ID must be a valid UUID.", "VALIDATION_ERROR")
	}

	place, err := s.repo.FindOwnerPlaceByID(ownerUUID, placeUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
	}
	if place == nil {
		return nil, newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
	}

	response := mapPlaceResponse(place)
	return &response, nil
}

func (s *Service) ListOwnerPlaces(ownerID string, page int, limit int) ([]PlaceListItem, int64, *AppError) {
	ownerUUID, err := uuid.Parse(ownerID)
	if err != nil {
		return nil, 0, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}

	places, total, err := s.repo.ListOwnerPlaces(ownerUUID, page, limit)
	if err != nil {
		return nil, 0, newAppError(http.StatusInternalServerError, "Could not load places.", "INTERNAL_ERROR")
	}

	items := []PlaceListItem{}
	for _, place := range places {
		items = append(items, mapPlaceListItem(&place))
	}

	return items, total, nil
}

func (s *Service) UpdatePlace(ownerID string, placeID string, req UpdatePlaceRequest) (*PlaceResponse, *AppError) {
	ownerUUID, err := uuid.Parse(ownerID)
	if err != nil {
		return nil, newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place ID must be a valid UUID.", "VALIDATION_ERROR")
	}

	place, err := s.repo.FindOwnerPlaceByID(ownerUUID, placeUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
	}
	if place == nil {
		return nil, newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
	}

	if req.Name != nil {
		name := strings.TrimSpace(*req.Name)
		if len(name) < 2 {
			return nil, newAppError(http.StatusUnprocessableEntity, "Place name must be at least 2 characters.", "VALIDATION_ERROR")
		}
		place.Name = name
	}
	if req.Description != nil {
		place.Description = strings.TrimSpace(*req.Description)
	}
	if req.Address != nil {
		place.Address = strings.TrimSpace(*req.Address)
	}
	if req.City != nil {
		place.City = strings.TrimSpace(*req.City)
	}
	if req.District != nil {
		place.District = req.District
	}
	if req.Latitude != nil {
		place.Latitude = req.Latitude
	}
	if req.Longitude != nil {
		place.Longitude = req.Longitude
	}
	if req.Price != nil {
		place.Price = *req.Price
	}
	if req.Capacity != nil {
		place.Capacity = req.Capacity
	}
	if req.Status != nil {
		status := strings.ToUpper(strings.TrimSpace(*req.Status))
		if status != model.PlaceStatusActive && status != model.PlaceStatusInactive {
			return nil, newAppError(http.StatusUnprocessableEntity, "Status must be ACTIVE or INACTIVE.", "VALIDATION_ERROR")
		}
		place.Status = status
	}
	if req.CategoryID != nil {
		categoryUUID, err := uuid.Parse(*req.CategoryID)
		if err != nil {
			return nil, newAppError(http.StatusUnprocessableEntity, "Category ID must be a valid UUID.", "VALIDATION_ERROR")
		}
		category, err := s.repo.FindCategoryByID(categoryUUID)
		if err != nil {
			return nil, newAppError(http.StatusInternalServerError, "Could not validate category.", "INTERNAL_ERROR")
		}
		if category == nil {
			return nil, newAppError(http.StatusUnprocessableEntity, "Category not found.", "CATEGORY_NOT_FOUND")
		}
		place.CategoryID = categoryUUID
	}

	if err := s.repo.UpdatePlace(place); err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not update place.", "INTERNAL_ERROR")
	}

	response := mapPlaceResponse(place)
	return &response, nil
}

func (s *Service) DeletePlace(ownerID string, placeID string) *AppError {
	ownerUUID, err := uuid.Parse(ownerID)
	if err != nil {
		return newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
	}
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		return newAppError(http.StatusUnprocessableEntity, "Place ID must be a valid UUID.", "VALIDATION_ERROR")
	}

	place, err := s.repo.FindOwnerPlaceByID(ownerUUID, placeUUID)
	if err != nil {
		return newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
	}
	if place == nil {
		return newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
	}

	// Soft delete: set status to INACTIVE instead of hard delete to preserve booking history
	place.Status = model.PlaceStatusInactive
	if err := s.repo.UpdatePlace(place); err != nil {
		return newAppError(http.StatusInternalServerError, "Could not deactivate place.", "INTERNAL_ERROR")
	}

	return nil
}

func (s *Service) GetPublicPlace(placeID string) (*PlaceResponse, *AppError) {
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place ID must be a valid UUID.", "VALIDATION_ERROR")
	}

	place, err := s.repo.FindPlaceByID(placeUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
	}
	if place == nil || place.Status != model.PlaceStatusActive {
		return nil, newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
	}

	response := mapPlaceResponse(place)
	return &response, nil
}

func (s *Service) ListPublicPlaces(filter PlaceFilter, page int, limit int) ([]PlaceListItem, int64, *AppError) {
	places, total, err := s.repo.ListPlaces(filter, page, limit)
	if err != nil {
		return nil, 0, newAppError(http.StatusInternalServerError, "Could not load places.", "INTERNAL_ERROR")
	}

	items := []PlaceListItem{}
	for _, place := range places {
		items = append(items, mapPlaceListItem(&place))
	}

	return items, total, nil
}

func (s *Service) UploadPlaceImage(ownerID string, placeID string, file interface{}, ctx interface{}) *AppError {
    // Expect file as *multipart.FileHeader and ctx as *gin.Context
    fh, ok := file.(*multipart.FileHeader)
    if !ok {
        return newAppError(http.StatusBadRequest, "Invalid file type.", "BAD_REQUEST")
    }
    // Simple URL generation (in real app, save to storage)
    imageURL := "/uploads/" + fh.Filename

    ownerUUID, err := uuid.Parse(ownerID)
    if err != nil {
        return newAppError(http.StatusUnauthorized, "Authentication required.", "UNAUTHORIZED")
    }
    placeUUID, err := uuid.Parse(placeID)
    if err != nil {
        return newAppError(http.StatusUnprocessableEntity, "Place ID must be a valid UUID.", "VALIDATION_ERROR")
    }

    place, err := s.repo.FindOwnerPlaceByID(ownerUUID, placeUUID)
    if err != nil {
        return newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
    }
    if place == nil {
        return newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
    }

    // Create PlaceImage record
    img := &model.PlaceImage{PlaceID: place.ID, ImageURL: imageURL, IsPrimary: true, SortOrder: 0}
    if err := s.repo.CreatePlaceImage(img); err != nil {
        return newAppError(http.StatusInternalServerError, "Could not save image.", "INTERNAL_ERROR")
    }
    return nil
}


func mapPlaceResponse(place *model.Place) PlaceResponse {
	response := PlaceResponse{
		ID:          place.ID.String(),
		OwnerID:     place.OwnerID.String(),
		CategoryID:  place.CategoryID.String(),
		Name:        place.Name,
		Description: place.Description,
		Address:     place.Address,
		City:        place.City,
		District:    place.District,
		Latitude:    place.Latitude,
		Longitude:   place.Longitude,
		Capacity:    place.Capacity,
		Price:       place.Price,
		ImageURL:    place.ImageURL,
		Status:      place.Status,
		CreatedAt:   place.CreatedAt,
		UpdatedAt:   place.UpdatedAt,
	}

	// Map category
	if place.Category.Name != "" {
		response.Category = &CategoryResponse{
			ID:   place.Category.ID.String(),
			Name: place.Category.Name,
			Slug: place.Category.Slug,
		}
	}

	// Map images
	images := []PlaceImageResponse{}
	for _, img := range place.Images {
		images = append(images, PlaceImageResponse{
			ID:        img.ID.String(),
			ImageURL:  img.ImageURL,
			IsPrimary: img.IsPrimary,
			SortOrder: img.SortOrder,
		})
	}
	response.Images = images

	// Map pricing
	pricing := []PlacePricingResponse{}
	for _, p := range place.Pricing {
		pricing = append(pricing, PlacePricingResponse{
			ID:        p.ID.String(),
			DayOfWeek: p.DayOfWeek,
			StartTime: p.StartTime,
			EndTime:   p.EndTime,
			Price:     p.Price,
		})
	}
	response.Pricing = pricing

	// Map operating hours
	hours := []OperatingHourResponse{}
	for _, h := range place.OperatingHours {
		hours = append(hours, OperatingHourResponse{
			ID:        h.ID.String(),
			DayOfWeek: h.DayOfWeek,
			OpenTime:  h.OpenTime,
			CloseTime: h.CloseTime,
			IsClosed:  h.IsClosed,
		})
	}
	response.OperatingHours = hours

	// Map facilities
	facilities := []FacilityResponse{}
	for _, f := range place.Facilities {
		facilities = append(facilities, FacilityResponse{
			ID:   f.ID.String(),
			Name: f.Name,
			Icon: f.Icon,
		})
	}
	response.Facilities = facilities

	// Map review summary
	if len(place.Reviews) > 0 {
		var totalRating float64
		for _, review := range place.Reviews {
			totalRating += float64(review.Rating)
		}
		avg := totalRating / float64(len(place.Reviews))
		response.ReviewSummary = &ReviewSummaryResponse{
			AverageRating: avg,
			ReviewCount:   len(place.Reviews),
		}
	}

	// Map owner info
	if place.Owner.ID != uuid.Nil {
		joinDate := place.Owner.CreatedAt.Format("January 2006")
		verified := false
		superhost := false
		phone := place.Owner.Phone
		
		// Get owner profile for verified/superhost status
		if place.Owner.OwnerProfile != nil {
			verified = place.Owner.OwnerProfile.Verified
			superhost = place.Owner.OwnerProfile.Superhost
			if place.Owner.OwnerProfile.Phone != nil {
				phone = place.Owner.OwnerProfile.Phone
			}
		}
		
		response.Owner = &OwnerInfoResponse{
			Name:         place.Owner.Name,
			AvatarURL:    place.Owner.AvatarURL,
			Phone:        phone,
			Verified:     verified,
			Superhost:    superhost,
			JoinDate:     joinDate,
			ResponseRate: 100,
		}
	}

	return response
}

func mapPlaceListItem(place *model.Place) PlaceListItem {
	item := PlaceListItem{
		ID:     place.ID.String(),
		Name:   place.Name,
		City:   place.City,
		Status: place.Status,
	}

	if place.Category.Name != "" {
		item.Category = place.Category.Name
	}

	if place.Price > 0 {
		item.Price = &place.Price
	}

	if place.ImageURL != nil && *place.ImageURL != "" {
		item.ImageURL = place.ImageURL
	} else if len(place.Images) > 0 {
		imageURL := place.Images[0].ImageURL
		item.ImageURL = &imageURL
	}

	return item
}

func (s *Service) GetAvailability(placeID string, date string) ([]map[string]interface{}, *AppError) {
	placeUUID, err := uuid.Parse(placeID)
	if err != nil {
		return nil, newAppError(http.StatusUnprocessableEntity, "Place ID must be a valid UUID.", "VALIDATION_ERROR")
	}

	place, err := s.repo.FindPlaceByID(placeUUID)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load place.", "INTERNAL_ERROR")
	}
	if place == nil || place.Status != "ACTIVE" {
		return nil, newAppError(http.StatusNotFound, "Place not found.", "PLACE_NOT_FOUND")
	}

	// Get bookings for this date
	bookings, err := s.repo.GetBookingsByDate(placeUUID, date)
	if err != nil {
		return nil, newAppError(http.StatusInternalServerError, "Could not load bookings.", "INTERNAL_ERROR")
	}

	// Generate time slots (e.g., hourly from 08:00 to 20:00)
	slots := []map[string]interface{}{}
	for hour := 8; hour < 20; hour++ {
		startTime := fmt.Sprintf("%02d:00", hour)
		endTime := fmt.Sprintf("%02d:00", hour+1)
		
		// Check if slot is booked
		available := true
		for _, booking := range bookings {
			if booking.StartTime == startTime && booking.EndTime == endTime {
				available = false
				break
			}
		}
		
		slots = append(slots, map[string]interface{}{
			"start":     startTime,
			"end":       endTime,
			"available": available,
		})
	}

	return slots, nil
}

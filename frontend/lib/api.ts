const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const payload = (await response.json()) as { success?: boolean; message?: string; data?: T };
  if (!response.ok || payload.success === false) throw new Error(payload.message || "Request failed");
  return payload.data as T;
}

export type AuthResponse = { token: string; user: { id: string; name: string; email: string; role: string; phone?: string; avatar_url?: string } };
export function login(email: string, password: string) {
  return apiRequest<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })
    .then(res => {
      if (typeof window !== 'undefined' && res.token) {
        localStorage.setItem('token', res.token);
      }
      return res;
    });
}
export function register(name: string, email: string, password: string, role = "CUSTOMER", phone?: string) {
  return apiRequest<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password, role, phone }) });
}
export function logout() {
  return apiRequest<null>("/auth/logout", { method: "POST" });
}
export function getMe() {
  return apiRequest<AuthResponse["user"]>("/auth/me");
}
export interface PlaceResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district?: string;
  capacity?: number;
  status: string;
  created_at: string;
  updated_at: string;
  category?: { id: string; name: string; slug: string };
  images: Array<{
    id: string;
    image_url: string;
    is_primary: boolean;
    sort_order: number;
  }>;
  pricing: Array<{
    id: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    price: number;
  }>;
  facilities: Array<{
    id: string;
    name: string;
    icon?: string;
  }>;
  review_summary?: {
    average_rating: number;
    review_count: number;
  };
}

export function getPlaces(query = "") {
  return apiRequest<{ items: PlaceResponse[]; pagination: unknown }>(`/places${query}`);
}

export function getPlace(id: string) {
  return apiRequest<PlaceResponse>(`/places/${id}`);
}

export interface AvailabilitySlot {
  start: string;
  end: string;
}

export function getAvailability(placeId: string, date: string) {
  return apiRequest<{ slots: AvailabilitySlot[] }>(`/places/${placeId}/availability?date=${date}`);
}

export interface Review {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  text: string;
  photos?: string[];
  created_at: string;
}

export function getReviews(placeId: string) {
  return apiRequest<{ items: Review[] }>(`/places/${placeId}/reviews`);
}

export function postReview(placeId: string, formData: FormData) {
  return fetch(`${API_URL}/places/${placeId}/reviews`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Review submission failed");
      return res.json();
    })
    .then((payload) => {
      if (payload.success === false) throw new Error(payload.message || "Review submission failed");
      return payload.data as Review;
    });
}

export function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("avatar", file);
  return fetch(`${API_URL}/auth/upload-avatar`, {
    method: "POST",
    credentials: "include",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Upload failed");
      return res.json();
    })
    .then((payload) => {
      if (payload.success === false) throw new Error(payload.message || "Upload failed");
      return payload.data as AuthResponse;
    });
}

export type BookingResponse = {
  id: string;
  user_id: string;
  place_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  total_amount: number;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  place?: any;
  payment?: any;
};

export function listBookings(page = 1, limit = 20) {
  return apiRequest<{ items: BookingResponse[]; pagination: any }>(`/bookings?page=${page}&limit=${limit}`);
}

export function getBooking(bookingId: string) {
  return apiRequest<BookingResponse>(`/bookings/${bookingId}`);
}

export function createBooking(place_id: string, booking_date: string, start_time: string, end_time: string, notes?: string) {
	return apiRequest<BookingResponse>("/bookings", {
		method: "POST",
		body: JSON.stringify({ place_id, booking_date, start_time, end_time, notes }),
	});
}

export function cancelBooking(bookingId: string) {
	return apiRequest<null>(`/bookings/${bookingId}/cancel`, { method: "POST" });
}

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export function listNotifications() {
  return apiRequest<{ items: Notification[]; unread_count: number }>(`/notifications`);
}

export function markNotificationAsRead(notifId: string) {
  return apiRequest<null>(`/notifications/${notifId}/read`, { method: "PATCH" });
}

export function markAllNotificationsAsRead() {
	return apiRequest<null>(`/notifications/read-all`, { method: "POST" });
}

export function updateProfile(name: string, email: string, phone: string) {
	return apiRequest<AuthResponse["user"]>("/auth/me", { method: "PATCH", body: JSON.stringify({ name, email, phone }) });
}

export type PaymentResponse = {
	id: string;
	booking_id: string;
	provider: string;
	transaction_id?: string;
	amount: number;
	status: string;
	paid_at?: string;
	created_at: string;
	updated_at: string;
};

export function getPayment(bookingId: string) {
	return apiRequest<PaymentResponse>(`/bookings/${bookingId}/payment`);
}

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export function getCategories() {
  return apiRequest<{ count: number; items: Category[] }>("/categories");
}

export type CreatePlacePayload = {
  category_id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  district?: string;
  capacity?: number;
};

export type UpdatePlacePayload = Partial<CreatePlacePayload> & {
  status?: string;
};

export function createPlace(data: CreatePlacePayload) {
  return apiRequest<any>("/owner/places", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function listOwnerPlaces(page = 1, limit = 20) {
  return apiRequest<{ items: any[]; pagination: any }>(`/owner/places?page=${page}&limit=${limit}`);
}

export function getOwnerPlace(id: string) {
  return apiRequest<any>(`/owner/places/${id}`);
}

export function updatePlace(id: string, data: UpdatePlacePayload) {
  return apiRequest<any>(`/owner/places/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deletePlace(id: string) {
  return apiRequest<null>(`/owner/places/${id}`, {
    method: "DELETE",
  });
}

export type FavoriteItem = {
  id: string;
  user_id: string;
  place_id: string;
  created_at: string;
  place?: PlaceResponse;
};

export function getFavorites() {
  return apiRequest<{ items: FavoriteItem[]; count: number }>("/favorites");
}

export function addFavorite(placeId: string) {
  return apiRequest<FavoriteItem>("/favorites", {
    method: "POST",
    body: JSON.stringify({ place_id: placeId }),
  });
}

export function removeFavorite(placeId: string) {
  return apiRequest<null>(`/favorites/${placeId}`, {
    method: "DELETE",
  });
}

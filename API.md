# RentSpace — API Specification

## 1. API Overview

RentSpace menggunakan REST API sebagai komunikasi utama antara frontend dan backend.

Base URL:

```text
/api/v1
```

Development:

```text
http://localhost:8080/api/v1
```

Production URL ditentukan melalui environment configuration.

Semua API menggunakan JSON kecuali endpoint upload file atau kebutuhan khusus lainnya.

---

# 2. API Principles

API RentSpace harus mengikuti prinsip:

1. RESTful API.
2. Menggunakan HTTP method yang sesuai.
3. Menggunakan HTTP status code yang sesuai.
4. Menggunakan JSON untuk request dan response.
5. Menggunakan API versioning.
6. Semua protected endpoint harus melakukan authentication.
7. Semua protected resource harus melakukan authorization.
8. Backend menjadi source of truth.
9. Business logic tidak boleh dilakukan hanya di frontend.
10. Error response harus konsisten.
11. List endpoint harus mendukung pagination.
12. Endpoint harus memvalidasi input.
13. Sensitive data tidak boleh dikembalikan ke frontend.

---

# 3. HTTP Methods

Gunakan:

```text
GET
```

Untuk mengambil data.

```text
POST
```

Untuk membuat resource atau menjalankan action.

```text
PUT
```

Untuk mengganti data resource secara keseluruhan jika diperlukan.

```text
PATCH
```

Untuk update sebagian.

```text
DELETE
```

Untuk menghapus atau menonaktifkan resource.

---

# 4. Standard Response

## Success

```json
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

## Error

```json
{
  "success": false,
  "data": null,
  "message": "Something went wrong",
  "error": {
    "code": "ERROR_CODE"
  }
}
```

---

# 5. HTTP Status Codes

Gunakan status code berikut:

| Status | Usage                                    |
| ------ | ---------------------------------------- |
| 200    | Successful request                       |
| 201    | Resource created                         |
| 204    | Successful request without response body |
| 400    | Invalid request                          |
| 401    | Not authenticated                        |
| 403    | Not authorized                           |
| 404    | Resource not found                       |
| 409    | Conflict                                 |
| 422    | Validation error                         |
| 429    | Too many requests                        |
| 500    | Internal server error                    |

---

# 6. Pagination

List endpoint menggunakan pagination.

Example:

```text
GET /api/v1/places?page=1&limit=12
```

Response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 100,
      "total_pages": 9
    }
  },
  "message": "Places retrieved successfully"
}
```

Default:

```text
page = 1
limit = 12
```

Backend harus memiliki maximum limit untuk mencegah excessive queries.

---

# 7. Authentication

Authentication menggunakan authenticated session/token sesuai implementation pada backend.

Protected API harus memverifikasi user authentication sebelum menjalankan request.

Authentication tidak boleh hanya dilakukan di frontend.

---

# 8. Authentication Endpoints

## Register

```text
POST /api/v1/auth/register
```

Access:

```text
Public
```

Request:

```json
{
  "name": "Marco Suherman",
  "email": "marco@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Marco Suherman",
      "email": "marco@example.com",
      "role": "CUSTOMER"
    }
  },
  "message": "Registration successful"
}
```

Password tidak boleh dikembalikan dalam response.

---

# 9. Login

```text
POST /api/v1/auth/login
```

Access:

```text
Public
```

Request:

```json
{
  "email": "marco@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Marco Suherman",
      "email": "marco@example.com",
      "role": "CUSTOMER"
    }
  },
  "message": "Login successful"
}
```

Authentication state ditangani menggunakan mekanisme authentication yang aman.

Token/session credential tidak boleh disimpan di localStorage jika menggunakan cookie-based authentication.

---

# 10. Google OAuth

```text
GET /api/v1/auth/google
```

Access:

```text
Public
```

Digunakan untuk memulai Google OAuth authentication.

Callback:

```text
GET /api/v1/auth/google/callback
```

Backend bertanggung jawab terhadap OAuth flow.

Google OAuth secret tidak boleh berada di frontend.

---

# 11. Logout

```text
POST /api/v1/auth/logout
```

Access:

```text
Authenticated
```

Response:

```json
{
  "success": true,
  "data": null,
  "message": "Logout successful"
}
```

---

# 12. Get Current User

```text
GET /api/v1/auth/me
```

Access:

```text
Authenticated
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Marco Suherman",
    "email": "marco@example.com",
    "role": "CUSTOMER",
    "avatar_url": null
  },
  "message": "User retrieved successfully"
}
```

---

# 13. User Profile

## Get Profile

```text
GET /api/v1/users/me
```

Access:

```text
Authenticated
```

## Update Profile

```text
PATCH /api/v1/users/me
```

Access:

```text
Authenticated
```

Request:

```json
{
  "name": "Marco Suherman",
  "phone": "08123456789",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

---

# 14. Place Discovery

## Get Places

```text
GET /api/v1/places
```

Access:

```text
Public
```

Supported query parameters:

```text
page
limit
search
category
city
district
min_price
max_price
min_rating
capacity
facility
latitude
longitude
radius
date
start_time
end_time
sort
```

Example:

```text
GET /api/v1/places?search=futsal&city=Jakarta&min_price=50000&max_price=200000&page=1&limit=12
```

---

# 15. Place Sorting

Supported sort values:

```text
relevance
price_low
price_high
rating
newest
distance
popular
```

Backend harus memvalidasi nilai sort.

Jika sort tidak valid, gunakan default:

```text
relevance
```

---

# 16. Get Place Detail

```text
GET /api/v1/places/:id
```

Access:

```text
Public
```

Response dapat berisi:

```text
Place information
Owner information
Category
Images
Facilities
Operating hours
Pricing
Rating
Review summary
Availability summary
Location
```

---

# 17. Get Place Availability

```text
GET /api/v1/places/:id/availability
```

Access:

```text
Public
```

Query:

```text
date
```

Example:

```text
GET /api/v1/places/uuid/availability?date=2026-09-20
```

Response:

```json
{
  "success": true,
  "data": {
    "date": "2026-09-20",
    "slots": [
      {
        "start_time": "08:00",
        "end_time": "09:00",
        "price": 100000,
        "available": true
      }
    ]
  },
  "message": "Availability retrieved successfully"
}
```

Availability harus dihitung oleh backend.

---

# 18. Owner Place Management

## Create Place

```text
POST /api/v1/owner/places
```

Access:

```text
OWNER
```

Request:

```json
{
  "category_id": "uuid",
  "name": "RentSpace Futsal Arena",
  "description": "Indoor futsal court",
  "address": "Jakarta Barat",
  "city": "Jakarta Barat",
  "district": "Kebon Jeruk",
  "latitude": -6.2,
  "longitude": 106.78,
  "capacity": 14
}
```

---

# 19. Owner Get Places

```text
GET /api/v1/owner/places
```

Access:

```text
OWNER
```

Hanya place milik owner yang sedang login yang boleh dikembalikan.

---

# 20. Owner Get Place

```text
GET /api/v1/owner/places/:id
```

Access:

```text
OWNER
```

Backend harus memverifikasi ownership.

---

# 21. Owner Update Place

```text
PATCH /api/v1/owner/places/:id
```

Access:

```text
OWNER
```

Owner hanya dapat mengubah place miliknya.

---

# 22. Owner Delete Place

```text
DELETE /api/v1/owner/places/:id
```

Access:

```text
OWNER
```

Place yang memiliki historical booking tidak boleh dihapus secara destructive tanpa mempertimbangkan data history.

Soft delete/deactivation dapat digunakan.

---

# 23. Place Images

## Upload Image

```text
POST /api/v1/owner/places/:id/images
```

Access:

```text
OWNER
```

Request menggunakan multipart form-data.

Backend harus melakukan validasi:

* File type.
* File size.
* Ownership.
* Maximum image count.

---

# 24. Delete Place Image

```text
DELETE /api/v1/owner/places/:placeId/images/:imageId
```

Access:

```text
OWNER
```

Owner hanya dapat menghapus image dari place miliknya.

---

# 25. Set Primary Image

```text
PATCH /api/v1/owner/places/:placeId/images/:imageId/primary
```

Access:

```text
OWNER
```

Satu place hanya boleh memiliki satu primary image.

---

# 26. Categories

## Get Categories

```text
GET /api/v1/categories
```

Access:

```text
Public
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Futsal",
      "slug": "futsal"
    }
  ],
  "message": "Categories retrieved successfully"
}
```

---

# 27. Facilities

## Get Facilities

```text
GET /api/v1/facilities
```

Access:

```text
Public
```

Digunakan untuk menampilkan filter dan informasi fasilitas.

---

# 28. Owner Facilities

```text
PUT /api/v1/owner/places/:id/facilities
```

Access:

```text
OWNER
```

Request:

```json
{
  "facility_ids": [
    "uuid-1",
    "uuid-2",
    "uuid-3"
  ]
}
```

Backend harus mengganti relationship facilities untuk place tersebut.

---

# 29. Operating Hours

## Get Operating Hours

```text
GET /api/v1/places/:id/operating-hours
```

Access:

```text
Public
```

## Update Operating Hours

```text
PUT /api/v1/owner/places/:id/operating-hours
```

Access:

```text
OWNER
```

Owner hanya dapat mengubah operating hours place miliknya.

---

# 30. Pricing

## Get Pricing

```text
GET /api/v1/places/:id/pricing
```

Access:

```text
Public
```

## Update Pricing

```text
PUT /api/v1/owner/places/:id/pricing
```

Access:

```text
OWNER
```

Backend harus memvalidasi:

```text
start_time < end_time
price >= 0
```

---

# 31. Availability Blocks

## Get Blocks

```text
GET /api/v1/owner/places/:id/availability-blocks
```

Access:

```text
OWNER
```

## Create Block

```text
POST /api/v1/owner/places/:id/availability-blocks
```

Access:

```text
OWNER
```

Request:

```json
{
  "start_at": "2026-09-20T10:00:00",
  "end_at": "2026-09-20T14:00:00",
  "reason": "Maintenance"
}
```

## Delete Block

```text
DELETE /api/v1/owner/places/:placeId/availability-blocks/:blockId
```

Access:

```text
OWNER
```

---

# 32. Booking

## Create Booking

```text
POST /api/v1/bookings
```

Access:

```text
CUSTOMER
```

Request:

```json
{
  "place_id": "uuid",
  "booking_date": "2026-09-20",
  "start_time": "18:00",
  "end_time": "20:00",
  "notes": "Need parking"
}
```

Backend harus:

1. Validate user.
2. Validate place.
3. Validate place status.
4. Validate date.
5. Validate time.
6. Validate operating hours.
7. Check availability.
8. Check existing booking.
9. Calculate price.
10. Create booking.
11. Create payment if required.
12. Return booking result.

---

# 33. Booking Conflict

Jika slot sudah digunakan:

```text
HTTP 409 Conflict
```

Response:

```json
{
  "success": false,
  "data": null,
  "message": "Selected time slot is no longer available",
  "error": {
    "code": "BOOKING_SLOT_UNAVAILABLE"
  }
}
```

Frontend harus meminta customer memilih slot lain.

---

# 34. Get Customer Bookings

```text
GET /api/v1/bookings
```

Access:

```text
CUSTOMER
```

Query:

```text
page
limit
status
date
```

Customer hanya boleh melihat booking miliknya sendiri.

---

# 35. Get Booking Detail

```text
GET /api/v1/bookings/:id
```

Access:

```text
Authenticated
```

User hanya dapat melihat booking jika:

* User adalah customer yang membuat booking.
* User adalah owner dari place terkait.
* User adalah admin.

---

# 36. Cancel Booking

```text
POST /api/v1/bookings/:id/cancel
```

Access:

```text
CUSTOMER
```

Cancellation harus mengikuti booking rules.

Backend harus menentukan apakah booking masih dapat dibatalkan.

Tidak boleh hanya berdasarkan keputusan frontend.

---

# 37. Owner Booking Management

## Get Owner Bookings

```text
GET /api/v1/owner/bookings
```

Access:

```text
OWNER
```

Query:

```text
page
limit
status
date
place_id
```

Owner hanya dapat melihat booking untuk place yang dimilikinya.

---

# 38. Owner Booking Detail

```text
GET /api/v1/owner/bookings/:id
```

Access:

```text
OWNER
```

Backend harus melakukan ownership validation.

---

# 39. Complete Booking

```text
POST /api/v1/owner/bookings/:id/complete
```

Access:

```text
OWNER
```

Booking hanya dapat diubah menjadi `COMPLETED` jika memenuhi booking lifecycle rules.

---

# 40. Payment

## Create Payment

```text
POST /api/v1/bookings/:bookingId/payment
```

Access:

```text
CUSTOMER
```

Backend membuat payment transaction melalui payment provider.

---

# 41. Get Payment Status

```text
GET /api/v1/bookings/:bookingId/payment
```

Access:

```text
Authenticated
```

Response:

```json
{
  "success": true,
  "data": {
    "booking_id": "uuid",
    "payment_id": "uuid",
    "status": "PAID",
    "amount": 100000
  },
  "message": "Payment retrieved successfully"
}
```

---

# 42. Payment Webhook

```text
POST /api/v1/payments/webhook
```

Access:

```text
Payment Provider
```

Endpoint ini tidak menggunakan normal user authentication.

Backend harus:

1. Validate webhook.
2. Verify transaction.
3. Prevent duplicate processing.
4. Update payment.
5. Update booking.
6. Create notification.
7. Commit transaction.

---

# 43. Payment Webhook Idempotency

Webhook dapat dikirim lebih dari satu kali.

Backend harus memastikan webhook yang sama tidak menyebabkan:

```text
Duplicate payment
Duplicate booking confirmation
Duplicate notification
```

Payment processing harus idempotent.

---

# 44. Reviews

## Get Place Reviews

```text
GET /api/v1/places/:id/reviews
```

Access:

```text
Public
```

Query:

```text
page
limit
rating
```

---

# 45. Create Review

```text
POST /api/v1/places/:id/reviews
```

Access:

```text
CUSTOMER
```

Request:

```json
{
  "booking_id": "uuid",
  "rating": 5,
  "comment": "Tempatnya bersih dan nyaman."
}
```

Backend harus memastikan booking:

* Milik customer.
* Berkaitan dengan place.
* Berstatus `COMPLETED`.
* Belum memiliki review.

---

# 46. Update Review

```text
PATCH /api/v1/reviews/:id
```

Access:

```text
CUSTOMER
```

Customer hanya dapat mengubah review miliknya sendiri.

---

# 47. Delete Review

```text
DELETE /api/v1/reviews/:id
```

Access:

```text
CUSTOMER
ADMIN
```

Customer hanya dapat menghapus review miliknya.

Admin dapat melakukan moderation sesuai policy.

---

# 48. Favorites

## Get Favorites

```text
GET /api/v1/favorites
```

Access:

```text
CUSTOMER
```

## Add Favorite

```text
POST /api/v1/favorites
```

Request:

```json
{
  "place_id": "uuid"
}
```

## Remove Favorite

```text
DELETE /api/v1/favorites/:placeId
```

Access:

```text
CUSTOMER
```

User tidak boleh memiliki favorite duplicate.

---

# 49. Notifications

## Get Notifications

```text
GET /api/v1/notifications
```

Access:

```text
Authenticated
```

Query:

```text
page
limit
is_read
```

---

# 50. Mark Notification as Read

```text
PATCH /api/v1/notifications/:id/read
```

Access:

```text
Authenticated
```

User hanya dapat mengubah notification miliknya sendiri.

---

# 51. Mark All Notifications as Read

```text
POST /api/v1/notifications/read-all
```

Access:

```text
Authenticated
```

---

# 52. Customer Dashboard

```text
GET /api/v1/customer/dashboard
```

Access:

```text
CUSTOMER
```

Data dapat berisi:

```text
Upcoming bookings
Recent bookings
Favorite places
Recent notifications
Booking statistics
```

Dashboard tidak boleh mengambil seluruh database data lalu melakukan aggregation di frontend.

Aggregation dilakukan oleh backend/database.

---

# 53. Owner Dashboard

```text
GET /api/v1/owner/dashboard
```

Access:

```text
OWNER
```

Data dapat berisi:

```text
Total places
Active places
Upcoming bookings
Total bookings
Revenue
Recent bookings
Popular places
Rating summary
```

---

# 54. Owner Revenue

```text
GET /api/v1/owner/revenue
```

Access:

```text
OWNER
```

Query:

```text
start_date
end_date
place_id
```

Backend hanya boleh menghitung revenue dari place milik owner.

---

# 55. Owner Analytics

```text
GET /api/v1/owner/analytics
```

Access:

```text
OWNER
```

Potential metrics:

```text
Booking count
Revenue
Average rating
Popular place
Peak booking hours
Cancellation rate
```

Analytics harus dihitung dari database.

---

# 56. Admin Users

## Get Users

```text
GET /api/v1/admin/users
```

Access:

```text
ADMIN
```

Query:

```text
page
limit
role
status
search
```

---

# 57. Admin User Detail

```text
GET /api/v1/admin/users/:id
```

Access:

```text
ADMIN
```

---

# 58. Admin Update User

```text
PATCH /api/v1/admin/users/:id
```

Access:

```text
ADMIN
```

Admin dapat mengubah status account sesuai permission.

---

# 59. Admin Places

## Get Places

```text
GET /api/v1/admin/places
```

Access:

```text
ADMIN
```

## Get Place

```text
GET /api/v1/admin/places/:id
```

Access:

```text
ADMIN
```

## Update Place Status

```text
PATCH /api/v1/admin/places/:id/status
```

Request:

```json
{
  "status": "ACTIVE"
}
```

---

# 60. Admin Bookings

```text
GET /api/v1/admin/bookings
```

Access:

```text
ADMIN
```

Query:

```text
page
limit
status
date
place_id
user_id
```

Admin dapat melihat platform-wide booking data.

---

# 61. Admin Reviews

```text
GET /api/v1/admin/reviews
```

Access:

```text
ADMIN
```

Admin dapat melakukan review moderation.

---

# 62. Reports

## Create Report

```text
POST /api/v1/reports
```

Access:

```text
Authenticated
```

Request:

```json
{
  "target_type": "PLACE",
  "target_id": "uuid",
  "reason": "INAPPROPRIATE_CONTENT",
  "description": "Description"
}
```

---

# 63. Admin Reports

## Get Reports

```text
GET /api/v1/admin/reports
```

Access:

```text
ADMIN
```

## Update Report

```text
PATCH /api/v1/admin/reports/:id
```

Access:

```text
ADMIN
```

---

# 64. AI Recommendation

AI recommendation merupakan post-MVP feature.

Endpoint:

```text
POST /api/v1/ai/recommendations
```

Access:

```text
CUSTOMER
```

Request:

```json
{
  "query": "Saya mencari tempat futsal di Jakarta Barat untuk 10 orang dengan budget 200 ribu."
}
```

Backend harus:

1. Process user query.
2. Extract relevant criteria.
3. Search actual database.
4. Send relevant data to AI.
5. Receive recommendation.
6. Validate AI response.
7. Return actual places.

AI tidak boleh membuat place fiktif.

---

# 65. AI Business Insights

Endpoint:

```text
GET /api/v1/owner/ai/insights
```

Access:

```text
OWNER
```

AI dapat memberikan insight berdasarkan data owner.

Contoh:

```text
Peak booking hours
Revenue trends
Low-performing periods
Popular places
Potential pricing suggestions
```

AI hanya boleh menggunakan data yang dapat diakses oleh owner tersebut.

---

# 66. Admin Platform Analytics

```text
GET /api/v1/admin/analytics
```

Access:

```text
ADMIN
```

Potential metrics:

```text
Total users
Total owners
Total places
Total bookings
Total revenue
Booking growth
User growth
Popular categories
Platform cancellation rate
```

---

# 67. Search and Recommendation Rules

Search API harus memprioritaskan:

1. Exact relevance.
2. Location relevance.
3. Availability.
4. Price criteria.
5. Rating.
6. Popularity.

Jika customer meminta tempat pada waktu tertentu, backend harus mempertimbangkan availability.

Place yang tidak tersedia tidak boleh ditampilkan sebagai available.

---

# 68. Authentication Error

Jika user belum authenticated:

```text
401 Unauthorized
```

Response:

```json
{
  "success": false,
  "data": null,
  "message": "Authentication required",
  "error": {
    "code": "UNAUTHORIZED"
  }
}
```

---

# 69. Authorization Error

Jika user authenticated tetapi tidak memiliki permission:

```text
403 Forbidden
```

Response:

```json
{
  "success": false,
  "data": null,
  "message": "You do not have permission to perform this action",
  "error": {
    "code": "FORBIDDEN"
  }
}
```

---

# 70. Resource Not Found

Jika resource tidak ditemukan:

```text
404 Not Found
```

Example:

```json
{
  "success": false,
  "data": null,
  "message": "Place not found",
  "error": {
    "code": "PLACE_NOT_FOUND"
  }
}
```

---

# 71. Validation Error

Jika request tidak valid:

```text
422 Unprocessable Entity
```

Example:

```json
{
  "success": false,
  "data": null,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": {
      "email": "Invalid email",
      "password": "Password is required"
    }
  }
}
```

---

# 72. Conflict Error

Gunakan `409 Conflict` untuk kondisi seperti:

```text
Booking slot unavailable
Duplicate favorite
Duplicate review
Duplicate resource
```

Example:

```json
{
  "success": false,
  "data": null,
  "message": "Resource already exists",
  "error": {
    "code": "RESOURCE_ALREADY_EXISTS"
  }
}
```

---

# 73. Rate Limiting

Rate limiting dapat diterapkan pada endpoint yang berisiko disalahgunakan.

Prioritas:

```text
Login
Register
Password-related endpoint
AI endpoint
Payment endpoint
Report endpoint
```

Jika rate limit tercapai:

```text
429 Too Many Requests
```

---

# 74. API Security Rules

API harus:

* Menggunakan HTTPS pada production.
* Memvalidasi authentication.
* Memvalidasi authorization.
* Memvalidasi input.
* Menggunakan parameterized queries melalui ORM.
* Tidak mengembalikan password.
* Tidak mengembalikan secret.
* Tidak mempercayai client-side payment status.
* Tidak mempercayai client-side role.
* Tidak membocorkan internal server errors.

---

# 75. Ownership Rules

Endpoint owner harus selalu melakukan ownership validation.

Contoh:

```text
GET /owner/places/:id
PATCH /owner/places/:id
DELETE /owner/places/:id
GET /owner/bookings/:id
GET /owner/revenue
```

Owner tidak boleh mengakses data milik owner lain hanya dengan mengetahui UUID.

---

# 76. API Idempotency

Operation yang dapat dikirim berulang kali harus dipertimbangkan untuk idempotency.

Prioritas:

```text
Payment creation
Payment webhook
Booking confirmation
```

Tujuannya untuk mencegah duplicate transaction atau duplicate state changes.

---

# 77. API Documentation

API implementation harus mengikuti dokumen ini.

Jika endpoint baru diperlukan:

1. Tentukan kebutuhan.
2. Update `API.md`.
3. Implementasikan backend.
4. Implementasikan frontend.
5. Test endpoint.

Agentic AI tidak boleh membuat endpoint baru yang bertentangan dengan API specification tanpa memperbarui dokumentasi.

---

# 78. API Contract Rule

Frontend dan backend harus mengikuti contract yang sama.

Jika backend mengubah:

```text
Request
Response
Endpoint
Field name
Status code
```

maka frontend dan `API.md` harus diperbarui.

Jangan membuat frontend menebak response backend.

---

# 79. API Development Priority

Implementasi API mengikuti urutan:

```text
1. Authentication
2. Users
3. Categories
4. Facilities
5. Places
6. Operating Hours
7. Pricing
8. Availability
9. Bookings
10. Payments
11. Booking History
12. Reviews
13. Favorites
14. Notifications
15. Owner Dashboard
16. Admin Dashboard
17. Reports
18. AI
```

---

# 80. Final API Principle

API RentSpace harus menjadi contract yang jelas antara frontend dan backend.

Architecture:

```text
Frontend
    ↓
REST API
    ↓
Authentication
    ↓
Authorization
    ↓
Validation
    ↓
Business Logic
    ↓
Repository
    ↓
PostgreSQL
```

Frontend tidak boleh melewati API untuk mengakses database.

Backend menjadi source of truth untuk seluruh business-critical operation, terutama:

```text
Authentication
Authorization
Availability
Booking
Payment
Ownership
Reviews
Revenue
AI data access
```

Semua implementasi API harus menjaga consistency, security, maintainability, dan scalability RentSpace.

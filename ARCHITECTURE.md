# RentSpace — Architecture Document

## 1. Architecture Overview

RentSpace menggunakan arsitektur **full-stack web application** dengan pemisahan antara frontend, backend, dan database.

Arsitektur utama:

```text
                    ┌─────────────────────┐
                    │       Customer      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │       Frontend      │
                    │ Next.js + TypeScript│
                    └──────────┬──────────┘
                               │
                         REST API / HTTPS
                               │
                    ┌──────────▼──────────┐
                    │       Backend       │
                    │     Golang + Gin    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘
```

External services:

```text
Frontend
   │
   ├── Backend API
   │
   └── Google Maps

Backend
   │
   ├── PostgreSQL
   ├── Payment Provider
   ├── File Storage
   ├── Email / Notification Service
   └── AI Service
```

Frontend bertanggung jawab terhadap user interface dan user experience.

Backend bertanggung jawab terhadap business logic, authentication, authorization, booking, payment verification, dan akses database.

Database bertanggung jawab terhadap penyimpanan data aplikasi secara persistent.

---

# 2. Architecture Principles

RentSpace harus mengikuti prinsip berikut:

1. Separation of concerns.
2. Clear responsibility between frontend and backend.
3. Backend menjadi sumber kebenaran untuk business logic.
4. Database menjadi sumber kebenaran untuk persistent data.
5. Frontend tidak boleh melakukan validasi business logic yang hanya boleh dipercaya dari sisi client.
6. Semua data penting harus divalidasi kembali di backend.
7. Authentication dan authorization harus dilakukan secara aman.
8. Booking harus aman dari double booking.
9. Payment harus diverifikasi melalui backend.
10. Fitur harus dikembangkan secara incremental.
11. Kode harus mudah dipelihara dan dikembangkan.
12. Hindari overengineering pada MVP.
13. Gunakan kembali component, service, dan utility yang sudah tersedia.
14. Jangan menambahkan dependency tanpa alasan yang jelas.

---

# 3. Technology Stack

## 3.1 Frontend

Frontend menggunakan:

* Next.js
* TypeScript
* React
* Tailwind CSS
* shadcn/ui

Next.js digunakan untuk membangun application interface dan routing.

TypeScript wajib digunakan untuk menjaga type safety.

Tailwind CSS digunakan untuk styling.

shadcn/ui digunakan sebagai dasar reusable UI components jika dibutuhkan.

---

# 4. Backend

Backend menggunakan:

* Golang
* Gin
* GORM

Golang digunakan untuk membangun REST API dan business logic.

Gin digunakan sebagai HTTP web framework.

GORM digunakan sebagai ORM untuk PostgreSQL.

Backend harus memiliki struktur modular agar setiap domain memiliki tanggung jawab yang jelas.

Contoh domain:

```text
auth
users
places
bookings
reviews
favorites
notifications
payments
admin
```

---

# 5. Database

Database menggunakan:

**PostgreSQL**

PostgreSQL menjadi primary persistent database untuk RentSpace.

Database bertanggung jawab menyimpan:

* Users
* Owner profiles
* Places
* Place images
* Categories
* Facilities
* Availability
* Bookings
* Payments
* Reviews
* Favorites
* Notifications
* Reports
* Related system data

Database schema akan dijelaskan secara lebih detail pada:

```text
DATABASE.md
```

---

# 6. Frontend Architecture

Frontend menggunakan struktur berbasis feature/domain.

Contoh struktur:

```text
frontend/
│
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── owner/
│   ├── admin/
│   └── places/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── places/
│   ├── booking/
│   ├── dashboard/
│   └── shared/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── utils/
│   └── validations/
│
├── hooks/
│
├── types/
│
└── public/
```

Struktur dapat berkembang sesuai kebutuhan implementasi.

---

# 7. Backend Architecture

Backend menggunakan pendekatan modular berdasarkan domain.

Struktur yang direkomendasikan:

```text
backend/
│
├── cmd/
│   └── server/
│
├── internal/
│   ├── auth/
│   ├── users/
│   ├── places/
│   ├── bookings/
│   ├── reviews/
│   ├── favorites/
│   ├── notifications/
│   ├── payments/
│   ├── admin/
│   └── ai/
│
├── middleware/
├── database/
├── config/
├── routes/
├── migrations/
└── pkg/
```

Setiap domain harus memisahkan tanggung jawab seperti:

```text
Handler / Controller
        ↓
Service
        ↓
Repository
        ↓
Database
```

Contoh:

```text
Booking Handler
      ↓
Booking Service
      ↓
Booking Repository
      ↓
PostgreSQL
```

---

# 8. API Architecture

Frontend dan backend berkomunikasi menggunakan:

**REST API over HTTPS**

Contoh:

```text
Frontend
   ↓
GET /api/v1/places
   ↓
Backend
   ↓
PostgreSQL
   ↓
Backend Response
   ↓
Frontend
```

API menggunakan versioning:

```text
/api/v1/
```

Contoh:

```text
/api/v1/auth/login
/api/v1/places
/api/v1/places/:id
/api/v1/bookings
/api/v1/reviews
```

Detail endpoint akan ditentukan dalam:

```text
API.md
```

---

# 9. API Response Standard

API harus memiliki format response yang konsisten.

Success response dapat menggunakan struktur:

```json
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

Error response:

```json
{
  "success": false,
  "data": null,
  "message": "An error occurred",
  "error": {
    "code": "ERROR_CODE"
  }
}
```

HTTP status code harus digunakan sesuai kondisi.

Contoh:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

---

# 10. Authentication Architecture

RentSpace menggunakan authentication berbasis token.

Authentication utama:

* Email/password.
* Google OAuth.

Authentication harus ditangani oleh backend.

Setelah login berhasil, user mendapatkan authenticated session/token sesuai implementasi final.

Frontend tidak boleh menentukan sendiri role user tanpa validasi backend.

Backend harus memverifikasi authentication pada protected endpoint.

---

# 11. Authorization

RentSpace menggunakan Role-Based Access Control.

Roles:

```text
CUSTOMER
OWNER
ADMIN
```

Contoh permission:

```text
CUSTOMER
├── Browse places
├── Create booking
├── Manage own booking
├── Create review
└── Manage favorites

OWNER
├── Manage own places
├── Manage own availability
├── View own bookings
└── View own revenue

ADMIN
├── Manage users
├── Manage owners
├── Manage places
├── Manage bookings
├── Moderate reviews
└── View platform analytics
```

Authorization wajib dilakukan di backend.

Frontend hanya digunakan untuk mengatur tampilan berdasarkan permission, bukan sebagai security boundary.

---

# 12. Booking Architecture

Booking merupakan salah satu domain paling penting dalam RentSpace.

Flow:

```text
Customer
   ↓
Select Place
   ↓
Select Date & Time
   ↓
Check Availability
   ↓
Create Booking
   ↓
Create Payment
   ↓
Payment Processing
   ↓
Payment Webhook
   ↓
Verify Payment
   ↓
Confirm Booking
```

Backend harus melakukan validasi availability kembali ketika booking dibuat.

Frontend availability tidak boleh dianggap sebagai sumber kebenaran.

---

# 13. Double Booking Prevention

RentSpace harus mencegah dua customer melakukan booking pada waktu yang sama.

Availability harus diperiksa:

1. Saat customer melihat jadwal.
2. Saat customer membuat booking.
3. Pada transaction database sebelum booking dikonfirmasi.

Booking yang waktunya overlap tidak boleh dikonfirmasi secara bersamaan.

Implementasi final dapat menggunakan:

* Database transaction.
* Row locking jika diperlukan.
* PostgreSQL constraints/indexing.
* Backend validation.

Solusi yang dipilih harus memprioritaskan data consistency.

---

# 14. Booking State Management

Booking memiliki status:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

Contoh state flow:

```text
PENDING
   │
   ├── Payment Success → CONFIRMED
   │
   ├── Payment Timeout → EXPIRED
   │
   └── Cancellation → CANCELLED

CONFIRMED
   │
   ├── Booking Finished → COMPLETED
   │
   └── Cancellation → CANCELLED
```

Perubahan status harus dilakukan oleh backend berdasarkan business rules.

Frontend tidak boleh mengubah status booking secara langsung tanpa authorization.

---

# 15. Payment Architecture

Payment provider awal:

**Midtrans**

Payment flow:

```text
Customer
   ↓
Frontend
   ↓
Backend
   ↓
Create Booking / Payment
   ↓
Midtrans
   ↓
Customer Payment
   ↓
Midtrans Webhook
   ↓
Backend
   ↓
Verify Notification
   ↓
Update Payment
   ↓
Update Booking
```

Backend harus memverifikasi payment notification.

Frontend tidak boleh menjadi sumber kebenaran payment status.

Secret key payment provider hanya boleh disimpan di backend environment variables.

---

# 16. Payment Security

Payment integration harus mengikuti prinsip:

* Jangan menyimpan payment secret di frontend.
* Jangan mempercayai status pembayaran yang dikirim client.
* Validasi webhook.
* Gunakan HTTPS pada production.
* Simpan transaction reference.
* Handle duplicate webhook.
* Handle payment failure.
* Handle expired payment.
* Handle refund jika fitur refund telah tersedia.

---

# 17. File Storage Architecture

Place images dan profile images membutuhkan external object/file storage.

Storage dapat menggunakan:

* Cloudinary
* Vercel Blob
* atau layanan object storage lain yang sesuai.

Database hanya menyimpan metadata atau URL file.

Contoh:

```text
Image File
    ↓
Cloud Storage
    ↓
Image URL
    ↓
PostgreSQL
```

File binary tidak disimpan langsung di PostgreSQL kecuali ada kebutuhan khusus.

---

# 18. Place Image Management

Owner dapat mengupload beberapa gambar untuk sebuah place.

Sistem harus mendukung:

* Upload image.
* Delete image.
* Set primary image.
* Reorder image jika diperlukan.

Image upload harus memiliki validasi:

* File type.
* File size.
* Maximum number of images.

Batas final akan ditentukan saat implementasi.

---

# 19. Location Architecture

Setiap place menyimpan:

```text
address
latitude
longitude
```

Location digunakan untuk:

* Menampilkan lokasi.
* Menghitung jarak.
* Location-based search.
* Map integration.

Google Maps dapat digunakan pada tahap lanjutan.

Location search harus menggunakan data lokasi yang tersimpan di database.

---

# 20. Search Architecture

Search places dilakukan melalui backend API.

Search dapat berdasarkan:

* Keyword.
* Category.
* Location.
* Price.
* Rating.
* Availability.
* Facilities.

Frontend mengirim filter kepada backend.

Contoh:

```text
GET /api/v1/places
    ?category=sports
    &min_price=50000
    &max_price=200000
```

Backend bertanggung jawab melakukan filtering.

Jangan mengambil seluruh data places ke frontend kemudian melakukan filtering besar-besaran di client.

---

# 21. Pagination

List data yang jumlahnya dapat berkembang harus menggunakan pagination.

Contoh:

```text
GET /api/v1/places?page=1&limit=12
```

Pagination harus digunakan pada:

* Places.
* Bookings.
* Reviews.
* Notifications.
* Users.
* Admin data.

Default dan maximum limit akan ditentukan dalam API specification.

---

# 22. Notification Architecture

Notification disimpan di database.

Contoh event:

```text
Booking Created
Payment Successful
Booking Confirmed
Booking Cancelled
Upcoming Booking
New Review
```

Flow:

```text
Business Event
      ↓
Notification Service
      ↓
Create Notification
      ↓
Database
      ↓
Frontend
```

Real-time notification menggunakan WebSocket dapat ditambahkan setelah core notification system stabil.

---

# 23. Real-Time Architecture

Real-time features merupakan post-MVP feature.

Teknologi yang direncanakan:

**WebSocket**

Potential use cases:

* Real-time booking updates.
* Owner receives new booking instantly.
* Notification updates.
* Admin monitoring.

Core application harus tetap berfungsi tanpa WebSocket.

WebSocket tidak boleh menjadi dependency wajib untuk basic booking flow pada MVP.

---

# 24. AI Architecture

AI merupakan advanced feature.

AI tidak boleh memiliki akses langsung tanpa kontrol terhadap database production.

Flow yang direkomendasikan:

```text
User Request
     ↓
Backend
     ↓
Prepare Relevant Data
     ↓
AI Service
     ↓
Validate AI Response
     ↓
Backend
     ↓
Frontend
```

AI recommendation harus menggunakan data places yang benar-benar tersedia.

AI tidak boleh mengarang:

* Place.
* Price.
* Availability.
* Rating.
* Facilities.

AI hanya memberikan recommendation berdasarkan data yang diberikan oleh backend.

---

# 25. AI Recommendation Example

Input:

```text
Saya mencari ruang meeting untuk 15 orang
di Jakarta Barat dengan budget maksimal
Rp500.000.
```

Backend dapat mengekstrak atau meminta AI untuk menghasilkan criteria:

```json
{
  "category": "meeting_room",
  "location": "Jakarta Barat",
  "capacity": 15,
  "max_price": 500000
}
```

Backend kemudian mencari data sebenarnya dari database.

AI dapat digunakan untuk membantu ranking atau menjelaskan alasan recommendation.

Database tetap menjadi sumber kebenaran.

---

# 26. Caching

Caching tidak menjadi prioritas pada MVP.

Caching dapat ditambahkan apabila terdapat kebutuhan performance yang jelas.

Data yang berpotensi di-cache:

* Popular places.
* Categories.
* Facilities.
* Public place information.

Data yang sangat dinamis seperti availability dan payment status tidak boleh menggunakan cache yang dapat menyebabkan informasi stale tanpa strategi invalidation yang tepat.

---

# 27. Validation

Validation harus dilakukan pada dua sisi:

### Frontend

Digunakan untuk:

* UX.
* Immediate feedback.
* Form validation.

### Backend

Digunakan untuk:

* Security.
* Data integrity.
* Business rules.

Backend validation selalu menjadi final authority.

Contoh:

```text
Frontend:
"Time looks valid."

Backend:
"Check operating hours."
"Check existing bookings."
"Check place status."
"Check user permission."
```

---

# 28. Error Handling

Backend harus mengembalikan error yang konsisten dan aman.

Error response tidak boleh membocorkan:

* Database credentials.
* Stack trace.
* Secret keys.
* Internal infrastructure details.
* Sensitive information.

Development environment dapat menggunakan logging yang lebih detail.

Production environment harus memberikan error yang aman untuk user.

---

# 29. Logging

Backend harus memiliki structured logging untuk event penting.

Contoh:

* Authentication failure.
* Booking creation.
* Booking cancellation.
* Payment webhook.
* Payment failure.
* Authorization failure.
* Unexpected server error.

Sensitive information seperti password, secret key, token, dan payment credentials tidak boleh ditulis ke log.

---

# 30. Security Architecture

Security harus diterapkan pada seluruh layer.

### Frontend

* Secure handling of authentication state.
* Input validation.
* Avoid exposing secrets.

### Backend

* Authentication.
* Authorization.
* Input validation.
* Rate limiting jika diperlukan.
* Secure headers.
* CORS configuration.
* Request validation.

### Database

* Parameterized queries melalui ORM.
* Proper indexes.
* Foreign key relationships.
* Transaction untuk operasi penting.

### Payment

* Webhook verification.
* Secret key hanya di backend.
* Idempotent payment processing.

---

# 31. Environment Configuration

Secret dan environment-specific configuration harus menggunakan environment variables.

Contoh:

```text
DATABASE_URL
JWT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
MIDTRANS_SERVER_KEY
MIDTRANS_CLIENT_KEY
AI_API_KEY
STORAGE_API_KEY
```

File `.env` tidak boleh di-commit ke repository.

Repository harus menyediakan:

```text
.env.example
```

yang hanya berisi nama variable tanpa secret asli.

---

# 32. CORS

Backend harus mengizinkan request hanya dari frontend domain yang telah dikonfigurasi.

Development:

```text
localhost
```

Production:

```text
RentSpace frontend domain
```

CORS tidak boleh menggunakan wildcard secara sembarangan pada production jika credentials digunakan.

---

# 33. Frontend State Management

Gunakan state management sesuai kebutuhan.

Tidak semua state harus menggunakan global state.

Gunakan:

* Local state untuk UI state sederhana.
* Server state/query management untuk API data jika diperlukan.
* Global state hanya untuk data yang benar-benar membutuhkan akses lintas halaman.

Hindari membuat global state besar yang sulit dipelihara.

---

# 34. Reusable Components

Frontend harus menggunakan reusable components.

Contoh:

```text
Button
Input
Modal
Dialog
Card
Badge
Dropdown
DatePicker
TimePicker
PlaceCard
BookingCard
Rating
Pagination
Navbar
Sidebar
```

Komponen yang sudah tersedia harus digunakan kembali daripada membuat versi baru dengan fungsi yang sama.

---

# 35. UI Architecture

UI harus mengikuti prinsip:

* Consistent spacing.
* Consistent typography.
* Consistent components.
* Responsive layout.
* Clear navigation.
* Accessible interaction.
* Clear loading state.
* Clear error state.
* Clear empty state.

Detail visual design akan ditentukan di:

```text
UI_GUIDELINES.md
```

setelah desain awal dibuat menggunakan Google Stitch.

---

# 36. Responsive Architecture

RentSpace harus responsive.

Target:

```text
Desktop
Tablet
Mobile
```

Desktop digunakan sebagai primary design target untuk dashboard.

Mobile harus tetap usable untuk:

* Search.
* Place detail.
* Booking.
* Booking history.
* Profile.

Owner dan admin dashboard dapat menggunakan responsive layout yang disesuaikan dengan kompleksitas data.

---

# 37. Testing Strategy

Testing harus dilakukan pada beberapa layer.

### Backend Unit Test

Test business logic seperti:

* Booking validation.
* Price calculation.
* Permission checking.
* Cancellation rules.

### Integration Test

Test:

* API.
* Database interaction.
* Authentication.
* Booking flow.
* Payment webhook.

### Frontend Test

Test komponen dan behavior penting jika diperlukan.

### End-to-End Test

Test critical user flow:

```text
Register
   ↓
Login
   ↓
Search Place
   ↓
Select Place
   ↓
Select Time
   ↓
Create Booking
   ↓
Payment
   ↓
Booking Confirmation
```

---

# 38. Deployment Architecture

Production architecture:

```text
                    Internet
                       │
                       ▼
              ┌─────────────────┐
              │     Vercel      │
              │    Frontend     │
              └────────┬────────┘
                       │
                    HTTPS
                       │
                       ▼
              ┌─────────────────┐
              │     Railway     │
              │ Golang Backend  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │   PostgreSQL    │
              │ Cloud Database  │
              └─────────────────┘
```

External services:

```text
Backend
 ├── Payment Provider
 ├── File Storage
 ├── AI Provider
 └── Maps Provider
```

Deployment provider dapat berubah selama development jika ada alasan teknis atau biaya.

---

# 39. CI/CD

Project sebaiknya menggunakan GitHub sebagai source control.

Development flow:

```text
Feature Branch
      ↓
Development
      ↓
Commit
      ↓
Pull Request
      ↓
Lint
      ↓
Type Check
      ↓
Test
      ↓
Review
      ↓
Merge
      ↓
Deployment
```

CI/CD dapat menggunakan GitHub Actions.

Minimal pipeline harus menjalankan:

* Frontend lint.
* Frontend type check.
* Backend test.
* Backend build.

---

# 40. Git Strategy

Gunakan branch terpisah untuk feature atau perubahan besar.

Contoh:

```text
main
│
├── feature/authentication
├── feature/place-management
├── feature/booking
├── feature/payment
└── feature/dashboard
```

Jangan melakukan perubahan besar langsung pada `main` tanpa validasi.

Commit message harus menjelaskan perubahan.

Contoh:

```text
feat: add place search API
feat: implement booking validation
fix: prevent overlapping bookings
refactor: simplify booking service
```

---

# 41. Development Environment

Development environment utama:

```text
Frontend
Node.js
Next.js

Backend
Go

Database
PostgreSQL
```

Project harus dapat dijalankan secara lokal tanpa bergantung pada production environment.

README harus menyediakan setup instructions setelah project mulai diimplementasikan.

---

# 42. Local Development

Development lokal dapat menggunakan:

```text
Frontend
http://localhost:3000

Backend
http://localhost:8080
```

Port dapat diubah melalui environment configuration jika diperlukan.

Frontend harus menggunakan backend API melalui environment variable.

Contoh:

```text
NEXT_PUBLIC_API_URL
```

Backend configuration harus menggunakan environment variables.

---

# 43. Data Ownership

Setiap resource harus memiliki ownership yang jelas.

Contoh:

```text
Owner A
 ├── Place 1
 ├── Place 2
 └── Place 3
```

Owner A tidak boleh memodifikasi:

```text
Owner B
 ├── Place 4
 └── Place 5
```

Backend harus memeriksa ownership sebelum operasi seperti:

* Update place.
* Delete place.
* Update availability.
* View owner-specific booking.
* View owner revenue.

---

# 44. API Security Boundary

Frontend tidak boleh dianggap sebagai trusted environment.

Semua request harus dianggap tidak terpercaya.

Backend wajib melakukan:

```text
Authentication
      ↓
Authorization
      ↓
Input Validation
      ↓
Business Logic
      ↓
Database Operation
```

Jangan mengandalkan hidden button atau frontend route protection sebagai satu-satunya security mechanism.

---

# 45. Scalability Considerations

RentSpace harus dirancang agar dapat berkembang tanpa perlu rewrite besar.

Prioritas scalability:

1. Modular backend.
2. Proper database indexing.
3. Pagination.
4. Efficient queries.
5. Stateless API jika memungkinkan.
6. External file storage.
7. Clear service boundaries.

Microservices tidak diperlukan untuk MVP.

Gunakan modular monolith terlebih dahulu.

---

# 46. Architecture Decision: Modular Monolith

Backend RentSpace menggunakan pendekatan **modular monolith** pada tahap awal.

Artinya semua domain berjalan dalam satu backend application tetapi dipisahkan secara modular.

Contoh:

```text
Backend
│
├── Auth Module
├── User Module
├── Place Module
├── Booking Module
├── Payment Module
├── Review Module
├── Notification Module
└── AI Module
```

Pendekatan ini dipilih karena:

* Lebih mudah dikembangkan.
* Lebih mudah di-debug.
* Lebih sederhana untuk deployment.
* Cocok untuk MVP.
* Tidak membutuhkan kompleksitas microservices.

Microservices hanya dipertimbangkan jika terdapat kebutuhan nyata di masa depan.

---

# 47. Source of Truth

Setiap dokumentasi memiliki tanggung jawab:

```text
PRD.md
→ Apa yang harus dibangun.

ARCHITECTURE.md
→ Bagaimana sistem dibangun.

DATABASE.md
→ Bagaimana data disimpan.

API.md
→ Bagaimana frontend dan backend berkomunikasi.

UI_GUIDELINES.md
→ Bagaimana interface harus terlihat dan berperilaku.

TASKS.md
→ Apa yang sedang dan akan dikerjakan.

AGENTS.md
→ Bagaimana Agentic AI harus bekerja.
```

Jika terdapat konflik antar dokumen, Agentic AI tidak boleh memilih secara sembarangan.

Agentic AI harus:

1. Mengidentifikasi konflik.
2. Menjelaskan konflik.
3. Menentukan dokumen mana yang terdampak.
4. Meminta keputusan jika konflik mempengaruhi architecture atau business requirement.

---

# 48. Architecture Change Policy

Perubahan architecture yang signifikan harus didokumentasikan.

Contoh perubahan signifikan:

* Mengganti database.
* Mengganti backend framework.
* Mengganti authentication architecture.
* Mengganti payment provider.
* Mengubah komunikasi REST menjadi GraphQL.
* Menambahkan microservices.
* Mengubah deployment architecture.

Jangan melakukan perubahan besar hanya karena implementasi saat ini terasa lebih mudah.

Perubahan harus memiliki alasan teknis yang jelas.

---

# 49. Implementation Priority

Architecture harus diimplementasikan secara bertahap.

Phase 1:

```text
Project Setup
Authentication
Database
Basic API
Basic Frontend
```

Phase 2:

```text
Place Management
Place Discovery
Place Detail
Availability
```

Phase 3:

```text
Booking
Payment
Booking History
Owner Dashboard
```

Phase 4:

```text
Reviews
Favorites
Notifications
Admin Dashboard
```

Phase 5:

```text
Maps
WebSocket
AI Recommendation
AI Business Insights
Advanced Analytics
```

---

# 50. Final Architecture Goal

RentSpace harus menjadi aplikasi yang:

* Mudah digunakan.
* Aman.
* Maintainable.
* Responsive.
* Reliable.
* Scalable untuk kebutuhan awal.
* Memiliki separation of concerns yang jelas.
* Memiliki backend yang menjadi sumber kebenaran business logic.
* Memiliki booking system yang aman dari double booking.
* Memiliki payment flow yang dapat diverifikasi.
* Dapat dikembangkan dengan fitur AI dan real-time di masa depan.

Architecture harus selalu mendukung tujuan utama RentSpace:

> Membuat proses mencari dan menyewa tempat menjadi sederhana, transparan, dan terpercaya.

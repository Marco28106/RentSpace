# RentSpace - AI Agent Development Guidelines

## 1. Document Purpose

Dokumen ini berisi aturan dan instruksi untuk AI coding agents yang bekerja pada project RentSpace.

AGENTS.md adalah aturan utama untuk Agentic AI ketika:

- membaca project
- memahami architecture
- membuat fitur
- mengubah fitur
- memperbaiki bug
- membuat API
- membuat database query
- membuat UI
- melakukan refactoring
- melakukan testing
- memperbaiki error
- menambahkan dependency
- mengubah konfigurasi

Agent wajib membaca dan mengikuti dokumen ini sebelum melakukan perubahan besar pada project.

---

# 2. Project Overview

RentSpace adalah platform web untuk mencari, membandingkan, dan melakukan booking berbagai jenis tempat secara online.

Contoh tempat:

- Futsal
- Badminton
- Basketball
- Photo studio
- Music studio
- Meeting room
- Coworking space
- Classroom
- Event venue
- Creative space

User dapat mencari tempat berdasarkan:

- lokasi
- kategori
- harga
- fasilitas
- rating
- kapasitas
- tanggal
- waktu
- durasi
- availability

RentSpace memiliki tiga role utama:

```text
CUSTOMER
OWNER
ADMIN
````

---

# 3. Technology Stack

## Frontend

```text
Next.js
TypeScript
React
Tailwind CSS
shadcn/ui
```

## Backend

```text
Go
Gin
GORM
```

## Database

```text
PostgreSQL
```

## Authentication

```text
JWT/session-based authentication
Google OAuth
```

## Storage

```text
Cloudinary
atau
Vercel Blob
```

## Maps

```text
Google Maps API
```

## Payment

```text
Midtrans
```

## Real-time

```text
WebSocket
```

## AI

```text
External AI API
```

## Deployment

```text
Vercel
Railway
Cloud PostgreSQL
```

---

# 4. Source of Truth

Agent harus memahami prioritas dokumentasi berikut:

```text
AGENTS.md
    ↓
UI_GUIDELINES.md
    ↓
PRD.md
    ↓
ARCHITECTURE.md
    ↓
DATABASE.md
    ↓
API.md
    ↓
TASKS.md
    ↓
Existing implementation
```

Namun prioritas tersebut tidak berarti agent boleh mengabaikan source code yang sudah ada.

Jika dokumentasi dan implementation berbeda, agent harus:

1. mendeteksi perbedaan
2. tidak langsung mengubah architecture
3. menjelaskan konflik
4. memilih solusi yang paling aman
5. memperbarui dokumentasi jika perubahan memang diperlukan

---

# 5. General Agent Rules

Agent harus:

* membaca code sebelum mengubahnya
* memahami architecture sebelum membuat file baru
* menggunakan existing components jika tersedia
* menggunakan existing utilities jika tersedia
* mengikuti naming convention
* mengikuti folder structure
* mengikuti API contract
* mengikuti database schema
* mengikuti UI guidelines
* menjaga backward compatibility jika memungkinkan
* membuat perubahan sekecil mungkin
* melakukan testing setelah perubahan
* menjelaskan perubahan yang dilakukan

Agent tidak boleh:

* rewrite seluruh project tanpa alasan
* menghapus fitur yang masih digunakan
* mengganti framework tanpa instruksi
* mengganti database tanpa instruksi
* mengganti library utama tanpa alasan
* membuat architecture baru tanpa alasan
* membuat API endpoint yang tidak terdokumentasi
* membuat database table yang tidak diperlukan
* membuat business rule sendiri
* mengarang data
* mengarang availability
* menganggap payment berhasil hanya berdasarkan frontend
* mengabaikan authorization
* menyimpan secret di source code

---

# 6. Before Starting Any Task

Sebelum mengerjakan task, agent harus:

## Step 1 - Inspect Project

Periksa:

```text
folder structure
existing files
package.json
go.mod
environment configuration
existing components
existing services
existing routes
existing database models
existing migrations
```

Jangan berasumsi project masih kosong.

---

## Step 2 - Read Relevant Documentation

Gunakan dokumentasi sesuai kebutuhan.

### UI task

Wajib membaca:

```text
AGENTS.md
UI_GUIDELINES.md
```

### Backend task

Wajib membaca:

```text
AGENTS.md
ARCHITECTURE.md
API.md
```

### Database task

Wajib membaca:

```text
AGENTS.md
DATABASE.md
ARCHITECTURE.md
```

### Booking task

Wajib membaca:

```text
AGENTS.md
PRD.md
ARCHITECTURE.md
DATABASE.md
API.md
TASKS.md
```

### AI task

Wajib membaca:

```text
AGENTS.md
PRD.md
ARCHITECTURE.md
API.md
```

---

# 7. Task Planning

Untuk task yang kompleks, agent harus membuat rencana sebelum coding.

Contoh:

```text
Task:
Implement booking creation

Plan:
1. Inspect booking model
2. Inspect availability logic
3. Inspect booking API
4. Implement validation
5. Implement service
6. Implement repository
7. Add handler
8. Add route
9. Connect frontend
10. Add loading/error state
11. Add tests
12. Run tests
```

Agent tidak harus membuat rencana panjang untuk perubahan kecil.

---

# 8. Minimal Change Principle

Agent harus memilih perubahan paling kecil yang menyelesaikan masalah.

Contoh:

Jika bug hanya berada pada:

```text
PlaceCard.tsx
```

jangan mengubah:

```text
booking system
database schema
API architecture
authentication
```

tanpa alasan yang jelas.

Tujuan:

```text
minimum change
+
maximum correctness
```

---

# 9. Existing Code First

Sebelum membuat sesuatu dari awal, agent harus mencari apakah functionality tersebut sudah tersedia.

Contoh:

Sebelum membuat:

```text
formatCurrency()
```

cari apakah project sudah memiliki:

```text
formatCurrency()
money.ts
utils.ts
currency.ts
```

Jika sudah ada, gunakan existing implementation.

Jangan membuat duplicate utility.

---

# 10. Dependency Rules

Agent tidak boleh menambahkan dependency baru tanpa alasan.

Sebelum menambahkan package:

1. periksa apakah functionality sudah tersedia
2. periksa dependency yang sudah terinstall
3. gunakan native functionality jika cukup
4. gunakan library existing jika sesuai
5. baru tambahkan dependency jika benar-benar diperlukan

Jika dependency baru diperlukan, jelaskan:

```text
Package:
Reason:
Alternative considered:
Why this package:
```

---

# 11. Frontend Rules

## 11.1 Framework

Gunakan:

```text
Next.js
TypeScript
React
```

Jangan menggunakan:

```text
plain JavaScript
Vue
Angular
Svelte
```

untuk bagian utama project tanpa instruksi eksplisit.

---

# 12. TypeScript Rules

TypeScript harus digunakan secara konsisten.

Hindari:

```ts
any
```

jika type yang tepat dapat dibuat.

Prefer:

```ts
interface
type
generics
union types
```

Contoh:

```ts
type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED";
```

Jangan menggunakan:

```ts
const status: any = ...
```

hanya untuk menghilangkan TypeScript error.

---

# 13. React Component Rules

Gunakan component yang reusable.

Contoh:

```text
PlaceCard
Button
SearchField
BookingSummary
RatingDisplay
```

lebih baik daripada membuat UI yang sama berulang kali.

---

## Avoid Over-Abstraction

Jangan membuat component hanya karena sebuah element muncul sekali.

Contoh:

Tidak perlu:

```text
VenueTitleWrapper
VenueDescriptionWrapper
VenuePriceWrapper
```

jika hanya digunakan satu kali dan tidak memiliki logic khusus.

Gunakan abstraction jika:

* digunakan berkali-kali
* memiliki logic
* memiliki state
* memiliki behavior kompleks
* meningkatkan readability

---

# 14. Server vs Client Components

Gunakan Server Components secara default.

Gunakan Client Components hanya jika diperlukan untuk:

* state
* event handlers
* browser APIs
* interactive UI
* WebSocket
* form interaction
* client-side hooks

Jangan menambahkan:

```tsx
"use client";
```

secara otomatis ke setiap page.

---

# 15. Data Fetching Rules

Data penting harus berasal dari backend.

Jangan hardcode production data di frontend.

Tidak boleh:

```ts
const places = [
  {
    name: "Fake Futsal",
    price: 100000
  }
];
```

untuk production functionality.

Gunakan API backend.

---

# 16. API Communication

Frontend harus berkomunikasi dengan backend melalui API yang telah ditentukan.

Base API:

```text
/api/v1
```

Agent tidak boleh membuat endpoint baru hanya karena frontend membutuhkan data.

Jika endpoint belum tersedia:

1. cek API.md
2. cek backend
3. tentukan apakah endpoint memang diperlukan
4. implementasikan sesuai API conventions
5. update API.md jika diperlukan

---

# 17. Frontend State Rules

Gunakan state hanya ketika diperlukan.

Contoh state yang valid:

```text
search query
selected date
selected time
selected duration
modal state
filter state
form state
loading state
```

Jangan menyimpan semua data aplikasi ke global state tanpa alasan.

---

# 18. Form Rules

Semua form harus memiliki:

```text
label
input
validation
loading state
error state
success feedback
```

Contoh:

```text
Place Name
[________________]

Description
[________________]

Category
[ Select category ]

Price
[________________]

[ Save Place ]
```

---

# 19. Form Validation

Validation harus dilakukan minimal pada:

```text
Frontend
Backend
```

Frontend validation:

```text
UX
```

Backend validation:

```text
Security
Data integrity
```

Frontend validation tidak boleh dianggap sebagai security mechanism.

---

# 20. UI Rules

Semua UI harus mengikuti:

```text
UI_GUIDELINES.md
```

Visual reference utama:

```text
Google Stitch designs
```

Jika terdapat konflik:

```text
Stitch visual reference
+
UI_GUIDELINES.md
```

harus menjadi acuan utama untuk visual design.

---

# 21. Design Direction

RentSpace harus terlihat:

```text
Premium
Modern
Clean
Professional
Elegant
Calm
Trustworthy
Minimal
```

Hindari:

```text
Neon colors
Excessive gradients
Excessive shadows
Excessive animations
Glassmorphism
Overly rounded UI
Generic SaaS appearance
Purple-blue AI gradients
Visual clutter
```

---

# 22. Color Rules

Gunakan design tokens dari:

```text
UI_GUIDELINES.md
```

Jangan membuat warna baru secara random.

Contoh:

```text
Primary
Secondary
Background
Surface
Border
Muted
Success
Warning
Error
```

Jika warna baru diperlukan:

1. cek apakah token existing dapat digunakan
2. jika tidak, tambahkan token secara konsisten
3. update UI_GUIDELINES.md

---

# 23. Typography Rules

Gunakan typography system yang sudah ditentukan.

Jangan membuat setiap component menggunakan font size random.

Gunakan hierarchy:

```text
Display
H1
H2
H3
Body
Small
Caption
```

---

# 24. Responsive Design

Semua page wajib responsive.

Minimal:

```text
Mobile
Tablet
Desktop
```

Agent harus memeriksa:

```text
320px+
768px+
1024px+
1280px+
```

Tidak boleh ada:

```text
horizontal overflow
broken grid
text overflow
overlapping elements
```

---

# 25. Accessibility

UI harus memperhatikan:

```text
semantic HTML
keyboard navigation
focus state
color contrast
form labels
ARIA where necessary
alt text
screen reader support
```

Jangan menggunakan `<div>` sebagai button jika `<button>` dapat digunakan.

---

# 26. Loading State

Setiap asynchronous UI harus memiliki loading state yang sesuai.

Gunakan:

```text
Skeleton
Spinner
Disabled button
Loading text
```

Hindari halaman terlihat rusak saat data sedang dimuat.

---

# 27. Empty State

Jika data kosong, jangan hanya menampilkan blank page.

Contoh:

```text
No bookings yet

Your upcoming bookings will appear here.
```

Tambahkan CTA jika relevan.

---

# 28. Error State

Error harus:

* jelas
* singkat
* tidak terlalu teknis
* memberikan next action jika memungkinkan

Jangan menampilkan raw error seperti:

```text
panic: runtime error
SQLSTATE 23505
ECONNREFUSED
```

kepada user.

Error teknis boleh dicatat di server log.

---

# 29. Backend Architecture

Gunakan:

```text
Handler
    ↓
Service
    ↓
Repository
    ↓
Database
```

---

# 30. Handler Rules

Handler bertanggung jawab terhadap:

```text
HTTP request
request parsing
validation entry point
authentication context
calling service
HTTP response
```

Handler tidak boleh berisi business logic kompleks.

Hindari:

```go
func CreateBooking(c *gin.Context) {
    // 200 lines of business logic
}
```

Business logic harus berada di service layer.

---

# 31. Service Rules

Service menangani:

```text
business logic
validation
business rules
transactions
coordination
```

Contoh:

```text
BookingService
PaymentService
PlaceService
AvailabilityService
```

---

# 32. Repository Rules

Repository menangani:

```text
database queries
CRUD
database-specific operations
```

Repository tidak boleh menentukan business decisions.

Contoh:

```text
Repository:
GetBookingByID()

Service:
CanCustomerCancelBooking()
```

---

# 33. Database Rules

Database:

```text
PostgreSQL
```

ORM:

```text
GORM
```

Gunakan migration.

Jangan mengubah production database secara manual tanpa migration.

---

# 34. Database Schema Changes

Jika task membutuhkan perubahan database:

1. inspect existing schema
2. inspect DATABASE.md
3. create migration
4. update model
5. update repository
6. update service
7. update API if required
8. update documentation
9. test migration

Jangan hanya mengubah struct GORM tanpa migration.

---

# 35. Database Query Rules

Hindari:

```text
N+1 query
```

Gunakan:

```text
Preload
Joins
appropriate indexes
pagination
```

jika memang diperlukan.

Jangan mengambil seluruh tabel jika hanya membutuhkan beberapa records.

---

# 36. Ownership Rules

OWNER hanya boleh mengakses resource miliknya sendiri.

Contoh:

```text
Owner A
    ↓
Place A
```

Owner A tidak boleh:

```text
edit Place B
delete Place B
view private bookings of Place B
```

meskipun mengetahui ID resource tersebut.

Selalu lakukan ownership validation di backend.

---

# 37. RBAC

Roles:

```text
CUSTOMER
OWNER
ADMIN
```

Permission harus diperiksa di backend.

Frontend role checking hanya untuk UI.

Frontend bukan security boundary.

---

# 38. Authentication Security

Authentication harus:

* menggunakan secure mechanism
* memiliki expiration
* memiliki logout mechanism
* tidak menyimpan secret di frontend
* tidak mengekspos password
* tidak mengekspos authentication secrets

Jika menggunakan cookie:

```text
HttpOnly
Secure
SameSite
```

harus dipertimbangkan sesuai environment dan architecture.

---

# 39. Password Rules

Password tidak boleh disimpan dalam plaintext.

Gunakan password hashing yang aman seperti:

```text
Argon2id
```

atau:

```text
bcrypt
```

Password tidak boleh muncul di:

```text
logs
API response
database plaintext
frontend state
```

---

# 40. Payment Rules

Payment provider:

```text
Midtrans
```

Payment merupakan backend responsibility.

Frontend tidak boleh menentukan bahwa payment berhasil.

Tidak boleh:

```text
Frontend:
paymentSuccess = true
bookingStatus = CONFIRMED
```

tanpa verification backend.

---

# 41. Payment Verification

Payment harus diverifikasi menggunakan:

```text
Midtrans webhook/callback
```

Backend harus:

[ ] verify provider response

[ ] verify signature where applicable

[ ] update payment

[ ] update booking

[ ] handle duplicate callback

[ ] maintain idempotency

---

# 42. Booking Rules

Booking status:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

Payment status:

```text
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

Agent tidak boleh membuat status baru tanpa memperbarui seluruh documentation dan business logic.

---

# 43. Booking Availability

Availability harus selalu divalidasi oleh backend.

Booking harus memeriksa:

```text
place status
operating hours
availability blocks
existing bookings
requested date
requested time
requested duration
```

---

# 44. Double Booking Prevention

Agent wajib menganggap double booking sebagai critical issue.

Sistem harus mencegah:

```text
User A → 19:00-20:00
User B → 19:00-20:00
```

keduanya berhasil untuk resource yang sama.

Conflict checking harus dilakukan di backend dan sedekat mungkin dengan transaction/commit.

---

# 45. Race Condition

Jangan hanya mengandalkan:

```text
frontend availability check
```

Karena:

```text
User A checks slot
User B checks slot
User A books
User B books
```

dapat menyebabkan race condition.

Gunakan database transaction/locking/constraint strategy yang sesuai.

---

# 46. Price Calculation

Harga booking harus dihitung oleh backend.

Frontend hanya menampilkan estimasi.

Contoh:

```text
Frontend:
Rp100.000 × 2 jam

Backend:
Rp200.000
```

Backend adalah source of truth.

Jangan percaya:

```json
{
  "total_price": 1
}
```

yang dikirim client tanpa validasi.

---

# 47. AI Rules

AI adalah fitur tambahan.

AI bukan source of truth.

AI tidak boleh:

```text
create booking
confirm payment
modify payment
modify database directly
bypass RBAC
invent places
invent prices
invent availability
```

---

# 48. AI Recommendation

AI recommendation harus berdasarkan candidate places dari backend/database.

Flow:

```text
User preferences
        ↓
Backend
        ↓
Query candidate places
        ↓
AI
        ↓
Recommendation
        ↓
Backend validation
        ↓
Frontend
```

---

# 49. AI Output Validation

AI output harus dianggap untrusted.

Jika AI mengembalikan:

```json
{
  "place_id": "abc"
}
```

backend harus memvalidasi bahwa:

```text
place exists
place is active
place matches allowed criteria
```

---

# 50. AI Prompt Rules

Jangan memasukkan:

```text
database credentials
API secrets
payment secrets
private authentication tokens
```

ke AI prompt.

Jangan memberikan AI unrestricted access ke production database.

---

# 51. API Design

API base:

```text
/api/v1
```

Gunakan RESTful structure.

Contoh:

```text
GET    /api/v1/places
GET    /api/v1/places/:id
POST   /api/v1/owner/places
PATCH  /api/v1/owner/places/:id
DELETE /api/v1/owner/places/:id
POST   /api/v1/bookings
GET    /api/v1/bookings/:id
POST   /api/v1/payments
```

---

# 52. API Response

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "code": "ERROR_CODE"
  }
}
```

Response structure harus konsisten.

---

# 53. HTTP Status Codes

Gunakan secara benar:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error
```

Contoh:

Booking conflict:

```text
409 Conflict
```

Unauthorized:

```text
401
```

Authenticated but forbidden:

```text
403
```

---

# 54. API Validation

Semua input API harus divalidasi.

Contoh:

```text
email
password
UUID
date
time
duration
price
pagination
sort
```

Jangan percaya input client.

---

# 55. Pagination

List endpoint harus menggunakan pagination jika datanya berpotensi besar.

Contoh:

```text
?page=1&limit=20
```

Jangan mengambil ribuan records hanya untuk satu page.

---

# 56. Search Rules

Search dapat menggunakan:

```text
keyword
category
location
price
rating
facilities
capacity
date
time
duration
```

Search harus tetap memiliki:

```text
pagination
sorting
loading state
empty state
error state
```

---

# 57. Image Rules

Gunakan optimized image delivery.

Frontend:

```text
Next.js Image
```

jika sesuai.

Image harus memiliki:

```text
alt
appropriate dimensions
lazy loading where appropriate
```

Jangan mengirim image original berukuran sangat besar jika tidak diperlukan.

---

# 58. File Upload

File upload harus:

* divalidasi type
* divalidasi size
* menggunakan secure storage
* tidak menyimpan file sensitif di public repository
* memiliki error handling

---

# 59. Environment Variables

Secret hanya boleh berada di environment variables.

Contoh:

```text
DATABASE_URL
JWT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
MIDTRANS_SERVER_KEY
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
AI_API_KEY
```

Jangan:

```ts
const MIDTRANS_SERVER_KEY = "secret";
```

---

# 60. Environment Separation

Gunakan environment:

```text
development
staging
production
```

Jangan menggunakan production database untuk development.

---

# 61. Logging

Log informasi yang berguna untuk debugging.

Contoh:

```text
request_id
user_id
endpoint
status_code
duration
error_code
```

Jangan log:

```text
password
JWT secret
payment secret
API key
full authentication token
sensitive payment information
```

---

# 62. Error Handling Backend

Backend harus menangani error secara konsisten.

Jangan expose internal implementation detail kepada user.

Bad:

```text
pq: duplicate key value violates unique constraint
```

Better:

```text
An account with this email already exists.
```

Internal error tetap dicatat di server log.

---

# 63. Security Rules

Agent harus memperhatikan:

```text
authentication
authorization
input validation
SQL injection
XSS
CSRF where applicable
CORS
rate limiting
secure headers
secret management
file upload security
payment verification
```

Security tidak boleh dikorbankan demi kecepatan development.

---

# 64. Testing Rules

Setiap feature penting harus memiliki testing.

Minimal:

```text
unit test
integration test
```

Untuk critical user flow:

```text
E2E test
```

---

# 65. What Must Be Tested

Critical:

```text
Authentication
Authorization
Place CRUD
Search
Availability
Booking
Double booking
Cancellation
Payment
Webhook
Review
```

---

# 66. Test Before Marking DONE

Jangan mengubah:

```text
[ ] TODO
```

menjadi:

```text
[x] DONE
```

jika feature belum diuji.

DONE berarti:

```text
implemented
+
tested
+
working
```

---

# 67. Regression Testing

Setelah memperbaiki bug, test:

```text
bug fix
+
related functionality
```

Contoh:

Jika memperbaiki booking cancellation:

test:

```text
create booking
view booking
cancel booking
payment state
owner booking
booking history
```

---

# 68. Build Validation

Sebelum menyelesaikan task, jalankan command yang relevan.

Frontend:

```text
npm run lint
npm run build
```

Backend:

```text
go test ./...
go build ./...
```

Jika script berbeda, gunakan script yang tersedia di project.

---

# 69. Do Not Hide Errors

Jangan menggunakan workaround seperti:

```ts
// @ts-ignore
```

atau:

```ts
any
```

hanya untuk membuat build lolos.

Jika benar-benar diperlukan, harus ada alasan teknis.

---

# 70. Refactoring Rules

Refactoring boleh dilakukan jika:

* mengurangi duplication
* memperbaiki readability
* memperbaiki performance
* memperbaiki architecture
* mengurangi bug

Jangan melakukan refactoring besar ketika task hanya memperbaiki bug kecil.

---

# 71. Preserve Existing Behavior

Jika mengubah component/service:

Pastikan behavior lama tetap berjalan kecuali memang diminta berubah.

Contoh:

Jika mengubah:

```textPlaceCard
```

jangan menghilangkan:

```textfavorite button
rating
price
image
```

tanpa alasan.

---

# 72. Naming Convention

## TypeScript

Components:

```text
PascalCase
```

Contoh:

```text
PlaceCard.tsx
BookingSummary.tsx
SearchBar.tsx
```

Functions:

```text
camelCase
```

Contoh:

```text
getPlaces()
createBooking()
calculatePrice()
```

---

## Go

Gunakan idiomatic Go naming.

Contoh:

```go
BookingService
CreateBooking
GetBookingByID
```

---

## Database

Gunakan:

```text
snake_case
```

Contoh:

```text
place_images
operating_hours
availability_blocks
```

---

# 73. File Organization

Jangan membuat satu file terlalu besar jika logic sudah sulit dipahami.

Pisahkan berdasarkan responsibility.

Contoh:

```text
booking/
├── handler.go
├── service.go
├── repository.go
├── model.go
├── dto.go
└── routes.go
```

---

# 74. Component Organization

Contoh:

```text
frontend/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── places/
│   ├── booking/
│   ├── dashboard/
│   └── shared/
├── lib/
├── hooks/
├── services/
├── types/
└── utils/
```

Gunakan struktur yang sudah ada jika project berkembang berbeda.

Jangan memindahkan seluruh project hanya karena preferensi pribadi.

---

# 75. shadcn/ui Rules

Gunakan shadcn/ui untuk primitive components jika tersedia.

Contoh:

```text
Button
Dialog
DropdownMenu
Input
Select
Tabs
Toast
Sheet
```

Customize menggunakan design tokens RentSpace.

Jangan membuat versi custom dari component yang sama jika existing shadcn component sudah cukup.

---

# 76. Tailwind Rules

Gunakan Tailwind secara konsisten.

Hindari class string yang sangat panjang jika logic/style dapat dipisahkan dengan baik.

Gunakan reusable component untuk repeated UI.

Jangan menambahkan random inline styles tanpa alasan.

---

# 77. UI State Rules

Komponen penting harus mempertimbangkan:

```text
default
hover
focus
active
disabled
loading
success
error
empty
```

Tidak semua state wajib terlihat sekaligus, tetapi behavior harus dipikirkan.

---

# 78. Navigation Rules

Navbar harus konsisten.

Desktop:

```text
Logo
Explore
Categories
How It Works
Favorites
Notifications
Become an Owner
Profile
```

Mobile harus menggunakan navigation pattern yang sesuai dengan UI_GUIDELINES.md.

---

# 79. Booking UI Rules

Booking UI harus selalu menunjukkan:

```text
place
date
time
duration
price
availability
booking status
payment status
```

User tidak boleh bingung apakah booking sudah berhasil.

---

# 80. Booking Confirmation

Confirmation page harus jelas.

Minimal:

```text
Booking confirmed
Booking number
Place
Date
Time
Duration
Total
Payment status
```

Tambahkan CTA:

```text
View Booking
Back to Explore
```

jika relevan.

---

# 81. Payment UI Rules

Payment UI harus menunjukkan:

```text
Amount
Payment status
Payment method
Payment instructions
Expiration if applicable
```

Jangan menampilkan:

```text
secret keys
internal transaction details
provider credentials
```

---

# 82. Dashboard Rules

Dashboard harus fokus pada information hierarchy.

Customer:

```text
Upcoming bookings
Recent bookings
Favorites
Notifications
```

Owner:

```text
Revenue
Bookings
Places
Performance
```

Admin:

```text
Users
Owners
Places
Bookings
Reports
Analytics
```

---

# 83. Tables

Table digunakan untuk data administratif.

Contoh:

```text
Admin users
Admin bookings
Owner bookings
Reports
```

Mobile table harus memiliki responsive strategy.

Jangan membiarkan table menyebabkan horizontal overflow tanpa alasan.

---

# 84. Charts

Chart digunakan untuk:

```text
Revenue
Bookings
Trends
Analytics
```

Chart harus:

* readable
* memiliki label
* tidak terlalu banyak data
* responsive
* tidak menggunakan dekorasi berlebihan

---

# 85. Modal Rules

Gunakan modal hanya untuk action yang membutuhkan focus.

Contoh:

```text
Delete place
Cancel booking
Confirm action
```

Jangan menggunakan modal untuk setiap interaction sederhana.

---

# 86. Destructive Actions

Destructive action harus memiliki confirmation.

Contoh:

```text
Delete Place
Cancel Booking
Suspend User
```

Confirmation harus menjelaskan consequence.

---

# 87. Toast Rules

Toast digunakan untuk feedback singkat.

Contoh:

```text
Place saved successfully.
Booking cancelled.
Favorite added.
```

Jangan menggunakan toast untuk informasi yang membutuhkan user action panjang.

---

# 88. Notification Rules

Notification harus dibuat dari backend event.

Contoh:

```text
Payment successful
Booking confirmed
Booking cancelled
New owner booking
```

Frontend tidak boleh menganggap event terjadi hanya karena button ditekan.

---

# 89. WebSocket Rules

WebSocket hanya digunakan jika real-time behavior memang dibutuhkan.

Fallback harus tetap tersedia jika connection gagal.

UI harus mampu menangani:

```text
connected
connecting
disconnected
reconnecting
```

---

# 90. Google Maps Rules

Google Maps API hanya digunakan melalui environment configuration.

Jangan expose secret API keys yang seharusnya server-side.

Location data harus berasal dari valid user/place data.

---

# 91. Location Rules

Place memiliki:

```text
address
latitude
longitude
```

Location filter harus menggunakan data aktual.

Jangan membuat koordinat random untuk production data.

---

# 92. Seed Data Rules

Seed data hanya untuk development/testing.

Seed data harus jelas:

```text
development only
```

Jangan memasukkan:

```text
real user passwords
real payment credentials
real private data
```

---

# 93. API Contract Changes

Jika mengubah:

```text
request body
response structure
endpoint
HTTP status
field name
authentication requirement
```

agent harus:

1. check frontend dependencies
2. check backend dependencies
3. update API.md
4. update types
5. update tests
6. verify existing consumers

Jangan mengubah API contract diam-diam.

---

# 94. Database Contract Changes

Jika mengubah:

```text
table
column
relationship
enum/status
constraint
index
```

agent harus:

```text
migration
model
repository
service
API
frontend types if necessary
documentation
tests
```

diperiksa kembali.

---

# 95. Status Changes

Status berikut merupakan business-critical:

```text
Booking:
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED

Payment:
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

Jangan mengganti nama status tanpa memeriksa:

```text
database
backend
frontend
payment
tests
```

---

# 96. Business Logic Rules

Business logic tidak boleh berada hanya di frontend.

Contoh:

```text
price calculation
availability
booking conflict
payment confirmation
role authorization
cancellation eligibility
```

harus memiliki backend enforcement.

---

# 97. Performance Rules

Jangan melakukan optimization prematur.

Namun hindari masalah jelas seperti:

```text
N+1 query
fetch entire database
huge image
unnecessary client component
unnecessary re-render
duplicate API requests
```

---

# 98. Caching

Caching boleh digunakan jika:

* data cocok untuk caching
* consistency tetap aman
* invalidation dapat ditangani

Jangan cache availability/booking/payment secara sembarangan.

Untuk data critical, prioritize correctness over caching.

---

# 99. Critical Data Priority

Untuk data berikut:

```text
availability
booking
payment
```

prioritas:

```text
Correctness
>
Consistency
>
Security
>
Performance
```

---

# 100. Documentation Rules

Jika behavior berubah, documentation harus diperbarui.

Relevant files:

```text
PRD.md
ARCHITECTURE.md
DATABASE.md
API.md
UI_GUIDELINES.md
TASKS.md
AGENTS.md
README.md
```

Tidak semua harus diubah setiap kali.

Update hanya yang relevan.

---

# 101. TASKS.md Rules

Setelah task selesai:

```text
[ ] TODO
```

menjadi:

```text
[x] DONE
```

Jika sedang dikerjakan:

```text
[-] IN PROGRESS
```

Jika terhambat:

```text
[!] BLOCKED
```

Jangan menandai task DONE hanya karena code sudah ditulis.

---

# 102. Blocked Task

Jika task blocked:

Agent harus menjelaskan:

```text
BLOCKED

Reason:
Missing Midtrans credentials.

Required:
MIDTRANS_SERVER_KEY
MIDTRANS_CLIENT_KEY
```

Jangan membuat fake credentials untuk production behavior.

---

# 103. Fake / Mock Data Rules

Mock data boleh digunakan untuk:

```text
UI development
loading state
prototype
component testing
```

Tetapi harus jelas:

```text
mock
development
test
```

Jangan mencampur mock data dengan production API tanpa alasan.

---

# 104. Placeholder Rules

Placeholder boleh digunakan sementara.

Contoh:

```text
TODO
Coming soon
Mock data
```

Namun sebelum production:

[ ] Remove placeholder

[ ] Replace with real implementation

[ ] Remove fake data

[ ] Remove debug UI

---

# 105. Debugging Rules

Ketika terdapat error:

1. baca error
2. cari source error
3. inspect related code
4. reproduce
5. identify root cause
6. implement minimal fix
7. test
8. check regression

Jangan langsung rewrite system.

---

# 106. Error Investigation

Agent harus membedakan:

```text
syntax error
type error
runtime error
logic error
database error
network error
authentication error
authorization error
configuration error
deployment error
```

Jangan menyelesaikan error database dengan mengubah frontend jika root cause berada di backend.

---

# 107. Production Safety

Agent harus berhati-hati terhadap:

```text
database migrations
deletion
payment
authentication
authorization
production environment
```

Untuk perubahan berisiko tinggi:

* inspect lebih dulu
* explain impact
* avoid destructive action
* prefer reversible changes

---

# 108. Never Delete Blindly

Jangan menghapus:

```text
files
tables
columns
routes
components
dependencies
```

hanya karena terlihat tidak digunakan.

Cari references terlebih dahulu.

---

# 109. Never Overwrite Blindly

Sebelum mengganti file besar:

[ ] inspect existing implementation

[ ] understand dependencies

[ ] preserve useful functionality

[ ] modify incrementally

---

# 110. Code Comments

Komentar digunakan untuk menjelaskan:

```text
why
```

bukan:

```text
what obvious code does
```

Bad:

```ts
// Set loading to true
setLoading(true);
```

Better:

```ts
// Prevent duplicate booking requests while the payment session is created.
setLoading(true);
```

Jangan memenuhi code dengan komentar yang tidak diperlukan.

---

# 111. Security Comments

Jika terdapat security-sensitive logic, komentar boleh menjelaskan alasan.

Contoh:

```go
// Payment status is updated only after verifying the provider callback.
```

---

# 112. API Secrets

Agent tidak boleh meminta user memasukkan secret ke source code.

Gunakan:

```text
.env.local
.env
```

dan:

```text
.env.example
```

hanya berisi placeholder.

---

# 113. Git Rules

Jangan menggunakan:

```text
git reset --hard
git clean -fd
```

atau destructive Git commands tanpa alasan dan instruksi yang jelas.

Jangan menghapus perubahan user yang belum di-commit.

---

# 114. Existing User Changes

Jika working tree memiliki perubahan yang belum di-commit:

```text
inspect first
```

Jangan:

```text
overwrite
reset
delete
```

perubahan tersebut secara otomatis.

---

# 115. Commit Rules

Commit harus memiliki tujuan yang jelas.

Contoh:

```text
feat: implement place search
fix: prevent duplicate booking requests
fix: validate owner place ownership
test: add booking conflict tests
refactor: extract availability service
docs: update booking API
```

Hindari:

```text
update
fix stuff
changes
final
final2
final-real
```

---

# 116. Pull Request Rules

PR idealnya memiliki:

```text
Summary
Changes
Testing
Screenshots for UI changes
Known limitations
```

---

# 117. UI Screenshot Requirement

Untuk perubahan UI besar:

[ ] Run application

[ ] Inspect page

[ ] Compare with Stitch

[ ] Check desktop

[ ] Check mobile

[ ] Fix obvious visual differences

---

# 118. Stitch Reference

Google Stitch adalah visual reference.

Agent harus memperhatikan:

```text
layout
spacing
typography
colors
image proportions
card structure
navigation
CTA hierarchy
responsive behavior
```

Jangan hanya meniru text.

---

# 119. Premium UI Rule

Premium appearance dicapai melalui:

```text
spacing
typography
imagery
consistency
alignment
restraint
```

Bukan melalui:

```text
more gradients
more animations
more shadows
more colors
more rounded corners
```

---

# 120. Mobile First Consideration

Walaupun desktop merupakan design reference utama, mobile harus tetap dipikirkan sejak awal.

Jangan membuat desktop layout yang tidak mungkin diadaptasi ke mobile.

---

# 121. Component Reuse

Reuse components untuk:

```text
PlaceCard
Button
Input
Badge
Modal
Search
Filter
Booking summary
```

Namun jangan membuat global component jika behavior hanya spesifik untuk satu page.

---

# 122. API Error Handling Frontend

Frontend harus mengubah backend error menjadi user-friendly message.

Contoh:

Backend:

```text
409 BOOKING_CONFLICT
```

Frontend:

```text
This time slot is no longer available.
Please choose another time.
```

---

# 123. Retry Rules

Retry hanya dilakukan untuk error yang memang retryable.

Contoh:

```text
network timeout
temporary server error
```

Jangan otomatis retry:

```text
invalid credentials
validation error
booking conflict
payment rejection
```

---

# 124. Duplicate Request Prevention

Critical actions seperti:

```text
create booking
create payment
submit form
```

harus mencegah duplicate submission.

Contoh:

```text
button disabled while request is processing
```

Backend tetap harus memiliki protection karena frontend tidak cukup.

---

# 125. Idempotency

Gunakan idempotency strategy untuk operation yang dapat dipanggil lebih dari sekali.

Terutama:

```text
payment
booking creation
webhook
```

---

# 126. Date & Time

Gunakan format yang konsisten.

Backend/database harus memiliki aturan timezone yang jelas.

Frontend harus menampilkan waktu sesuai timezone yang relevan untuk user/place.

Jangan melakukan timezone conversion secara random di component.

---

# 127. Currency

RentSpace menggunakan:

```text
IDR / Rupiah
```

Format UI harus konsisten.

Contoh:

```text
Rp100.000
Rp250.000
Rp1.500.000
```

Backend menyimpan nilai numerik yang aman dan konsisten sesuai DATABASE.md.

---

# 128. User Experience Priority

Setiap feature harus menjawab:

```text
What can the user do?
What is happening?
What happens next?
What went wrong?
How can the user recover?
```

---

# 129. Do Not Build Unrequested Features

Jika user meminta:

```text
Implement search
```

jangan otomatis menambahkan:

```text
AI recommendations
loyalty program
subscription
chat
social feed
```

kecuali memang diperlukan atau diminta.

---

# 130. Do Not Change Product Scope

PRD menentukan product scope.

Agent tidak boleh mengubah:

```text
business model
roles
core booking logic
payment architecture
```

tanpa instruksi.

---

# 131. Feature Dependency

Sebelum membuat feature, cek dependency.

Contoh:

```text
Payment
    ↓
Booking
    ↓
Availability
    ↓
Place
    ↓
Database
```

Jangan membuat payment flow sebelum booking model dan availability logic siap.

---

# 132. Recommended Development Order

Gunakan urutan:

```text
Repository
↓
Environment
↓
Backend foundation
↓
Database
↓
Authentication
↓
Authorization
↓
Frontend foundation
↓
Design system
↓
Homepage
↓
Explore
↓
Place detail
↓
Place management
↓
Availability
↓
Booking
↓
Payment
↓
Confirmation
↓
Customer dashboard
↓
Owner dashboard
↓
Reviews
↓
Favorites
↓
Notifications
↓
Admin
↓
Testing
↓
Security
↓
Performance
↓
Deployment
↓
AI
```

---

# 133. MVP Priority

Jika harus memilih antara feature:

```text
Core booking
```

dan:

```text
Advanced feature
```

selalu prioritaskan:

```text
Core booking
```

MVP harus dapat:

```text
search
→
availability
→
booking
→
payment
→
confirmation
```

---

# 134. Agent Communication

Setelah task selesai, agent harus memberikan ringkasan:

```text
Implemented:
- ...

Changed files:
- ...

Tests:
- ...

Known issues:
- ...

Next recommended task:
- ...
```

Tidak perlu menjelaskan setiap baris code kecuali diminta.

---

# 135. When Agent Is Unsure

Jika terdapat ambiguity:

1. inspect documentation
2. inspect existing code
3. infer only when safe
4. choose least risky implementation
5. clearly state assumption

Jangan mengarang business rule yang berpotensi memengaruhi:

```text
payment
booking
availability
authorization
database
```

Untuk area tersebut, lebih baik berhenti pada titik ambiguity dan meminta clarification jika diperlukan.

---

# 136. When Documentation Is Missing

Jika sebuah behavior belum terdokumentasi:

```text
inspect existing implementation
```

Jika implementation juga tidak menjelaskan:

```text
do not invent critical business logic
```

Untuk non-critical UI behavior, gunakan design consistency.

---

# 137. When Existing Code Conflicts With Documentation

Jika:

```text
Documentation ≠ Existing Code
```

agent harus:

1. identify difference
2. identify impact
3. avoid destructive rewrite
4. determine intended behavior
5. update implementation or documentation appropriately

---

# 138. Definition of Done

Task dianggap selesai jika:

[ ] Implementation complete

[ ] Type errors resolved

[ ] Lint passes

[ ] Relevant tests pass

[ ] Existing functionality still works

[ ] UI responsive if applicable

[ ] Loading state handled

[ ] Error state handled

[ ] Authorization handled if applicable

[ ] Documentation updated if required

[ ] TASKS.md updated

---

# 139. Critical Definition of Done

Untuk fitur:

```text
Authentication
Booking
Payment
Availability
Authorization
```

Definition of Done harus mencakup:

```text
implementation
security
validation
error handling
testing
edge cases
```

Tidak cukup hanya:

```text
UI looks correct
```

---

# 140. Final Agent Checklist

Sebelum mengatakan task selesai:

```text
[ ] Did I inspect the existing code?
[ ] Did I read the relevant documentation?
[ ] Did I follow the architecture?
[ ] Did I reuse existing components?
[ ] Did I avoid unnecessary dependencies?
[ ] Did I follow UI_GUIDELINES.md?
[ ] Did I validate user input?
[ ] Did I handle authorization?
[ ] Did I handle loading/error states?
[ ] Did I test the change?
[ ] Did I check for regressions?
[ ] Did I update documentation if needed?
[ ] Did I update TASKS.md?
```

---

# 141. Absolute Rules

The following rules are mandatory:

```text
1. Never expose secrets.
2. Never trust frontend authorization.
3. Never trust frontend payment status.
4. Never allow double booking.
5. Never bypass backend validation.
6. Never give AI unrestricted production database access.
7. Never invent availability.
8. Never invent payment success.
9. Never destroy existing user changes.
10. Never rewrite the entire project without a clear reason.
11. Never change architecture silently.
12. Never mark an untested feature as DONE.
13. Never ignore existing documentation.
14. Never ignore UI_GUIDELINES.md for UI work.
15. Never sacrifice data correctness for visual convenience.
```

---

# 142. Final Project Philosophy

RentSpace harus dikembangkan seperti real-world startup product.

Prioritas:

```text
Correctness
>
Security
>
Data consistency
>
Maintainability
>
User experience
>
Performance
>
Visual polish
>
Advanced features
```

Agent harus menghasilkan code yang:

```text
simple
maintainable
secure
testable
scalable
consistent
production-oriented
```

Hindari:

```text
overengineering
unnecessary abstraction
unnecessary dependencies
unnecessary complexity
```

---

# 143. Final Instruction to AI Agents

Before modifying RentSpace, remember:

```text
READ FIRST
UNDERSTAND SECOND
PLAN THIRD
IMPLEMENT FOURTH
TEST FIFTH
DOCUMENT LAST
```

Do not code blindly.

Do not assume.

Do not rewrite unnecessarily.

Follow the existing architecture.

Follow the product requirements.

Follow the database design.

Follow the API contract.

Follow the UI guidelines.

Protect user data.

Protect payment flow.

Protect booking consistency.

Keep the implementation simple.

Build RentSpace incrementally.

The goal is not to generate the most code.

The goal is to build a reliable booking platform.

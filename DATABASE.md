# RentSpace — Database Design

## 1. Database Overview

RentSpace menggunakan **PostgreSQL** sebagai relational database utama.

Database bertanggung jawab untuk menyimpan seluruh data utama aplikasi seperti:

* User
* Role
* Owner profile
* Place
* Category
* Facility
* Place images
* Operating hours
* Availability
* Booking
* Payment
* Review
* Favorite
* Notification
* Report

Database harus menjaga data integrity dan consistency, terutama pada proses booking dan payment.

---

# 2. Database Principles

Database RentSpace harus mengikuti prinsip berikut:

1. Gunakan relational database.
2. Gunakan UUID sebagai primary key untuk entity utama.
3. Gunakan foreign key untuk menjaga relationship antar tabel.
4. Gunakan timestamp untuk mencatat waktu penting.
5. Gunakan database constraint untuk menjaga data integrity.
6. Hindari menyimpan data yang sama secara berulang jika dapat dinormalisasi.
7. Gunakan index pada kolom yang sering digunakan untuk search dan filtering.
8. Gunakan transaction untuk operasi yang membutuhkan consistency.
9. Jangan menggunakan `AutoMigrate` sebagai pengganti migration pada production.
10. Database harus menjadi source of truth untuk application data.
11. Business logic tidak boleh hanya bergantung pada frontend.
12. Data sensitif harus disimpan dengan aman.

---

# 3. Primary Key Strategy

Entity utama menggunakan UUID sebagai primary key.

Contoh:

```text id="ck8vl0"
users.id
places.id
bookings.id
payments.id
reviews.id
```

UUID digunakan karena:

* Tidak mudah ditebak.
* Cocok untuk distributed system.
* Lebih aman dibanding sequential ID untuk public API.
* Memudahkan future scalability.

---

# 4. Naming Convention

Database menggunakan:

* `snake_case` untuk table dan column.
* Nama table menggunakan bentuk plural.
* Primary key menggunakan `id`.
* Foreign key menggunakan format `<entity>_id`.

Contoh:

```text id="8c9j1t"
users
places
bookings
payments

user_id
owner_id
place_id
booking_id
```

---

# 5. Entity Relationship Overview

Relationship utama:

```text id="9i6kn5"
Users
 │
 ├───────────────┐
 │               │
 ▼               ▼
Owner Profile   Bookings
 │               │
 ▼               ▼
Places          Payments
 │
 ├── Place Images
 ├── Facilities
 ├── Categories
 └── Operating Hours

Users
 │
 ├── Reviews
 ├── Favorites
 └── Notifications
```

---

# 6. Users Table

Table:

```text id="v1e6jh"
users
```

Digunakan untuk menyimpan semua account RentSpace.

Columns:

| Column        | Type         | Constraint       | Description              |
| ------------- | ------------ | ---------------- | ------------------------ |
| id            | UUID         | PK               | Unique user ID           |
| name          | VARCHAR(100) | NOT NULL         | User name                |
| email         | VARCHAR(255) | NOT NULL, UNIQUE | User email               |
| password_hash | TEXT         | NULL             | Hashed password          |
| role          | VARCHAR(20)  | NOT NULL         | CUSTOMER / OWNER / ADMIN |
| avatar_url    | TEXT         | NULL             | Profile image            |
| phone         | VARCHAR(30)  | NULL             | Phone number             |
| is_active     | BOOLEAN      | NOT NULL         | Account status           |
| created_at    | TIMESTAMP    | NOT NULL         | Creation time            |
| updated_at    | TIMESTAMP    | NOT NULL         | Last update              |

Password tidak boleh disimpan dalam bentuk plain text.

---

# 7. User Role

Role disimpan pada user.

Allowed values:

```text id="u2uxbz"
CUSTOMER
OWNER
ADMIN
```

Role digunakan untuk authorization.

Backend harus memvalidasi role pada protected endpoint.

---

# 8. Owner Profiles Table

Table:

```text id="8u9l4d"
owner_profiles
```

Digunakan untuk informasi tambahan khusus owner.

Columns:

| Column        | Type         | Constraint | Description          |
| ------------- | ------------ | ---------- | -------------------- |
| id            | UUID         | PK         | Owner profile ID     |
| user_id       | UUID         | FK, UNIQUE | Related user         |
| business_name | VARCHAR(150) | NOT NULL   | Business name        |
| description   | TEXT         | NULL       | Business description |
| address       | TEXT         | NULL       | Business address     |
| phone         | VARCHAR(30)  | NULL       | Business phone       |
| created_at    | TIMESTAMP    | NOT NULL   | Creation time        |
| updated_at    | TIMESTAMP    | NOT NULL   | Last update          |

Relationship:

```text id="8qktv1"
users 1 ─── 1 owner_profiles
```

Satu OWNER hanya memiliki satu owner profile.

---

# 9. Categories Table

Table:

```text id="y1tb7m"
categories
```

Digunakan untuk kategori tempat.

Contoh:

```text id="pby8t6"
Futsal
Badminton
Basketball
Photo Studio
Music Studio
Meeting Room
Coworking Space
Classroom
Event Venue
```

Columns:

| Column      | Type         | Constraint       | Description             |
| ----------- | ------------ | ---------------- | ----------------------- |
| id          | UUID         | PK               | Category ID             |
| name        | VARCHAR(100) | NOT NULL, UNIQUE | Category name           |
| slug        | VARCHAR(120) | NOT NULL, UNIQUE | URL-friendly identifier |
| description | TEXT         | NULL             | Category description    |
| created_at  | TIMESTAMP    | NOT NULL         | Creation time           |
| updated_at  | TIMESTAMP    | NOT NULL         | Last update             |

---

# 10. Places Table

Table:

```text id="q7a9mv"
places
```

Merupakan entity utama RentSpace.

Columns:

| Column      | Type          | Constraint | Description       |
| ----------- | ------------- | ---------- | ----------------- |
| id          | UUID          | PK         | Place ID          |
| owner_id    | UUID          | FK         | Owner user ID     |
| category_id | UUID          | FK         | Place category    |
| name        | VARCHAR(150)  | NOT NULL   | Place name        |
| description | TEXT          | NOT NULL   | Place description |
| address     | TEXT          | NOT NULL   | Full address      |
| city        | VARCHAR(100)  | NOT NULL   | City              |
| district    | VARCHAR(100)  | NULL       | District          |
| latitude    | DECIMAL(10,8) | NULL       | Latitude          |
| longitude   | DECIMAL(11,8) | NULL       | Longitude         |
| capacity    | INTEGER       | NULL       | Maximum capacity  |
| status      | VARCHAR(20)   | NOT NULL   | ACTIVE / INACTIVE |
| created_at  | TIMESTAMP     | NOT NULL   | Creation time     |
| updated_at  | TIMESTAMP     | NOT NULL   | Last update       |

---

# 11. Place Pricing

Pricing harus dapat mendukung harga berdasarkan waktu.

Untuk MVP, pricing dapat disimpan pada availability/schedule structure atau dedicated pricing table.

Recommended table:

```text id="g6t5wl"
place_pricing
```

Columns:

| Column      | Type          | Constraint | Description   |
| ----------- | ------------- | ---------- | ------------- |
| id          | UUID          | PK         | Pricing ID    |
| place_id    | UUID          | FK         | Place ID      |
| day_of_week | SMALLINT      | NOT NULL   | 0-6           |
| start_time  | TIME          | NOT NULL   | Start time    |
| end_time    | TIME          | NOT NULL   | End time      |
| price       | DECIMAL(12,2) | NOT NULL   | Price         |
| created_at  | TIMESTAMP     | NOT NULL   | Creation time |
| updated_at  | TIMESTAMP     | NOT NULL   | Last update   |

Contoh:

```text id="rbv3bk"
Monday
18:00 - 20:00
Rp100.000
```

Pricing dapat berkembang untuk mendukung weekend pricing atau special pricing.

---

# 12. Place Images Table

Table:

```text id="k7z5z9"
place_images
```

Digunakan untuk menyimpan gambar tempat.

Columns:

| Column     | Type      | Constraint | Description   |
| ---------- | --------- | ---------- | ------------- |
| id         | UUID      | PK         | Image ID      |
| place_id   | UUID      | FK         | Place ID      |
| image_url  | TEXT      | NOT NULL   | Image URL     |
| is_primary | BOOLEAN   | NOT NULL   | Main image    |
| sort_order | INTEGER   | NOT NULL   | Display order |
| created_at | TIMESTAMP | NOT NULL   | Creation time |

File image disimpan di external storage.

Database hanya menyimpan URL dan metadata.

Relationship:

```text id="5ag4oe"
places 1 ─── N place_images
```

---

# 13. Facilities Table

Table:

```text id="x0h17s"
facilities
```

Digunakan untuk daftar fasilitas yang tersedia.

Contoh:

```text id="l54f7j"
Parking
Wi-Fi
Air Conditioning
Projector
Sound System
Locker
Shower
Toilet
Changing Room
```

Columns:

| Column     | Type         | Constraint       | Description     |
| ---------- | ------------ | ---------------- | --------------- |
| id         | UUID         | PK               | Facility ID     |
| name       | VARCHAR(100) | NOT NULL, UNIQUE | Facility name   |
| icon       | VARCHAR(100) | NULL             | Icon identifier |
| created_at | TIMESTAMP    | NOT NULL         | Creation time   |

---

# 14. Place Facilities Table

Karena satu place dapat memiliki banyak facilities dan satu facility dapat digunakan banyak places, relationship menggunakan many-to-many.

Table:

```text id="44l7q5"
place_facilities
```

Columns:

| Column      | Type | Constraint |
| ----------- | ---- | ---------- |
| place_id    | UUID | FK         |
| facility_id | UUID | FK         |

Primary key:

```text id="1l2w0q"
(place_id, facility_id)
```

Relationship:

```text id="9z0fba"
places N ─── N facilities
```

---

# 15. Operating Hours Table

Table:

```text id="x3u7kq"
operating_hours
```

Digunakan untuk menentukan jam operasional tempat.

Columns:

| Column      | Type     | Constraint | Description        |
| ----------- | -------- | ---------- | ------------------ |
| id          | UUID     | PK         | Operating hours ID |
| place_id    | UUID     | FK         | Place ID           |
| day_of_week | SMALLINT | NOT NULL   | 0-6                |
| open_time   | TIME     | NULL       | Opening time       |
| close_time  | TIME     | NULL       | Closing time       |
| is_closed   | BOOLEAN  | NOT NULL   | Closed status      |

Contoh:

```text id="3v2j3l"
Monday
08:00 - 22:00

Tuesday
08:00 - 22:00
```

---

# 16. Availability Architecture

Availability tidak boleh hanya ditentukan oleh operating hours.

Availability merupakan kombinasi dari:

```text id="w4n3h2"
Operating Hours
       +
Existing Bookings
       +
Blocked Schedule
       +
Place Status
       =
Actual Availability
```

Backend harus menghitung availability berdasarkan seluruh kondisi tersebut.

---

# 17. Availability Blocks Table

Untuk kebutuhan blocking schedule, gunakan table:

```text id="g4u8yc"
availability_blocks
```

Columns:

| Column     | Type         | Constraint | Description   |
| ---------- | ------------ | ---------- | ------------- |
| id         | UUID         | PK         | Block ID      |
| place_id   | UUID         | FK         | Place ID      |
| start_at   | TIMESTAMP    | NOT NULL   | Block start   |
| end_at     | TIMESTAMP    | NOT NULL   | Block end     |
| reason     | VARCHAR(255) | NULL       | Block reason  |
| created_at | TIMESTAMP    | NOT NULL   | Creation time |

Contoh:

```text id="7k70j2"
Maintenance
2026-09-20 10:00
2026-09-20 14:00
```

---

# 18. Bookings Table

Table:

```text id="5g3eab"
bookings
```

Merupakan salah satu table paling penting.

Columns:

| Column           | Type          | Constraint | Description    |
| ---------------- | ------------- | ---------- | -------------- |
| id               | UUID          | PK         | Booking ID     |
| user_id          | UUID          | FK         | Customer ID    |
| place_id         | UUID          | FK         | Place ID       |
| booking_date     | DATE          | NOT NULL   | Booking date   |
| start_time       | TIME          | NOT NULL   | Start time     |
| end_time         | TIME          | NOT NULL   | End time       |
| duration_minutes | INTEGER       | NOT NULL   | Duration       |
| total_amount     | DECIMAL(12,2) | NOT NULL   | Total price    |
| status           | VARCHAR(20)   | NOT NULL   | Booking status |
| notes            | TEXT          | NULL       | Customer notes |
| created_at       | TIMESTAMP     | NOT NULL   | Creation time  |
| updated_at       | TIMESTAMP     | NOT NULL   | Last update    |

Booking status:

```text id="k0b3q2"
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

---

# 19. Booking Time Rules

Booking harus memenuhi:

```text id="2v6v4b"
start_time < end_time
duration_minutes > 0
```

Booking tidak boleh berada di luar operating hours.

Booking tidak boleh overlap dengan booking aktif lainnya.

Booking juga tidak boleh overlap dengan availability block.

---

# 20. Booking Overlap

Dua booking dianggap overlap jika:

```text id="0j9m0u"
existing.start_time < new.end_time
AND
existing.end_time > new.start_time
```

Contoh:

```text id="j74k7m"
Booking A
18:00 - 20:00

Booking B
19:00 - 21:00

Result:
OVERLAP
```

Sedangkan:

```text id="x2r9m8"
Booking A
18:00 - 20:00

Booking B
20:00 - 22:00

Result:
NO OVERLAP
```

Database dan backend harus sama-sama membantu mencegah double booking.

---

# 21. Payments Table

Table:

```text id="7q7f24"
payments
```

Columns:

| Column         | Type          | Constraint | Description             |
| -------------- | ------------- | ---------- | ----------------------- |
| id             | UUID          | PK         | Payment ID              |
| booking_id     | UUID          | FK, UNIQUE | Booking ID              |
| provider       | VARCHAR(50)   | NOT NULL   | Payment provider        |
| transaction_id | VARCHAR(255)  | NULL       | Provider transaction ID |
| amount         | DECIMAL(12,2) | NOT NULL   | Payment amount          |
| status         | VARCHAR(20)   | NOT NULL   | Payment status          |
| paid_at        | TIMESTAMP     | NULL       | Payment completion      |
| created_at     | TIMESTAMP     | NOT NULL   | Creation time           |
| updated_at     | TIMESTAMP     | NOT NULL   | Last update             |

Payment status:

```text id="x7f5m4"
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

---

# 22. Payment Relationship

Relationship:

```text id="q4w8xy"
bookings 1 ─── 1 payments
```

Satu booking memiliki satu payment record utama.

Jika payment provider membutuhkan multiple attempts, struktur dapat dikembangkan menggunakan payment transactions table.

---

# 23. Reviews Table

Table:

```text id="l6g7u3"
reviews
```

Columns:

| Column     | Type      | Constraint | Description     |
| ---------- | --------- | ---------- | --------------- |
| id         | UUID      | PK         | Review ID       |
| user_id    | UUID      | FK         | Reviewer        |
| place_id   | UUID      | FK         | Reviewed place  |
| booking_id | UUID      | FK, UNIQUE | Related booking |
| rating     | SMALLINT  | NOT NULL   | 1-5             |
| comment    | TEXT      | NULL       | Review content  |
| created_at | TIMESTAMP | NOT NULL   | Creation time   |
| updated_at | TIMESTAMP | NOT NULL   | Last update     |

Rating harus berada pada:

```text id="9s9k7v"
1 <= rating <= 5
```

Review harus terkait dengan booking yang telah selesai.

---

# 24. Review Rules

Customer hanya dapat membuat review jika:

1. User memiliki booking pada place tersebut.
2. Booking berstatus `COMPLETED`.
3. Booking tersebut belum digunakan untuk review.
4. User merupakan pemilik booking.

Database harus memiliki constraint yang membantu memastikan satu booking hanya memiliki satu review.

---

# 25. Favorites Table

Table:

```text id="s4e2m1"
favorites
```

Digunakan untuk menyimpan tempat favorit customer.

Columns:

| Column     | Type      | Constraint |
| ---------- | --------- | ---------- |
| user_id    | UUID      | FK         |
| place_id   | UUID      | FK         |
| created_at | TIMESTAMP | NOT NULL   |

Primary key:

```text id="q0t1g3"
(user_id, place_id)
```

Satu user tidak boleh memiliki favorite yang sama lebih dari satu kali.

---

# 26. Notifications Table

Table:

```text id="n8z6e4"
notifications
```

Columns:

| Column         | Type         | Constraint | Description          |
| -------------- | ------------ | ---------- | -------------------- |
| id             | UUID         | PK         | Notification ID      |
| user_id        | UUID         | FK         | Recipient            |
| type           | VARCHAR(50)  | NOT NULL   | Notification type    |
| title          | VARCHAR(150) | NOT NULL   | Notification title   |
| message        | TEXT         | NOT NULL   | Notification message |
| reference_type | VARCHAR(50)  | NULL       | Related entity       |
| reference_id   | UUID         | NULL       | Related entity ID    |
| is_read        | BOOLEAN      | NOT NULL   | Read status          |
| created_at     | TIMESTAMP    | NOT NULL   | Creation time        |

---

# 27. Reports Table

Table:

```text id="g8m3a6"
reports
```

Digunakan untuk user reports terhadap place, review, atau user.

Columns:

| Column      | Type         | Constraint | Description            |
| ----------- | ------------ | ---------- | ---------------------- |
| id          | UUID         | PK         | Report ID              |
| reporter_id | UUID         | FK         | Reporting user         |
| target_type | VARCHAR(50)  | NOT NULL   | Target type            |
| target_id   | UUID         | NOT NULL   | Target ID              |
| reason      | VARCHAR(255) | NOT NULL   | Report reason          |
| description | TEXT         | NULL       | Additional information |
| status      | VARCHAR(20)  | NOT NULL   | Report status          |
| resolved_by | UUID         | NULL       | Admin ID               |
| resolved_at | TIMESTAMP    | NULL       | Resolution time        |
| created_at  | TIMESTAMP    | NOT NULL   | Creation time          |

Report status:

```text id="f9f5jh"
PENDING
REVIEWING
RESOLVED
REJECTED
```

---

# 28. Audit Logs

Admin dan sensitive system actions dapat menggunakan:

```text id="x6s8p2"
audit_logs
```

Columns:

| Column      | Type         | Description            |
| ----------- | ------------ | ---------------------- |
| id          | UUID         | Log ID                 |
| user_id     | UUID         | Actor                  |
| action      | VARCHAR(100) | Action performed       |
| entity_type | VARCHAR(50)  | Entity type            |
| entity_id   | UUID         | Entity ID              |
| metadata    | JSONB        | Additional information |
| created_at  | TIMESTAMP    | Event time             |

Audit logs digunakan untuk membantu debugging, security monitoring, dan administrative tracking.

---

# 29. Entity Relationship Diagram

Simplified ERD:

```text id="l0p7t5"
┌──────────────┐
│    users     │
├──────────────┤
│ id PK        │
│ name         │
│ email        │
│ role         │
└──────┬───────┘
       │
       ├───────────────────────┐
       │                       │
       ▼                       ▼
┌──────────────┐        ┌──────────────┐
│owner_profiles│        │   bookings   │
└──────┬───────┘        └──────┬───────┘
       │                       │
       │                       ├──────────────┐
       ▼                       ▼              ▼
┌──────────────┐        ┌──────────────┐ ┌──────────────┐
│    places    │        │   payments   │ │   reviews    │
└──────┬───────┘        └──────────────┘ └──────────────┘
       │
       ├───────────────┐
       │               │
       ▼               ▼
┌──────────────┐ ┌──────────────┐
│place_images  │ │place_pricing │
└──────────────┘ └──────────────┘
       │
       ▼
┌────────────────┐
│place_facilities│
└───────┬────────┘
        │
        ▼
┌──────────────┐
│  facilities  │
└──────────────┘
```

---

# 30. Main Relationships

Relationship utama:

```text id="4j5x9d"
users
 ├── 1:1 owner_profiles
 ├── 1:N bookings
 ├── 1:N reviews
 ├── N:N places through favorites
 └── 1:N notifications

owner_profiles
 └── 1:N places

categories
 └── 1:N places

places
 ├── N:1 users
 ├── N:1 categories
 ├── 1:N place_images
 ├── 1:N place_pricing
 ├── 1:N operating_hours
 ├── 1:N availability_blocks
 ├── N:N facilities
 ├── 1:N bookings
 ├── 1:N reviews
 └── N:N users through favorites

bookings
 ├── N:1 users
 ├── N:1 places
 ├── 1:1 payments
 └── 1:0..1 reviews
```

---

# 31. Database Indexing

Index harus dibuat pada kolom yang sering digunakan.

Recommended indexes:

```text id="9t6p9a"
users.email
users.role

places.owner_id
places.category_id
places.city
places.status

places.latitude
places.longitude

bookings.user_id
bookings.place_id
bookings.booking_date
bookings.status

payments.booking_id
payments.transaction_id
payments.status

reviews.place_id
reviews.user_id

favorites.user_id
favorites.place_id

notifications.user_id
notifications.is_read
```

Composite indexes dapat digunakan untuk query yang sering dilakukan bersama.

Contoh:

```text id="9ql5e5"
(place_id, booking_date)
```

---

# 32. Location Search

MVP dapat menyimpan latitude dan longitude menggunakan PostgreSQL numeric/decimal fields.

Untuk radius search sederhana, backend dapat menghitung distance berdasarkan latitude dan longitude.

Jika kebutuhan geospatial search meningkat, PostgreSQL dapat dikembangkan menggunakan:

**PostGIS**

PostGIS tidak wajib digunakan pada tahap awal jika belum diperlukan.

---

# 33. Money and Currency

Semua nilai uang menggunakan:

```text id="g72m49"
DECIMAL(12,2)
```

Jangan menggunakan floating point untuk menyimpan nilai uang.

Currency utama:

```text id="y4v5n7"
IDR
```

Contoh:

```text id="y8n2g1"
100000.00
```

---

# 34. Timestamp

Entity utama menggunakan:

```text id="l8z4n3"
created_at
updated_at
```

Timestamp disimpan dalam timezone yang konsisten.

Backend harus menentukan timezone handling secara konsisten dan tidak bergantung pada timezone perangkat client.

Untuk booking, tanggal dan waktu harus diproses secara konsisten agar tidak terjadi kesalahan akibat timezone.

---

# 35. Soft Delete

Soft delete dapat digunakan untuk entity yang membutuhkan recovery atau audit.

Contoh:

```text id="0q6j3u"
Places
Users
```

Namun soft delete tidak harus diterapkan pada seluruh table.

Untuk MVP, gunakan soft delete hanya jika terdapat kebutuhan bisnis yang jelas.

Data booking dan payment tidak boleh dihapus sembarangan karena dibutuhkan untuk history dan audit.

---

# 36. Database Transactions

Transaction wajib digunakan pada operasi penting.

Contoh:

### Booking

```text id="5a2v6r"
Begin Transaction
      ↓
Check Availability
      ↓
Create Booking
      ↓
Create Payment
      ↓
Commit
```

Jika terjadi error:

```text id="0v9c8d"
Rollback
```

### Payment Webhook

```text id="8c5y4q"
Begin Transaction
      ↓
Validate Webhook
      ↓
Update Payment
      ↓
Update Booking
      ↓
Create Notification
      ↓
Commit
```

---

# 37. Data Integrity

Database harus menggunakan constraints jika memungkinkan.

Contoh:

```text id="9q5m2h"
NOT NULL
UNIQUE
CHECK
FOREIGN KEY
PRIMARY KEY
```

Contoh:

```text id="g4k8k6"
rating BETWEEN 1 AND 5
```

dan:

```text id="n4h3a1"
start_time < end_time
```

---

# 38. Migration Strategy

Database schema harus dikelola menggunakan migration.

Migration harus:

* Versioned.
* Reproducible.
* Bisa dijalankan pada environment baru.
* Tidak bergantung pada manual database modification.

Production database tidak boleh diubah secara manual tanpa migration yang terdokumentasi.

Migration tool dapat menggunakan:

```text id="6w3m9k"
golang-migrate
```

atau tool migration PostgreSQL lain yang sesuai.

---

# 39. Seed Data

Development environment harus memiliki seed data untuk mempermudah testing.

Seed data dapat mencakup:

```text id="k4u8x2"
Admin account
Owner accounts
Customer accounts

Categories
Facilities

Sample places
Sample operating hours
Sample pricing

Sample bookings
Sample reviews
```

Seed data tidak boleh menggunakan production credentials atau personal data nyata.

---

# 40. Database Environment

Minimal environment:

```text id="x5n2h7"
Development
Staging
Production
```

Setiap environment harus memiliki database yang terpisah.

Development database tidak boleh menggunakan production database.

---

# 41. Database Security

Database credentials hanya boleh tersedia pada backend.

Frontend tidak boleh memiliki:

```text id="j4k1q8"
DATABASE_URL
Database password
Database host credentials
```

Database harus menggunakan secure credentials dan encrypted connection jika didukung oleh provider.

---

# 42. Sensitive Data

Data berikut harus diperlakukan sebagai sensitive:

* Password hash.
* Authentication tokens.
* Payment credentials.
* OAuth secrets.
* Personal information.

Password harus di-hash menggunakan algorithm yang aman seperti:

```text id="3f7h6q"
Argon2id
```

atau bcrypt jika sesuai dengan implementation.

Password asli tidak boleh disimpan.

---

# 43. Database Access Rules

Frontend tidak boleh mengakses PostgreSQL secara langsung.

Architecture:

```text id="z6b5h8"
Frontend
   ↓
REST API
   ↓
Backend Service
   ↓
Repository
   ↓
PostgreSQL
```

Tidak boleh:

```text id="j6n2w4"
Frontend
   ↓
PostgreSQL
```

---

# 44. Query Principles

Backend harus menghindari:

* N+1 query.
* Query tanpa filter pada large dataset.
* Mengambil seluruh columns jika tidak diperlukan.
* Mengambil seluruh records tanpa pagination.

Gunakan:

* Proper indexes.
* Pagination.
* Selective queries.
* Joins/preloading jika memang dibutuhkan.
* Query optimization jika diperlukan.

---

# 45. Database Performance

Target awal:

* Query sederhana harus cepat.
* Search menggunakan indexed fields.
* Booking availability query harus efisien.
* Dashboard menggunakan aggregation query yang sesuai.
* Large list menggunakan pagination.

Optimization dilakukan berdasarkan actual bottleneck, bukan premature optimization.

---

# 46. Owner Data Isolation

Owner hanya boleh mengakses data yang dimilikinya.

Contoh:

```text id="8m5g9k"
Owner A
   ↓
Place A
   ↓
Booking A
```

Owner A tidak boleh mengakses:

```text id="k3w7p1"
Place B
Booking B
Owner B revenue
```

Authorization dan ownership check dilakukan oleh backend.

---

# 47. Admin Data Access

ADMIN dapat mengakses data platform sesuai permission.

Admin dapat mengelola:

* Users.
* Owners.
* Places.
* Bookings.
* Reviews.
* Reports.
* Platform analytics.

Setiap administrative action yang penting sebaiknya tercatat pada audit logs.

---

# 48. Booking Data Retention

Booking history tidak boleh dihapus hanya karena booking telah selesai.

Status digunakan untuk lifecycle:

```text id="g4v2x8"
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

Data booking tetap dapat digunakan untuk:

* History.
* Review validation.
* Revenue analytics.
* Customer statistics.
* Owner statistics.
* Audit.

---

# 49. AI Data Access

AI tidak boleh memiliki akses database langsung.

AI mendapatkan data melalui backend.

Flow:

```text id="x9k2v5"
Database
    ↓
Backend
    ↓
Filter / Sanitize
    ↓
AI Service
    ↓
Recommendation
    ↓
Backend Validation
    ↓
Frontend
```

Backend harus memastikan AI hanya menggunakan data yang relevan dan aman.

---

# 50. Database Evolution

Database harus dapat berkembang tanpa merusak data existing.

Setiap perubahan schema harus:

1. Dibuat melalui migration.
2. Diuji pada development.
3. Diuji pada staging jika tersedia.
4. Mempertimbangkan backward compatibility.
5. Tidak menghapus data production secara sembarangan.

---

# 51. MVP Database Scope

Database MVP minimal harus mendukung:

```text id="0r7x8n"
Users
Owner Profiles
Categories
Places
Place Images
Facilities
Place Facilities
Operating Hours
Place Pricing
Availability Blocks
Bookings
Payments
Reviews
Favorites
Notifications
```

Admin reports dan audit logs dapat ditambahkan sesuai kebutuhan implementasi MVP.

---

# 52. Post-MVP Database Scope

Post-MVP dapat menambahkan:

```text id="2f6k8m"
Advanced Analytics
AI Recommendation Data
AI Business Insights
Real-time Event Data
Promotion / Voucher
Wallet
Refund Management
Subscription
Advanced Geospatial Data
```

Feature tersebut tidak boleh ditambahkan ke database MVP tanpa kebutuhan implementasi yang jelas.

---

# 53. Final Database Principle

Database RentSpace harus menjaga tiga hal utama:

```text id="w2k6j4"
DATA CONSISTENCY
        +
DATA SECURITY
        +
DATA INTEGRITY
```

Terutama pada:

* Booking.
* Payment.
* User authorization.
* Ownership.
* Reviews.

Database harus menjadi source of truth dan tidak boleh bergantung pada frontend untuk menjaga integritas data.

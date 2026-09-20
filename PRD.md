# RentSpace — Product Requirements Document

## 1. Product Overview

RentSpace adalah platform web untuk mencari, membandingkan, dan melakukan booking tempat secara online berdasarkan lokasi, kategori, harga, fasilitas, tanggal, dan waktu.

Platform ini mempertemukan dua pihak utama:

* Customer yang ingin mencari dan menyewa tempat.
* Owner yang ingin memasarkan dan mengelola tempat yang mereka sewakan.

RentSpace dibuat sebagai platform yang memudahkan proses yang biasanya dilakukan secara manual melalui chat, telepon, atau media sosial.

Contoh tempat yang dapat tersedia di RentSpace:

* Lapangan futsal
* Lapangan badminton
* Lapangan basket
* Studio foto
* Studio musik
* Ruang meeting
* Coworking space
* Ruang kelas
* Venue acara
* Tempat kegiatan lainnya

RentSpace harus memiliki tampilan modern, clean, profesional, dan mudah digunakan.

---

## 2. Problem Statement

Saat ini orang yang ingin menyewa sebuah tempat sering kali harus mencari melalui Google, Instagram, media sosial, atau bertanya langsung kepada pemilik.

Beberapa masalah yang sering terjadi:

1. Informasi tempat tersebar di berbagai platform.
2. Harga sewa tidak selalu tersedia dengan jelas.
3. Customer sulit mengetahui jadwal tempat yang masih tersedia.
4. Proses booking masih dilakukan melalui chat.
5. Risiko double booking cukup tinggi.
6. Customer sulit membandingkan beberapa tempat sekaligus.
7. Owner harus mengelola booking secara manual.
8. Owner tidak memiliki dashboard untuk melihat performa tempat dan pendapatan.

RentSpace dibuat untuk menyederhanakan proses tersebut menjadi satu platform.

---

## 3. Product Goals

Tujuan utama RentSpace:

1. Memudahkan customer menemukan tempat yang sesuai.
2. Memudahkan customer mengetahui harga dan availability secara jelas.
3. Memungkinkan customer melakukan booking secara online.
4. Mencegah terjadinya double booking.
5. Memberikan owner sistem untuk mengelola tempat dan booking.
6. Memberikan owner informasi mengenai performa bisnisnya.
7. Menyediakan pengalaman booking yang cepat dan sederhana.
8. Menjadi platform yang dapat dikembangkan menjadi marketplace penyewaan tempat.

---

## 4. Target Users

### 4.1 Customer

Customer adalah pengguna yang ingin mencari dan menyewa tempat.

Contoh:

* Mahasiswa yang mencari lapangan olahraga.
* Tim kerja yang membutuhkan ruang meeting.
* Fotografer yang membutuhkan studio.
* Komunitas yang membutuhkan venue.
* Individu yang membutuhkan tempat untuk kegiatan tertentu.

### 4.2 Owner

Owner adalah pemilik atau pengelola tempat yang ingin menyewakan tempatnya melalui RentSpace.

Contoh:

* Pemilik lapangan olahraga.
* Pemilik studio.
* Pemilik coworking space.
* Pengelola venue.
* Pemilik ruang meeting.

### 4.3 Admin

Admin bertugas mengelola dan menjaga operasional platform.

Admin dapat mengelola:

* User
* Owner
* Places
* Bookings
* Reviews
* Reports
* Platform settings

---

## 5. User Roles

RentSpace memiliki tiga role utama:

### CUSTOMER

Customer dapat:

* Mencari tempat.
* Melihat detail tempat.
* Melihat availability.
* Melakukan booking.
* Melakukan pembayaran.
* Melihat booking.
* Membatalkan booking sesuai aturan.
* Memberikan review.
* Menambahkan tempat ke favorite.
* Menerima notification.

### OWNER

Owner dapat:

* Membuat profil bisnis.
* Menambahkan tempat.
* Mengedit tempat.
* Menghapus tempat.
* Mengatur harga.
* Mengatur jam operasional.
* Mengatur availability.
* Melihat booking.
* Mengubah status booking.
* Melihat pendapatan.
* Melihat statistik tempat.
* Menerima notification.

### ADMIN

Admin dapat:

* Melihat seluruh user.
* Mengelola user.
* Mengelola owner.
* Mengelola places.
* Mengelola bookings.
* Mengelola reviews.
* Menangani reports.
* Melihat platform analytics.

---

# 6. Core User Flow

## 6.1 Customer Flow

```text
Landing Page
    ↓
Search / Explore
    ↓
Filter Places
    ↓
Place Detail
    ↓
Select Date
    ↓
Select Time
    ↓
Review Booking
    ↓
Payment
    ↓
Booking Confirmation
    ↓
Booking History
```

## 6.2 Owner Flow

```text
Login
    ↓
Owner Dashboard
    ↓
Add Place
    ↓
Add Place Information
    ↓
Set Price
    ↓
Set Operating Hours
    ↓
Set Availability
    ↓
Receive Booking
    ↓
Manage Booking
    ↓
View Revenue & Analytics
```

## 6.3 Admin Flow

```text
Login
    ↓
Admin Dashboard
    ↓
Monitor Platform
    ↓
Manage Users / Owners / Places
    ↓
Review Reports
    ↓
Manage Platform
```

---

# 7. Functional Requirements

## 7.1 Authentication

The system must provide:

* Register.
* Login.
* Logout.
* Forgot password.
* Reset password.
* Google OAuth.
* Session management.
* Role-based access control.

Each account must memiliki one role:

* CUSTOMER
* OWNER
* ADMIN

Users must not be able to access functionality that belongs to another role.

---

## 7.2 User Profile

Customer and owner must have a profile.

Profile information may include:

* Full name.
* Profile photo.
* Email.
* Phone number.
* Address.
* Account creation date.

Owner profile additionally includes:

* Business name.
* Business description.
* Business contact.
* Business location.
* Verification status.

---

# 8. Place Management

Owner can create a place.

Each place should contain:

* Place name.
* Description.
* Category.
* Address.
* Latitude.
* Longitude.
* Photos.
* Price per hour.
* Facilities.
* Capacity.
* Operating hours.
* Availability.
* Rules.
* Cancellation policy.
* Status.

Possible categories:

* Sports.
* Studio.
* Meeting Room.
* Coworking.
* Event Venue.
* Classroom.
* Other.

Owner can:

* Create place.
* Edit place.
* Delete place.
* Activate/deactivate place.
* Update price.
* Update availability.

---

# 9. Place Discovery

Customer can search and discover places.

Search can use:

* Place name.
* Category.
* Location.
* Keyword.

Customer can filter based on:

* Category.
* Price.
* Rating.
* Distance.
* Availability.
* Facilities.

The result should display:

* Place photo.
* Place name.
* Category.
* Rating.
* Distance.
* Starting price.
* Location.

---

# 10. Location-Based Search

RentSpace should support location-based discovery.

Each place stores:

* Latitude.
* Longitude.

The system should be able to calculate the approximate distance between the customer location and the place.

Customer should be able to search places within a radius.

Example:

```text
Search places within 5 km
```

The system should prioritize places that are closer to the selected location.

Maps integration can be implemented in a later development phase.

---

# 11. Place Detail

Customer can open a place detail page.

The page should display:

* Photo gallery.
* Place name.
* Rating.
* Number of reviews.
* Location.
* Description.
* Price.
* Facilities.
* Capacity.
* Operating hours.
* Rules.
* Cancellation policy.
* Owner information.
* Availability.
* Reviews.

The page must provide a clear booking action.

---

# 12. Availability

Availability is one of the most important parts of RentSpace.

Customer must be able to select:

* Date.
* Start time.
* End time.

The system must check whether the selected time is available before creating a booking.

Example:

```text
19:00 - 20:00 AVAILABLE
20:00 - 21:00 BOOKED
21:00 - 22:00 AVAILABLE
```

The system must prevent two customers from successfully booking the same place at overlapping times.

Availability must consider:

* Existing bookings.
* Operating hours.
* Owner blocked schedules.
* Place status.

---

# 13. Booking

Customer can create a booking.

A booking must contain:

* Booking ID.
* Customer.
* Place.
* Owner.
* Date.
* Start time.
* End time.
* Duration.
* Price.
* Payment status.
* Booking status.
* Creation timestamp.

Possible booking statuses:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

Possible payment statuses:

```text
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

---

# 14. Booking Rules

The system must validate:

1. Place exists and is active.
2. Selected date is valid.
3. Selected time is within operating hours.
4. Selected time does not overlap an existing booking.
5. User is authenticated.
6. Price is calculated from the selected duration.
7. Booking must not be created if availability is no longer valid.

The availability must be checked again immediately before confirming the booking.

This is important to prevent race conditions and double booking.

---

# 15. Booking Cancellation

Customer may cancel a booking according to the cancellation policy of the place.

The system should record:

* Cancellation time.
* Cancellation reason.
* User who cancelled.
* Refund status if applicable.

Cancellation rules must be configurable and documented before implementation.

---

# 16. Payment

RentSpace should support online payment.

The initial payment provider target is Midtrans.

Payment flow:

```text
Create Booking
    ↓
Create Payment
    ↓
Customer Pays
    ↓
Payment Provider
    ↓
Payment Callback / Webhook
    ↓
Update Payment Status
    ↓
Confirm Booking
```

The system must not consider a booking fully confirmed only because the frontend reports that payment was successful.

Payment confirmation must be validated through the backend/payment provider callback.

Payment credentials and secret keys must never be exposed to the frontend.

---

# 17. Booking History

Customer can view previous and current bookings.

Booking history should display:

* Place.
* Date.
* Time.
* Total price.
* Booking status.
* Payment status.

Customer can open a booking to see its details.

---

# 18. Owner Booking Management

Owner can view all bookings for their places.

Owner should be able to filter by:

* Date.
* Place.
* Booking status.
* Payment status.

Owner can see:

* Customer name.
* Place.
* Date.
* Time.
* Duration.
* Total price.
* Booking status.
* Payment status.

---

# 19. Reviews & Ratings

Customer can leave a review after completing a booking.

Review contains:

* Rating from 1–5.
* Comment.
* Creation date.

Customer should only be allowed to review a place after having a completed booking for that place.

Customer should not be able to submit multiple reviews for the same completed booking unless the system explicitly supports review editing.

Owner cannot directly modify customer reviews.

Admin can moderate reviews.

---

# 20. Favorites

Customer can save places to favorites.

Customer can:

* Add place to favorite.
* Remove place from favorite.
* View favorite places.

---

# 21. Notifications

RentSpace should provide notifications for important events.

Customer notifications may include:

* Booking created.
* Payment successful.
* Booking confirmed.
* Booking cancelled.
* Upcoming booking.
* Refund update.

Owner notifications may include:

* New booking.
* Payment received.
* Booking cancelled.
* Upcoming booking.
* Review received.

Notifications should be stored so users can view notification history.

---

# 22. Owner Dashboard

Owner dashboard should provide an overview of their business.

Dashboard can display:

```text
Total Places
Total Bookings
Total Revenue
Upcoming Bookings
```

Additional analytics:

* Revenue over time.
* Number of bookings.
* Most booked place.
* Booking cancellation rate.
* Average rating.
* Peak booking hours.

The dashboard should allow filtering by time period.

---

# 23. Customer Dashboard

Customer dashboard should provide:

* Upcoming bookings.
* Recent bookings.
* Favorite places.
* Recommended places.
* Notifications.

The dashboard should prioritize the next upcoming booking.

---

# 24. Admin Dashboard

Admin dashboard should provide:

* Total users.
* Total owners.
* Total places.
* Total bookings.
* Total revenue.
* Active places.
* Cancelled bookings.
* Reported content.

Admin should be able to monitor overall platform activity.

---

# 25. AI Recommendation

AI is an advanced feature and is not required for the first MVP.

The AI system can help customers find suitable places based on natural language.

Example:

```text
"Saya mencari ruang meeting untuk 15 orang
di Jakarta Barat dengan budget maksimal
Rp500.000."
```

The system should extract relevant criteria such as:

* Category.
* Location.
* Capacity.
* Budget.
* Date if provided.
* Time if provided.

The AI should then recommend suitable places from the existing RentSpace database.

AI must not invent places or availability.

All recommendations must be based on actual data available in the system.

---

# 26. AI Business Insights

AI can also provide insights for owners.

Example:

```text
Booking Analysis

Weekend bookings are higher than weekday bookings.

Peak booking time:
18:00 - 21:00

Recommendation:
Consider increasing weekend availability.
```

AI insights must be based on actual booking data.

This feature is considered an advanced feature after the core booking system is stable.

---

# 27. Search & Recommendation Rules

Normal search must work without AI.

The system should prioritize:

1. Availability.
2. Search/filter relevance.
3. Distance.
4. Rating.
5. Price.

AI should enhance the search experience, not replace the normal search functionality.

---

# 28. MVP Scope

The first MVP should focus on the core booking experience.

### MVP Customer

* Register/login.
* Browse places.
* Search places.
* Filter places.
* View place detail.
* Check availability.
* Create booking.
* Payment.
* View booking history.
* Cancel booking.
* Review completed booking.
* Favorite place.

### MVP Owner

* Register/login.
* Owner profile.
* Create place.
* Edit place.
* Delete place.
* Set price.
* Set operating hours.
* Manage availability.
* View bookings.
* View basic revenue.

### MVP Admin

* Admin login.
* User management.
* Owner management.
* Place management.
* Booking monitoring.
* Review moderation.

---

# 29. Post-MVP Features

The following features should not block the MVP:

* AI place recommendation.
* AI business insights.
* Real-time notifications.
* WebSocket updates.
* Advanced analytics.
* Promotional codes.
* Wallet.
* Multiple payment providers.
* Chat between customer and owner.
* Map-based exploration.
* Advanced recommendation system.
* Owner verification.
* Subscription system.
* Loyalty/reward system.

These features should only be implemented after the core booking flow is stable.

---

# 30. Non-Functional Requirements

## Performance

* Main pages should load quickly.
* API responses should generally target less than 500 ms under normal conditions.
* Search results should respond without unnecessary delay.
* The application should avoid unnecessary API requests.

## Security

* Passwords must never be stored as plain text.
* Authentication tokens must be handled securely.
* Role-based access control must be enforced on the backend.
* Users must not access resources belonging to another user.
* Owner must only manage their own places.
* Admin-only endpoints must be protected.
* Payment secrets must never be exposed to the frontend.
* User input must be validated on the backend.

## Reliability

* Booking creation must be protected against double booking.
* Payment status must be synchronized with the payment provider.
* Important booking and payment operations should be logged.
* Failed operations should return useful error messages.

## Responsive Design

The application must work properly on:

* Desktop.
* Tablet.
* Mobile.

The primary interface should be designed desktop-first while maintaining a good mobile experience.

---

# 31. UX Requirements

RentSpace should prioritize simplicity.

A customer should be able to:

```text
Find Place
    ↓
Check Availability
    ↓
Book
    ↓
Pay
```

with minimal unnecessary steps.

Important actions should be visually clear.

The booking price should always be visible before payment.

Error messages should explain what went wrong and what the user can do next.

Loading states should be shown when data is being fetched.

Empty states should be provided for pages such as:

* No bookings.
* No favorites.
* No search results.
* No notifications.

---

# 32. Design Direction

RentSpace should use a modern SaaS/marketplace visual style.

Design principles:

* Clean.
* Modern.
* Professional.
* Minimal.
* Spacious.
* Easy to navigate.
* Strong typography.
* Consistent spacing.
* Clear hierarchy.
* High-quality place imagery.

The interface should avoid excessive colors, unnecessary gradients, excessive animations, and visually noisy components.

The exact visual design system will be defined separately in `UI_GUIDELINES.md` after the initial UI design is created.

---

# 33. Business Model

The initial RentSpace business model can use a commission-based model.

Example:

```text
Customer booking
       ↓
Payment
       ↓
RentSpace
       ↓
Commission
       ↓
Owner receives payout
```

RentSpace may charge a percentage of each successful booking.

Additional future revenue streams:

* Featured listings.
* Owner subscription.
* Promotional placement.
* Business analytics subscription.

The exact commission percentage is not fixed in the MVP and should be configurable in the future.

---

# 34. Success Metrics

The MVP should measure:

### Customer

* Number of registered customers.
* Number of searches.
* Number of place detail views.
* Number of bookings.
* Booking conversion rate.
* Cancellation rate.
* Average booking value.

### Owner

* Number of registered owners.
* Number of active places.
* Number of bookings received.
* Total revenue.
* Average place rating.

### Platform

* Total bookings.
* Successful payments.
* Failed payments.
* Active users.
* Monthly booking growth.

---

# 35. Acceptance Criteria

The MVP is considered functional when:

### Authentication

* Customer can register and login.
* Owner can register and login.
* Admin can login.
* Users receive the correct permissions based on their role.

### Places

* Owner can create a place.
* Owner can edit a place.
* Owner can delete/deactivate a place.
* Customer can browse places.
* Customer can search and filter places.

### Booking

* Customer can select a valid date and time.
* System correctly calculates booking price.
* System prevents overlapping bookings.
* Customer can view booking details.
* Owner can view incoming bookings.

### Payment

* Customer can initiate payment.
* Payment status can be updated.
* Booking status changes according to valid payment confirmation.

### Review

* Customer can review completed bookings.
* Customer cannot review a place without a completed booking.

### Security

* Users cannot access another user's private data.
* Owner cannot modify another owner's place.
* Customer cannot access owner/admin functionality.
* Admin endpoints require admin authorization.

---

# 36. Development Principles

RentSpace should be developed incrementally.

The development process should prioritize:

1. Correctness.
2. Security.
3. Maintainability.
4. Good user experience.
5. Performance.
6. Visual quality.

Do not implement advanced features before the core booking system is stable.

Do not add features that are not defined in the current scope without updating the PRD and TASKS documentation first.

---

# 37. MVP Development Priority

The recommended development order is:

```text
1. Project Setup
2. Authentication
3. User & Role Management
4. Place Management
5. Place Discovery
6. Place Detail
7. Availability System
8. Booking System
9. Payment
10. Booking History
11. Owner Dashboard
12. Reviews & Ratings
13. Favorites
14. Notifications
15. Admin Dashboard
16. Testing
17. Deployment
```

After the MVP is stable:

```text
18. Maps
19. Real-time Features
20. AI Recommendations
21. AI Business Insights
22. Advanced Analytics
```

---

# 38. Out of Scope for Initial MVP

The initial MVP will not focus on:

* Complex social networking.
* Livestreaming.
* Cryptocurrency.
* Multi-country support.
* Multi-language support.
* Complex loyalty programs.
* Advanced financial accounting.
* AI-generated fake listings.
* AI-generated availability.
* Unverified payment confirmation from frontend.

These features may be considered in future versions if they provide meaningful value.

---

# 39. Product Principle

The main principle of RentSpace is:

> Make finding and booking a place as simple as ordering something online.

A customer should not need to contact multiple owners just to find an available place.

RentSpace should provide the information needed to make a booking decision in one place:

```text
WHERE
PRICE
AVAILABILITY
FACILITIES
RATING
BOOKING
PAYMENT
```

The platform should prioritize trustworthy information, transparent pricing, reliable availability, and a simple booking experience.

---

# 40. Document Status

Version: 1.0

Status: Initial Product Definition

This document is the primary product requirement reference for RentSpace.

Changes to major product requirements should be reflected in this document before implementation.

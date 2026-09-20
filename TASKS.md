# RentSpace - Development Tasks

## 1. Document Purpose

Dokumen ini berisi roadmap dan task development untuk project RentSpace.

TASKS.md digunakan sebagai:

- development roadmap
- acuan urutan pengerjaan fitur
- checklist implementasi
- acuan Agentic AI saat coding
- acuan testing
- acuan deployment
- progress tracker project

Semua task harus dikerjakan secara bertahap.

Jangan mengerjakan fitur yang belum menjadi prioritas apabila task sebelumnya belum stabil.

---

# 2. Development Principles

## 2.1 MVP First

RentSpace dikembangkan menggunakan pendekatan MVP.

Prioritas:

1. Authentication
2. User roles
3. Place management
4. Search and discovery
5. Availability
6. Booking
7. Payment
8. Customer dashboard
9. Owner dashboard
10. Admin dashboard
11. Review
12. Notification
13. Advanced features
14. AI features

Fitur advanced tidak boleh menghambat core booking flow.

---

## 2.2 Core Business Flow

Core business flow RentSpace:

```text
User
  ↓
Register / Login
  ↓
Explore Places
  ↓
Search / Filter
  ↓
View Place Detail
  ↓
Check Availability
  ↓
Select Date & Time
  ↓
Create Booking
  ↓
Payment
  ↓
Payment Verification
  ↓
Booking Confirmation
  ↓
Use Place
  ↓
Booking Completed
  ↓
Review
```

Core flow ini harus stabil sebelum fitur tambahan dikembangkan.

---

# 3. Task Status Convention

Gunakan status berikut:

```text
[ ] TODO
[-] IN PROGRESS
[x] DONE
[!] BLOCKED
```

Contoh:

```md
[x] Setup Next.js
[-] Implement authentication
[ ] Implement booking service
[!] Waiting for Midtrans credentials
```

---

# 4. Priority Convention

Gunakan priority:

```text
P0 = Critical / wajib untuk MVP
P1 = Important
P2 = Secondary
P3 = Nice to have
```

---

# 5. Phase Overview

```text
Phase 0  - Project Planning
Phase 1  - Repository & Environment Setup
Phase 2  - Backend Foundation
Phase 3  - Database Implementation
Phase 4  - Authentication & Authorization
Phase 5  - Frontend Foundation
Phase 6  - Design System & UI Components
Phase 7  - Place Management
Phase 8  - Search & Explore
Phase 9  - Availability
Phase 10 - Booking System
Phase 11 - Payment
Phase 12 - Customer Features
Phase 13 - Owner Features
Phase 14 - Review & Favorite
Phase 15 - Notification
Phase 16 - Admin Dashboard
Phase 17 - AI Features
Phase 18 - Testing & Security
Phase 19 - Performance Optimization
Phase 20 - Deployment
Phase 21 - Documentation
```

---

# 6. PHASE 0 - PROJECT PLANNING

Priority: P0

## 6.1 Project Documentation

[x] Create PRD.md

[x] Create ARCHITECTURE.md

[x] Create DATABASE.md

[x] Create API.md

[x] Create UI_GUIDELINES.md

[x] Create TASKS.md

[x] Create AGENTS.md

[x] Create README.md

---

## 6.2 Product Definition

[x] Define RentSpace business model

[x] Define customer role

[x] Define owner role

[x] Define admin role

[x] Define core booking flow

[x] Define payment flow

[x] Define place categories

[x] Define booking statuses

[x] Define payment statuses

[x] Define design direction

---

# 7. PHASE 1 - PROJECT & ENVIRONMENT SETUP

Priority: P0

## 7.1 Repository

[ ] Create GitHub repository

[x] Initialize Git

[ ] Create main branch

[ ] Create development branch

[x] Create `.gitignore`

[x] Create `.env.example`

[x] Create README.md

[x] Add initial project structure

---

## 7.2 Directory Structure

Target structure:

```text
rentspace/
├── AGENTS.md
├── PRD.md
├── ARCHITECTURE.md
├── DATABASE.md
├── API.md
├── UI_GUIDELINES.md
├── TASKS.md
├── README.md
│
├── docs/
│   └── designs/
│
├── frontend/
│
└── backend/
```

---

## 7.3 Frontend Setup

[x] Initialize Next.js

[x] Configure TypeScript

[x] Configure Tailwind CSS

[x] Configure shadcn/ui

[x] Configure ESLint

[x] Configure Prettier

[x] Configure path aliases

[x] Configure environment variables

[x] Verify development server

---

## 7.4 Backend Setup

[x] Initialize Go module

[x] Install Gin

[x] Install GORM

[x] Install PostgreSQL driver

[ ] Install JWT/auth dependencies

[x] Configure environment variables

[x] Create application entry point

[x] Create HTTP server

[x] Create router

[x] Create middleware structure

[x] Create configuration package

[x] Create database package

[x] Verify backend server

---

## 7.5 Local Development

[x] Configure PostgreSQL locally

[x] Configure frontend API URL

[x] Configure backend database URL

[x] Test frontend → backend connection

[x] Test backend → PostgreSQL connection

[x] Verify CORS

[x] Verify environment variables

---

# 8. PHASE 2 - BACKEND FOUNDATION

Priority: P0

## 8.1 Application Architecture

[x] Create Handler layer

[x] Create Service layer

[x] Create Repository layer

[x] Create Model layer

[x] Create Middleware layer

[x] Create Config layer

[x] Create Database layer

---

## 8.2 Backend Structure

Target structure:

```text
backend/
├── cmd/
│   └── server/
│
├── internal/
│   ├── config/
│   ├── database/
│   ├── middleware/
│   │
│   ├── auth/
│   ├── users/
│   ├── places/
│   ├── bookings/
│   ├── payments/
│   ├── reviews/
│   ├── favorites/
│   ├── notifications/
│   ├── reports/
│   ├── admin/
│   └── ai/
│
├── migrations/
├── seeds/
├── tests/
│
├── go.mod
└── go.sum
```

---

## 8.3 API Foundation

[x] Create `/api/v1` route group

[x] Create health endpoint

[x] Create standardized response format

[x] Create standardized error format

[x] Create HTTP status handling

[x] Create request validation

[x] Create pagination helper

[x] Create API logging

[ ] Create request ID handling

---

## 8.4 Error Response

Standard format:

```json
{
  "success": false,
  "message": "Human readable error message",
  "error": {
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

---

# 9. PHASE 3 - DATABASE IMPLEMENTATION

Priority: P0

## 9.1 Database Connection

[x] Configure PostgreSQL

[x] Configure GORM

[x] Implement database connection

[x] Implement connection health check

[x] Implement migration system

---

## 9.2 Database Tables

Create:

[x] users

[x] owner_profiles

[x] categories

[x] places

[x] place_pricing

[x] place_images

[x] facilities

[x] place_facilities

[x] operating_hours

[x] availability_blocks

[x] bookings

[x] payments

[x] reviews

[x] favorites

[x] notifications

[x] reports

[x] audit_logs

---

## 9.3 Database Constraints

[x] Add UUID primary keys

[x] Add foreign keys

[x] Add required fields

[x] Add unique constraints

[x] Add indexes

[x] Add timestamps

[x] Add status constraints where appropriate

[x] Add booking-related indexes

[ ] Add search-related indexes

---

## 9.4 Database Seed

[x] Seed admin account

[x] Seed customer account

[x] Seed owner account

[x] Seed categories

[x] Seed facilities

[x] Seed sample places

[ ] Seed sample pricing

[ ] Seed operating hours

[ ] Seed sample images

[ ] Seed development bookings

---

# 10. PHASE 4 - AUTHENTICATION & AUTHORIZATION

Priority: P0

## 10.1 Registration

[x] Create register endpoint

[x] Validate name

[x] Validate email

[x] Validate password

[x] Hash password

[x] Create user

[x] Return authentication state

[x] Handle duplicate email

---

## 10.2 Login

[x] Create login endpoint

[x] Validate credentials

[x] Verify password

[x] Generate authentication token/session

[x] Set secure authentication cookie if cookie-based strategy is used

[x] Handle invalid credentials

---

## 10.3 Google OAuth

[ ] Configure Google OAuth

[ ] Create OAuth callback

[ ] Find existing user

[ ] Create user when needed

[ ] Connect Google account

[ ] Create authentication session

[ ] Handle OAuth errors

---

## 10.4 Logout

[ ] Create logout endpoint

[ ] Invalidate session/token

[ ] Clear authentication cookie

[ ] Redirect/return correct response

---

## 10.5 Current User

[ ] Create `/auth/me`

[ ] Return authenticated user

[ ] Return role

[ ] Return profile data

---

## 10.6 Authorization

Implement RBAC:

```text
CUSTOMER
OWNER
ADMIN
```

[x] Customer middleware

[x] Owner middleware

[x] Admin middleware

[x] Resource ownership validation

[x] Prevent customer accessing owner endpoints

[x] Prevent owner accessing other owner's resources

[x] Prevent customer/owner accessing admin endpoints

---

# 11. PHASE 5 - FRONTEND FOUNDATION

Priority: P0

## 11.1 Application Setup

[x] Configure Next.js App Router

[x] Configure TypeScript

[x] Configure Tailwind

[ ] Configure shadcn/ui

[x] Configure fonts

[x] Configure global CSS

[x] Configure design tokens

[x] Configure environment variables

---

## 11.2 Base Layout

[x] Create root layout

[x] Create navbar

[x] Create footer

[x] Create responsive container

[x] Create page wrapper

[x] Create desktop navigation

[x] Create mobile navigation

---

## 11.3 Route Structure

Target:

```text
/
├── /explore
├── /categories
├── /places/[slug]
│
├── /auth/login
├── /auth/register
│
├── /booking/[id]
├── /booking/[id]/payment
├── /booking/[id]/confirmation
│
├── /dashboard
├── /dashboard/bookings
├── /dashboard/favorites
├── /dashboard/profile
│
├── /owner
├── /owner/places
├── /owner/places/new
├── /owner/places/[id]
├── /owner/bookings
├── /owner/revenue
├── /owner/analytics
│
└── /admin
    ├── /users
    ├── /owners
    ├── /places
    ├── /bookings
    ├── /reviews
    ├── /reports
    └── /analytics
```

---

# 12. PHASE 6 - DESIGN SYSTEM & UI COMPONENTS

Priority: P0

Reference:

```text
UI_GUIDELINES.md
```

The implementation must follow UI_GUIDELINES.md.

---

## 12.1 Base Components

[ ] Button

[ ] IconButton

[ ] Input

[ ] Textarea

[ ] Select

[ ] Checkbox

[ ] Radio

[ ] Switch

[ ] Label

[ ] Badge

[ ] Avatar

[ ] Card

[ ] Dialog

[ ] Drawer

[ ] Dropdown

[ ] Tooltip

[ ] Tabs

[ ] Breadcrumb

[ ] Pagination

[ ] Skeleton

[ ] Toast

[ ] Alert

---

## 12.2 RentSpace Components

[x] Navbar

[x] Footer

[x] SearchBar

[x] SearchField

[x] CategoryCard

[x] PlaceCard

[x] PlaceGrid

[x] FilterPanel

[x] SortDropdown

[ ] ImageGallery

[ ] FacilityList

[x] RatingDisplay

[x] PriceDisplay

[ ] AvailabilityCalendar

[ ] TimeSlotPicker

[ ] BookingSummary

[ ] BookingStatusBadge

[ ] PaymentSummary

[ ] DashboardSidebar

[ ] StatsCard

[ ] RevenueChart

[ ] BookingTable

[ ] ReviewCard

[ ] NotificationItem

[x] MapPreview

---

# 13. PHASE 7 - PLACE MANAGEMENT

Priority: P0

## 13.1 Categories

[x] Create category model

[x] Create category API

[ ] Create category seed

[x] Display categories

[x] Filter places by category

---

## 13.2 Owner Place Creation

Owner must be able to:

[x] Add place name

[x] Add description

[x] Select category

[x] Add address

[x] Add latitude

[x] Add longitude

[x] Add capacity

[ ] Add facilities

[ ] Add pricing

[ ] Add operating hours

[ ] Upload images

[x] Set place status

---

## 13.3 Owner Place Editing

[x] Edit place information

[ ] Edit facilities

[ ] Edit pricing

[ ] Edit operating hours

[ ] Edit images

[ ] Edit availability

---

## 13.4 Place Deletion

[ ] Add delete confirmation

[ ] Prevent accidental deletion

[x] Validate owner ownership

[ ] Handle places with historical bookings

[x] Prefer soft-delete/archive where appropriate

---

## 13.5 Public Place Detail

[ ] Place gallery

[x] Place name

[x] Category

[x] Rating

[x] Review count

[x] Location

[x] Description

[x] Facilities

[x] Capacity

[x] Pricing

[x] Operating hours

[ ] Availability

[ ] Reviews

[ ] Map

[ ] Booking CTA

---

# 14. PHASE 8 - SEARCH & EXPLORE

Priority: P0

## 14.1 Search

Search parameters:

```text
keyword
category
location
min_price
max_price
facilities
rating
capacity
date
start_time
duration
page
limit
sort
```

---

## 14.2 Backend Search

[x] Implement keyword search

[x] Implement category filter

[x] Implement location filter

[x] Implement price filter

[x] Implement rating filter

[x] Implement facility filter

[x] Implement capacity filter

[x] Implement pagination

[x] Implement sorting

[ ] Optimize queries

---

## 14.3 Explore Page

[x] Create search interface

[x] Create filter sidebar

[x] Create mobile filter drawer

[x] Create result count

[x] Create sort control

[x] Create place grid

[x] Create pagination/load more

[x] Create loading state

[x] Create empty state

[x] Create error state

---

## 14.4 Homepage

[x] Hero section

[x] Main search

[x] Categories

[x] Popular places

[x] Nearby/recommended places

[x] Why RentSpace

[x] Owner CTA

[x] Footer

---

# 15. PHASE 9 - AVAILABILITY

Priority: P0

## 15.1 Operating Hours

[ ] Store weekly operating hours

[ ] Validate opening time

[ ] Validate closing time

[ ] Handle closed days

---

## 15.2 Availability Blocks

[ ] Create unavailable periods

[ ] Create maintenance blocks

[ ] Create owner-defined blocked periods

[ ] Prevent booking during blocked periods

---

## 15.3 Availability API

[ ] Create availability endpoint

[ ] Accept date

[ ] Accept start time

[ ] Accept duration

[ ] Return available slots

[ ] Return unavailable slots

---

## 15.4 Conflict Detection

[ ] Detect overlapping bookings

[ ] Detect availability blocks

[ ] Detect outside operating hours

[ ] Validate immediately before booking confirmation

[ ] Prevent race conditions

[ ] Use database transaction/locking strategy where necessary

---

# 16. PHASE 10 - BOOKING SYSTEM

Priority: P0

## 16.1 Booking Creation

[ ] Select date

[ ] Select start time

[ ] Select duration

[ ] Calculate price

[ ] Create booking

[ ] Generate booking number

[ ] Set initial booking status

[ ] Set initial payment status

---

## 16.2 Booking Status

Use:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

---

## 16.3 Booking Rules

[ ] Prevent overlapping bookings

[ ] Prevent booking unavailable periods

[ ] Prevent booking outside operating hours

[ ] Prevent booking past dates

[ ] Validate place status

[ ] Validate booking ownership

[ ] Validate price server-side

[ ] Validate availability server-side

[ ] Use transaction

---

## 16.4 Customer Booking

[ ] View booking

[ ] View booking history

[ ] View booking status

[ ] Cancel booking

[ ] View payment status

[ ] View place information

[ ] View booking date/time

---

## 16.5 Owner Booking

[ ] View incoming bookings

[ ] Filter bookings

[ ] View booking details

[ ] Confirm booking where applicable

[ ] Reject/cancel booking where applicable

[ ] Mark completed where applicable

---

## 16.6 Booking Cancellation

[ ] Create cancellation endpoint

[ ] Validate cancellation rules

[ ] Update booking status

[ ] Trigger refund flow if applicable

[ ] Create notification

[ ] Prevent invalid cancellation

---

# 17. PHASE 11 - PAYMENT

Priority: P0

Payment provider:

```text
Midtrans
```

---

## 17.1 Payment Creation

[ ] Create payment endpoint

[ ] Generate Midtrans transaction

[ ] Generate payment reference

[ ] Store payment record

[ ] Return payment instructions/token

---

## 17.2 Payment Status

Use:

```text
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

---

## 17.3 Payment Webhook

[ ] Create webhook endpoint

[ ] Validate webhook signature

[ ] Parse provider status

[ ] Update payment

[ ] Update booking

[ ] Handle duplicate webhook

[ ] Implement idempotency

[ ] Never trust frontend payment status

---

## 17.4 Payment Failure

[ ] Display failure state

[ ] Allow retry where appropriate

[ ] Prevent duplicate booking creation

[ ] Keep booking/payment state consistent

---

## 17.5 Payment Success

[ ] Verify payment server-side

[ ] Update payment to PAID

[ ] Update booking to CONFIRMED

[ ] Create confirmation record/state

[ ] Send notification

[ ] Show confirmation page

---

# 18. PHASE 12 - CUSTOMER FEATURES

Priority: P1

## 18.1 Customer Dashboard

[ ] Dashboard overview

[ ] Upcoming bookings

[ ] Recent bookings

[ ] Favorite places

[ ] Notifications

---

## 18.2 Booking History

[ ] List bookings

[ ] Filter by status

[ ] View booking details

[ ] View payment status

[ ] View receipt/payment information

---

## 18.3 Favorites

[ ] Add favorite

[ ] Remove favorite

[ ] List favorites

[ ] Show favorite state on PlaceCard

---

## 18.4 Profile

[ ] View profile

[ ] Edit profile

[ ] Change name

[ ] Change avatar

[ ] Change password

[ ] Manage account settings

---

# 19. PHASE 13 - OWNER FEATURES

Priority: P1

## 19.1 Owner Dashboard

[ ] Dashboard overview

[ ] Total bookings

[ ] Revenue

[ ] Active places

[ ] Completed bookings

[ ] Pending bookings

---

## 19.2 Owner Place Management

[ ] List owned places

[ ] Add place

[ ] Edit place

[ ] Archive place

[ ] Manage images

[ ] Manage pricing

[ ] Manage facilities

[ ] Manage operating hours

[ ] Manage availability

---

## 19.3 Owner Booking Management

[ ] View bookings

[ ] Filter bookings

[ ] View customer details allowed by policy

[ ] Confirm booking

[ ] Cancel booking

[ ] Mark completed

---

## 19.4 Owner Revenue

[ ] Revenue summary

[ ] Revenue by period

[ ] Booking count

[ ] Average booking value

[ ] Basic revenue chart

---

## 19.5 Owner Analytics

[ ] Popular places

[ ] Booking trends

[ ] Revenue trends

[ ] Peak booking times

[ ] Cancellation rate

---

# 20. PHASE 14 - REVIEWS & RATINGS

Priority: P1

## 20.1 Customer Review

[ ] Allow review after completed booking

[ ] Rating 1-5

[ ] Review text

[ ] Validate booking ownership

[ ] Prevent duplicate review

---

## 20.2 Place Reviews

[ ] Display reviews

[ ] Display average rating

[ ] Display review count

[ ] Sort reviews

---

## 20.3 Review Moderation

[ ] Report review

[ ] Admin review management

[ ] Hide inappropriate review

[ ] Audit moderation action

---

# 21. PHASE 15 - NOTIFICATIONS

Priority: P1

## 21.1 Notification Events

Create notifications for:

[ ] Booking created

[ ] Payment pending

[ ] Payment successful

[ ] Payment failed

[ ] Booking confirmed

[ ] Booking cancelled

[ ] Booking completed

[ ] Review reminder

[ ] Owner booking received

---

## 21.2 Notification UI

[ ] Notification icon

[ ] Unread count

[ ] Notification dropdown

[ ] Notification page

[ ] Mark as read

[ ] Mark all as read

---

## 21.3 Real-Time

Post-MVP:

[ ] WebSocket connection

[ ] Real-time notification delivery

[ ] Reconnection logic

[ ] Connection state

---

# 22. PHASE 16 - ADMIN DASHBOARD

Priority: P1

## 22.1 Admin Overview

[ ] Total users

[ ] Total owners

[ ] Total places

[ ] Total bookings

[ ] Revenue

[ ] Platform activity

---

## 22.2 User Management

[ ] List users

[ ] Search users

[ ] Filter users

[ ] View user

[ ] Suspend user

[ ] Activate user

[ ] Change role where permitted

---

## 22.3 Owner Management

[ ] List owners

[ ] View owner

[ ] View owner places

[ ] Review owner activity

[ ] Suspend owner

---

## 22.4 Place Management

[ ] List places

[ ] Search places

[ ] Filter places

[ ] View place

[ ] Approve place where required

[ ] Suspend place

[ ] Archive place

---

## 22.5 Booking Management

[ ] List bookings

[ ] Search booking

[ ] View booking

[ ] Filter booking status

[ ] View payment status

---

## 22.6 Report Management

[ ] List reports

[ ] View report

[ ] Update report status

[ ] Take moderation action

[ ] Create audit log

---

# 23. PHASE 17 - AI FEATURES

Priority: P2

AI features must not be implemented before the core booking system is stable.

---

## 23.1 AI Place Recommendation

Goal:

Help customers discover relevant places.

Input examples:

```text
location
category
budget
date
time
duration
capacity
facilities
user preference
```

---

## 23.2 Recommendation Rules

[ ] AI receives structured place data

[ ] AI only recommends places from database results

[ ] AI cannot invent place names

[ ] AI cannot invent prices

[ ] AI cannot invent availability

[ ] AI cannot directly modify booking data

[ ] Backend validates recommendation results

---

## 23.3 AI Recommendation API

[ ] Create recommendation endpoint

[ ] Validate user input

[ ] Retrieve candidate places

[ ] Send structured data to AI

[ ] Parse AI response

[ ] Validate place IDs

[ ] Return recommendations

---

## 23.4 Owner AI Insights

Potential features:

[ ] Revenue analysis

[ ] Booking trend summary

[ ] Peak time analysis

[ ] Place performance summary

[ ] Suggested pricing insights

---

## 23.5 AI Safety

[ ] AI never has unrestricted production database access

[ ] AI never handles payment authorization

[ ] AI never changes booking status

[ ] AI never bypasses RBAC

[ ] AI output must be treated as untrusted data

---

# 24. PHASE 18 - TESTING

Priority: P0

Testing is mandatory before production deployment.

---

## 24.1 Backend Unit Tests

[ ] Auth service

[ ] User service

[ ] Place service

[ ] Search service

[ ] Availability service

[ ] Booking service

[ ] Payment service

[ ] Review service

[ ] Favorite service

---

## 24.2 Backend Integration Tests

[ ] Database connection

[ ] Authentication flow

[ ] Place CRUD

[ ] Search

[ ] Availability

[ ] Booking creation

[ ] Booking conflict

[ ] Cancellation

[ ] Payment webhook

[ ] Review creation

---

## 24.3 Frontend Tests

[ ] Components

[ ] Forms

[ ] Search

[ ] Filters

[ ] Booking flow

[ ] Payment state

[ ] Dashboard

---

## 24.4 E2E Tests

Critical E2E flow:

```text
Register
↓
Login
↓
Explore
↓
Search
↓
Open Place
↓
Check Availability
↓
Select Date
↓
Select Time
↓
Create Booking
↓
Payment
↓
Payment Confirmation
↓
Booking Confirmation
```

---

## 24.5 Booking Edge Cases

Test:

[ ] Two users booking same slot simultaneously

[ ] Booking unavailable slot

[ ] Booking outside operating hours

[ ] Booking past date

[ ] Payment timeout

[ ] Payment failed

[ ] Duplicate payment callback

[ ] Duplicate booking request

[ ] User refreshes during payment

[ ] User closes browser during payment

[ ] Network failure during booking

---

# 25. PHASE 19 - SECURITY

Priority: P0

## 25.1 Authentication Security

[ ] Secure password hashing

[ ] Secure authentication cookies/tokens

[ ] Session expiration

[ ] Logout invalidation

[ ] OAuth validation

---

## 25.2 Authorization Security

[ ] RBAC middleware

[ ] Resource ownership checks

[ ] Admin authorization

[ ] Prevent IDOR

---

## 25.3 API Security

[ ] Request validation

[ ] Rate limiting

[ ] CORS configuration

[ ] Secure headers

[ ] SQL injection prevention

[ ] XSS prevention

[ ] CSRF protection where applicable

[ ] Request size limits

---

## 25.4 Payment Security

[ ] Verify webhook signature

[ ] Never trust client payment status

[ ] Server-side price calculation

[ ] Idempotent webhook handling

[ ] Prevent duplicate transactions

---

## 25.5 Secrets

Never commit:

```text
DATABASE_URL
JWT_SECRET
GOOGLE_CLIENT_SECRET
MIDTRANS_SERVER_KEY
CLOUDINARY_SECRET
AI_API_KEY
```

Use:

```text
.env
.env.local
```

and provide:

```text
.env.example
```

---

# 26. PHASE 20 - PERFORMANCE

Priority: P1

## 26.1 Frontend Performance

[ ] Optimize images

[ ] Use Next.js Image

[ ] Lazy-load non-critical content

[ ] Avoid unnecessary Client Components

[ ] Minimize JavaScript

[ ] Optimize fonts

[ ] Avoid unnecessary animations

[ ] Implement loading states

---

## 26.2 Backend Performance

[ ] Database indexes

[ ] Pagination

[ ] Query optimization

[ ] Avoid N+1 queries

[ ] Connection pooling

[ ] Response optimization

---

## 26.3 Performance Targets

Target:

```text
Navigation: <= 1.5 seconds where practical
Firestore: not applicable
API response: <= 500ms for normal CRUD/search requests where practical
Checkout: <= 3 main user actions
Availability query: fast enough for interactive booking
```

For database-backed features, PostgreSQL is the source of truth.

---

# 27. PHASE 21 - RESPONSIVE DESIGN

Priority: P0

Supported:

```text
Mobile
Tablet
Desktop
Large Desktop
```

---

## 27.1 Mobile

[ ] Responsive navbar

[ ] Mobile menu

[ ] Mobile search

[ ] Mobile filters

[ ] Responsive place cards

[ ] Responsive booking card

[ ] Responsive dashboard

[ ] Mobile-friendly tables

[ ] Bottom navigation where useful

---

## 27.2 Tablet

[ ] Adaptive grid

[ ] Adaptive filters

[ ] Proper spacing

[ ] No horizontal overflow

---

## 27.3 Desktop

[ ] Maximum content width

[ ] 3-column place grid where appropriate

[ ] Sticky booking card

[ ] Dashboard sidebar

[ ] Multi-column forms

---

# 28. PHASE 22 - ACCESSIBILITY

Priority: P1

[ ] Keyboard navigation

[ ] Visible focus states

[ ] Semantic HTML

[ ] Accessible form labels

[ ] Proper button labels

[ ] Alt text for meaningful images

[ ] Decorative images marked appropriately

[ ] Color contrast

[ ] Error messages accessible

[ ] Dialog focus management

[ ] Escape key support

[ ] Screen-reader-friendly states

---

# 29. PHASE 23 - UI QUALITY ASSURANCE

Priority: P0

All pages must follow:

```text
UI_GUIDELINES.md
```

---

## 29.1 Visual Checklist

[ ] Correct typography

[ ] Correct spacing

[ ] Correct colors

[ ] Correct border radius

[ ] Correct shadows

[ ] Correct button hierarchy

[ ] Correct card style

[ ] Correct image proportions

[ ] Correct responsive behavior

[ ] Correct navigation

[ ] No accidental horizontal scrolling

---

## 29.2 Stitch Comparison

For pages designed in Google Stitch:

[ ] Compare implementation with Stitch

[ ] Compare layout

[ ] Compare spacing

[ ] Compare typography

[ ] Compare colors

[ ] Compare card proportions

[ ] Compare responsive behavior

[ ] Fix major visual differences

Stitch is the primary visual reference.

---

# 30. PHASE 24 - CONTENT & UX

Priority: P1

[ ] Use consistent Indonesian/English terminology

[ ] Avoid placeholder text in production UI

[ ] Use realistic venue data

[ ] Use realistic prices

[ ] Use realistic categories

[ ] Use realistic reviews

[ ] Use clear CTA labels

[ ] Avoid unnecessary technical terminology

---

## 30.1 Important UX Rule

User should always understand:

```text
Where am I?
What can I do here?
What happens next?
How much will it cost?
Is the place available?
Is my booking confirmed?
```

---

# 31. PHASE 25 - ERROR & EMPTY STATES

Priority: P0

Every important page must have:

```text
Loading
Success
Empty
Error
Disabled
```

states where applicable.

---

## 31.1 Search Empty State

Example:

```text
No spaces found

Try changing your location, date, category, or filters.
```

---

## 31.2 Booking Error

Example:

```text
This time slot is no longer available.

Please choose another time.
```

---

## 31.3 Payment Error

Example:

```text
Payment could not be completed.

Please try again or choose another payment method.
```

---

## 31.4 Network Error

Example:

```text
Something went wrong.

Please check your connection and try again.
```

---

# 32. PHASE 26 - DEPLOYMENT

Priority: P0

Target:

```text
Frontend → Vercel
Backend → Railway
Database → Cloud PostgreSQL
```

---

## 32.1 Frontend Deployment

[ ] Configure Vercel project

[ ] Configure production environment variables

[ ] Configure API URL

[ ] Configure domain

[ ] Test production build

[ ] Test production routes

---

## 32.2 Backend Deployment

[ ] Configure Railway

[ ] Configure production environment

[ ] Configure PostgreSQL

[ ] Run migrations

[ ] Run seed if required

[ ] Configure CORS

[ ] Configure health check

[ ] Test API

---

## 32.3 Database Deployment

[ ] Create production database

[ ] Run migrations

[ ] Verify indexes

[ ] Verify constraints

[ ] Configure backups

[ ] Configure database credentials

---

## 32.4 External Services

Configure:

[ ] Google OAuth

[ ] Google Maps API

[ ] Midtrans

[ ] Cloudinary or Vercel Blob

[ ] AI API

---

# 33. PHASE 27 - CI/CD

Priority: P1

[ ] Configure GitHub Actions

[ ] Run frontend lint

[ ] Run frontend tests

[ ] Run frontend build

[ ] Run backend tests

[ ] Run backend build

[ ] Run migration checks

[ ] Block merge when tests fail

---

# 34. PHASE 28 - MONITORING & LOGGING

Priority: P1

[ ] Backend structured logging

[ ] Error logging

[ ] API response monitoring

[ ] Database error monitoring

[ ] Payment error monitoring

[ ] Authentication error monitoring

[ ] Production health check

[ ] Uptime monitoring

---

# 35. PHASE 29 - FINAL QA

Priority: P0

## 35.1 Authentication

[ ] Register works

[ ] Login works

[ ] Logout works

[ ] Google login works

[ ] Invalid credentials handled

[ ] Unauthorized routes protected

[ ] Role restrictions work

---

## 35.2 Customer

[ ] Search works

[ ] Filters work

[ ] Place detail works

[ ] Availability works

[ ] Booking works

[ ] Payment works

[ ] Booking history works

[ ] Cancellation works

[ ] Favorite works

[ ] Review works

[ ] Notification works

---

## 35.3 Owner

[ ] Owner registration/profile works

[ ] Place creation works

[ ] Place editing works

[ ] Image management works

[ ] Pricing works

[ ] Operating hours works

[ ] Availability blocks work

[ ] Booking management works

[ ] Revenue works

[ ] Analytics works

---

## 35.4 Admin

[ ] User management works

[ ] Owner management works

[ ] Place management works

[ ] Booking management works

[ ] Review moderation works

[ ] Reports work

[ ] Analytics work

[ ] Audit logs work

---

# 36. PHASE 30 - PRODUCTION READINESS

Priority: P0

Before production:

[ ] No hardcoded secrets

[ ] No debug logs containing sensitive data

[ ] No test accounts exposed unintentionally

[ ] No broken routes

[ ] No console errors

[ ] No TypeScript errors

[ ] No Go build errors

[ ] No failed tests

[ ] Database migrations tested

[ ] Payment webhook tested

[ ] Authentication tested

[ ] Booking concurrency tested

[ ] Responsive UI tested

[ ] Accessibility checked

[ ] Production environment variables configured

[ ] Error handling verified

[ ] Backup strategy verified

---

# 37. MVP DEFINITION

RentSpace MVP is considered complete when all of the following work:

## Authentication

[ ] Customer register/login

[ ] Owner authentication

[ ] Admin authentication

[ ] RBAC

---

## Places

[ ] Owner can create place

[ ] Owner can edit place

[ ] Customer can browse places

[ ] Customer can view place detail

---

## Search

[ ] Search

[ ] Category filter

[ ] Location filter

[ ] Price filter

[ ] Basic sorting

---

## Availability

[ ] Operating hours

[ ] Availability blocks

[ ] Existing booking detection

[ ] Conflict prevention

---

## Booking

[ ] Select date

[ ] Select time

[ ] Select duration

[ ] Calculate price

[ ] Create booking

[ ] Booking status

[ ] Cancellation

---

## Payment

[ ] Create payment

[ ] Midtrans integration

[ ] Webhook verification

[ ] Payment status

[ ] Booking confirmation

---

## Customer

[ ] Dashboard

[ ] Booking history

[ ] Favorites

[ ] Profile

---

## Owner

[ ] Dashboard

[ ] Place management

[ ] Booking management

[ ] Revenue summary

---

## Admin

[ ] User management

[ ] Place management

[ ] Booking management

[ ] Basic reports

---

# 38. POST-MVP FEATURES

After MVP is stable:

[ ] Advanced search

[ ] Google Maps integration improvements

[ ] WebSocket notifications

[ ] Advanced owner analytics

[ ] Advanced admin analytics

[ ] Review moderation improvements

[ ] Automated reminders

[ ] Email notifications

[ ] Push notifications

[ ] AI recommendations

[ ] AI owner insights

[ ] Personalized homepage

[ ] Promotional codes

[ ] Dynamic pricing

[ ] Multiple payment methods

[ ] Subscription/membership

[ ] Loyalty system

---

# 39. DEVELOPMENT ORDER

Recommended implementation order:

```text
1. Repository setup
2. Environment setup
3. Backend foundation
4. Database
5. Authentication
6. Authorization
7. Frontend foundation
8. Design system
9. Homepage
10. Explore
11. Place detail
12. Owner place management
13. Availability
14. Booking
15. Payment
16. Booking confirmation
17. Customer dashboard
18. Owner dashboard
19. Favorites
20. Reviews
21. Notifications
22. Admin dashboard
23. Testing
24. Security
25. Performance
26. Deployment
27. AI features
```

Do not jump directly to AI features before booking and payment are stable.

---

# 40. GIT WORKFLOW

Recommended branch structure:

```text
main
develop
feature/*
fix/*
hotfix/*
```

Examples:

```text
feature/authentication
feature/place-management
feature/search
feature/booking
feature/payment
feature/customer-dashboard
feature/owner-dashboard
feature/admin-dashboard
feature/ai-recommendation
```

---

## 40.1 Commit Convention

Use:

```text
feat: add booking creation
fix: prevent overlapping bookings
refactor: simplify place service
style: update place card spacing
test: add booking service tests
docs: update API documentation
chore: update dependencies
```

---

# 41. TASK EXECUTION RULE

Before implementing a task:

1. Read PRD.md
2. Read ARCHITECTURE.md
3. Read DATABASE.md if database-related
4. Read API.md if API-related
5. Read UI_GUIDELINES.md if UI-related
6. Check existing implementation
7. Identify dependencies
8. Implement smallest complete change
9. Test the change
10. Update TASKS.md

---

# 42. AGENTIC AI RULES

When using an Agentic AI coding tool:

The agent must not:

```text
rewrite the entire project unnecessarily
change architecture without approval
replace existing libraries without reason
delete working features
invent API endpoints
invent database tables
invent business rules
invent payment states
invent availability
ignore UI_GUIDELINES.md
ignore existing code patterns
```

The agent should:

```text
inspect first
understand existing structure
make incremental changes
reuse existing components
follow documentation
test after changes
report changed files
report remaining issues
```

---

# 43. FEATURE COMPLETION CHECKLIST

A feature is not considered DONE until:

[ ] Backend implemented

[ ] Database implemented if required

[ ] API implemented

[ ] Frontend implemented

[ ] Loading state implemented

[ ] Empty state implemented

[ ] Error state implemented

[ ] Validation implemented

[ ] Authorization implemented

[ ] Responsive layout implemented

[ ] Accessibility checked

[ ] Tests added

[ ] Existing features still work

[ ] Documentation updated

[ ] TASKS.md updated

---

# 44. BOOKING FEATURE DEFINITION OF DONE

Booking is DONE only when:

[ ] Customer can select place

[ ] Customer can select date

[ ] Customer can select time

[ ] Customer can select duration

[ ] Backend calculates price

[ ] Backend validates availability

[ ] Backend prevents overlapping booking

[ ] Booking record is created

[ ] Payment can be created

[ ] Payment webhook works

[ ] Payment status is synchronized

[ ] Booking status is synchronized

[ ] Confirmation page works

[ ] Customer can see booking history

[ ] Owner can see booking

[ ] Cancellation works

[ ] Edge cases are tested

---

# 45. PAYMENT FEATURE DEFINITION OF DONE

Payment is DONE only when:

[ ] Transaction can be created

[ ] Payment provider integration works

[ ] Payment status is stored

[ ] Webhook is verified

[ ] Duplicate webhook is safe

[ ] Failed payment is handled

[ ] Successful payment is handled

[ ] Booking status is updated correctly

[ ] Frontend cannot fake successful payment

[ ] Retry flow works where applicable

[ ] Production credentials are secured

---

# 46. UI FEATURE DEFINITION OF DONE

Every UI feature is DONE only when:

[ ] Matches UI_GUIDELINES.md

[ ] Matches Stitch reference when applicable

[ ] Desktop works

[ ] Tablet works

[ ] Mobile works

[ ] Loading state works

[ ] Empty state works

[ ] Error state works

[ ] Disabled state works

[ ] Keyboard accessible

[ ] No console errors

[ ] No unnecessary animations

[ ] No layout overflow

---

# 47. CURRENT DEVELOPMENT TARGET

Current target:

```text
Complete project documentation
        ↓
TASKS.md
        ↓
AGENTS.md
        ↓
Repository setup
        ↓
Backend foundation
        ↓
Database
        ↓
Authentication
        ↓
Frontend foundation
        ↓
UI implementation
        ↓
Core booking flow
```

---

# 48. CURRENT STATUS

Documentation:

[x] PRD.md

[x] ARCHITECTURE.md

[x] DATABASE.md

[x] API.md

[x] UI_GUIDELINES.md

[x] TASKS.md

[x] AGENTS.md

Development:

[x] Repository setup (local & structure)

[ ] Frontend setup

[x] Backend setup (foundation & server)

[x] Database setup (connection & pool)

[x] Authentication

[x] Place management

[x] Search

[ ] Availability

[ ] Booking

[ ] Payment

[ ] Customer dashboard

[ ] Owner dashboard

[ ] Admin dashboard

[ ] Reviews

[ ] Notifications

[ ] AI

[ ] Testing

[ ] Deployment

---

# 49. Definition of Project Success

RentSpace dianggap berhasil apabila pengguna dapat melakukan proses berikut tanpa bantuan manual:

```text
Open RentSpace
      ↓
Search for a place
      ↓
Filter results
      ↓
Open place detail
      ↓
Check availability
      ↓
Choose date & time
      ↓
See accurate price
      ↓
Book
      ↓
Pay
      ↓
Receive confirmation
      ↓
View booking history
      ↓
Complete booking
      ↓
Leave review
```

Owner dapat:

```text
Login
  ↓
Create place
  ↓
Set price
  ↓
Set operating hours
  ↓
Manage availability
  ↓
Receive bookings
  ↓
Manage bookings
  ↓
Track revenue
```

Admin dapat:

```text
Login
  ↓
Monitor platform
  ↓
Manage users
  ↓
Manage owners
  ↓
Manage places
  ↓
Monitor bookings
  ↓
Moderate reviews/reports
  ↓
View analytics
```

---

# 50. Final Development Rule

RentSpace harus dikembangkan sebagai production-style project, bukan sekadar prototype UI.

Prioritas utama:

```text
Correctness
>
Security
>
Data consistency
>
User experience
>
Performance
>
Visual polish
>
Advanced features
```

Core booking flow harus selalu menjadi prioritas.

Jangan menambahkan kompleksitas hanya agar project terlihat besar.

Setiap fitur harus memiliki alasan bisnis yang jelas, implementasi yang aman, UI yang konsisten, dan testing yang sesuai.

AI merupakan fitur tambahan.

AI tidak boleh menggantikan business logic utama RentSpace.

Database adalah source of truth untuk:

```text
users
places
availability
bookings
payments
reviews
```

Backend adalah source of truth untuk:

```text
authorization
pricing
availability validation
booking validation
payment verification
business rules
```

Frontend bertanggung jawab untuk:

```text
presentation
interaction
form input
loading state
error state
user feedback
```

---

# 51. FINAL CHECK

Sebelum memulai coding:

[ ] PRD.md tersedia

[ ] ARCHITECTURE.md tersedia

[ ] DATABASE.md tersedia

[ ] API.md tersedia

[ ] UI_GUIDELINES.md tersedia

[x] TASKS.md tersedia

[ ] AGENTS.md tersedia

[ ] Google Stitch design reference tersedia

[ ] Git repository siap

[ ] Development environment siap

Setelah semua checklist di atas terpenuhi, development RentSpace dapat dimulai dari:

```text
PHASE 1 - PROJECT & ENVIRONMENT SETU
```

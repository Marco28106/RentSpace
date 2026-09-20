# RentSpace UI Guidelines

## 1. Document Purpose

This document is the official UI/UX design system and frontend implementation guideline for RentSpace.

RentSpace is a premium web platform for discovering, comparing, and booking physical spaces such as:

- Futsal courts
- Badminton courts
- Basketball courts
- Photo studios
- Music studios
- Meeting rooms
- Coworking spaces
- Classrooms
- Event venues
- Creative spaces

This document defines the visual identity, layout system, reusable components, interaction patterns, responsive behavior, accessibility requirements, and frontend implementation rules for the entire RentSpace application.

The purpose of this document is to ensure that all RentSpace pages feel like part of one consistent product.

This document must be followed when creating or modifying:

- Public pages
- Authentication pages
- Explore pages
- Venue detail pages
- Booking pages
- Payment pages
- Customer dashboard
- Owner dashboard
- Admin dashboard
- Forms
- Modals
- Tables
- Cards
- Navigation
- Notifications
- Reusable UI components

The existing Google Stitch designs are the primary visual reference for the RentSpace visual direction.

Current Stitch reference screens include:

- Homepage
- Explore / Search Results

Future pages must extend the visual language established by these screens.

---

# 2. Design Philosophy

## 2.1 Core Principle

> Luxurious through restraint.

RentSpace should look premium because of:

- Typography
- Spacing
- Photography
- Alignment
- Visual hierarchy
- Consistency
- Simplicity
- Attention to detail

Premium design must not depend on:

- Excessive gradients
- Neon colors
- Heavy shadows
- Excessive animations
- Excessive glassmorphism
- Excessive rounded cards
- Oversized typography
- Visual clutter

---

## 2.2 Desired Product Personality

The RentSpace interface should feel:

- Elegant
- Premium
- Modern
- Calm
- Professional
- Trustworthy
- Comfortable
- Spacious
- Practical
- Easy to understand

The interface should feel closer to a premium hospitality, architecture, lifestyle, and booking platform than a generic SaaS dashboard.

---

## 2.3 Design Priorities

When making UI decisions, use this priority:

1. Usability
2. Consistency
3. Readability
4. Accessibility
5. Visual hierarchy
6. Brand identity
7. Decoration

Never sacrifice usability for decoration.

---

# 3. Brand Identity

## 3.1 Brand Name

The official product name is:

RentSpace

Use this capitalization in visible UI.

Do not use:

- Rentspace
- Rent Space
- RENTSPACE
- rentspace

unless technically required for URLs, variables, package names, database identifiers, or file names.

---

## 3.2 Brand Personality

RentSpace communicates:

- Trust
- Quality
- Convenience
- Discovery
- Professionalism
- Modern lifestyle
- Premium experiences

The interface should communicate confidence without feeling inaccessible or overly luxurious.

---

# 4. Visual Identity

The current RentSpace visual identity is based on:

- Warm off-white backgrounds
- Deep forest green primary color
- Charcoal typography
- Warm gray secondary surfaces
- Thin neutral borders
- Subtle shadows
- Premium venue photography
- Clean modern typography
- Generous whitespace
- Minimal iconography
- Moderate border radius
- Strong visual hierarchy

The interface should remain visually calm even when displaying a large amount of information.

Avoid visual noise.

---

# 5. Design Tokens

Design tokens should be centralized.

Do not scatter arbitrary visual values throughout components.

The design system should centralize:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Breakpoints
- Transitions
- Container widths
- Z-index levels

If CSS variables are used, define the core tokens globally.

If Tailwind CSS is used, map these values into the Tailwind theme when practical.

---

# 6. Color System

## 6.1 Primary Color

RentSpace primary brand color:

```text
#063C2F
````

Primary dark:

```text
#042E25
```

Primary hover:

```text
#075342
```

Primary soft:

```text
#E8F0ED
```

Use primary green for:

* Primary buttons
* Active navigation
* Selected filters
* Selected categories
* Important links
* Booking actions
* Confirmation actions
* Selected states
* Important brand accents

Do not use primary green on every component.

Primary green should guide attention.

---

## 6.2 Background Colors

Main application background:

```text
#FAF9F6
```

Secondary background:

```text
#F4F3EF
```

Card background:

```text
#FFFFFF
```

Footer background:

```text
#F3F2EE
```

The application should feel warm rather than cold.

Avoid using pure white as the main application background.

---

## 6.3 Text Colors

Primary text:

```text
#111512
```

Secondary text:

```text
#555A56
```

Muted text:

```text
#777C78
```

Disabled text:

```text
#A3A6A3
```

Use primary text for:

* Page titles
* Venue names
* Important prices
* Main information

Use secondary text for:

* Descriptions
* Supporting information
* Metadata

Use muted text for:

* Timestamps
* Captions
* Secondary metadata

---

## 6.4 Border Colors

Primary border:

```text
#E4E2DD
```

Secondary border:

```text
#ECEAE5
```

Borders should remain subtle.

Do not use thick borders unless they communicate an important state.

---

## 6.5 Accent Color

A muted champagne/gold accent may be used sparingly.

Recommended:

```text
#A58A54
```

Use primarily for:

* Rating stars
* Premium indicators
* Small decorative accents
* Quality indicators

Do not use gold for primary buttons.

Do not use gold as a dominant page color.

---

## 6.6 Semantic Colors

Success:

```text
#2F6B55
```

Warning:

```text
#A67C32
```

Error:

```text
#A34B45
```

Information:

```text
#536B72
```

Semantic colors should remain muted.

Avoid neon semantic colors.

---

# 7. Typography

## 7.1 Typography Direction

Typography should feel:

* Modern
* Refined
* Clean
* Professional
* Slightly editorial
* Highly readable

Do not use:

* Futuristic fonts
* Playful display fonts
* Extremely condensed fonts
* Excessive font combinations

Prefer one primary font family throughout the application.

---

## 7.2 Font Family

Use a modern sans-serif font that supports:

* Latin characters
* Indonesian text
* Numbers
* Currency
* UI labels

The exact font may be selected during implementation, but it must preserve the Stitch visual style.

---

## 7.3 Heading Scale

Desktop:

```text
H1: 40–56px
H2: 28–36px
H3: 20–24px
H4: 16–20px
```

Mobile:

```text
H1: 32–40px
H2: 24–30px
H3: 20–22px
H4: 16–18px
```

Recommended heading weight:

```text
500–700
```

Do not make every heading extremely bold.

---

## 7.4 Body Typography

Standard body:

```text
14–16px
```

Small text:

```text
12–13px
```

Caption:

```text
11–12px
```

Important UI labels should generally not be smaller than 12px.

---

## 7.5 Line Height

Recommended:

```text
Headings:
1.1–1.25

Body:
1.5–1.7

Small text:
1.4–1.5
```

---

# 8. Spacing System

Use a consistent spacing scale.

Recommended:

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
```

General usage:

```text
4px  = very small spacing
8px  = icon/text spacing
12px = compact spacing
16px = standard spacing
20px = medium spacing
24px = component spacing
32px = section spacing
40px = large component spacing
48px = major section spacing
64px = large section spacing
80px = hero/major section spacing
96px = large page separation
```

Avoid arbitrary spacing values unless required to match an approved design.

---

# 9. Border Radius

RentSpace uses moderate rounding.

Recommended:

```text
Small controls:
6–8px

Buttons:
6–10px

Inputs:
8–10px

Cards:
10–14px

Large containers:
12–16px
```

Pill-shaped components should primarily be used for:

* Tags
* Status badges
* Compact filters
* Small metadata labels

Do not make every card completely pill-shaped.

---

# 10. Shadows

Use shadows sparingly.

Preferred shadow characteristics:

* Soft
* Low opacity
* Large blur
* Low visual weight

Cards should primarily rely on:

* Background contrast
* Borders
* Spacing

Do not give every component a shadow.

---

# 11. Layout System

## 11.1 Container

Recommended maximum content width:

```text
1200–1440px
```

The exact width may vary depending on the page.

Content should remain centered.

Avoid allowing important content to touch the viewport edges on desktop.

Recommended horizontal padding:

```text
Desktop:
32–40px

Tablet:
24–32px

Mobile:
16–20px
```

---

## 11.2 Grid

Explore page:

```text
Desktop:
3 columns

Tablet:
2 columns

Mobile:
1 column
```

Use CSS Grid or Tailwind Grid.

Prefer responsive layouts such as:

```text
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
```

when appropriate.

Do not hardcode fixed widths that cause horizontal overflow.

---

# 12. Navigation

The RentSpace navbar should remain minimal.

Desktop navigation may contain:

```text
RentSpace
Explore
Categories
How It Works
Favorites
Notifications
Become an Owner
Profile
```

The logo should remain visually prominent without becoming oversized.

---

## 12.1 Navigation States

Default:

* Dark text
* Transparent or warm background

Active:

* Dark text
* Subtle underline or active indicator
* Optional primary green accent

Hover:

* Primary green or darker text

Avoid:

* Large colored navigation backgrounds
* Excessive dropdowns
* Giant CTA buttons
* Excessive navigation icons

---

# 13. Mobile Navigation

Mobile navigation should be simplified.

Possible structure:

```text
Logo
Search
Profile / Menu
```

or a compact bottom navigation for customer workflows.

Important actions should remain accessible:

* Explore
* Favorites
* Bookings
* Notifications
* Profile

Do not attempt to fit the entire desktop navigation into mobile.

---

# 14. Footer

The footer should maintain the visual structure established by the Stitch designs.

Recommended groups:

```text
RentSpace

Discover Spaces
Futsal & Athletic
Daylight Studios
Coworking Lofts
Private Events

Company
About
Careers
Press & Stories
Architectural Monograph

Hosts
List Your Space
Owner Dashboard
Insurance Guarantee
Community Guidelines

Support
Help Center
Trust & Safety
Cancellation Terms
Concierge Desk
```

Footer characteristics:

* Warm gray background
* Small readable typography
* Clear columns
* Generous spacing
* Thin separators
* Minimal decoration

---

# 15. Button System

## 15.1 Primary Button

Primary button:

```text
Background: #063C2F
Text: #FFFFFF
```

Use for:

* Search Spaces
* Reserve
* Continue to Payment
* Pay Now
* Apply Filters
* Save Changes
* List Your Space

---

## 15.2 Secondary Button

Secondary button:

```text
Background: #FFFFFF
Text: #111512
Border: #E4E2DD
```

Use for:

* View Details
* Open Map
* Cancel
* Back
* Secondary actions

---

## 15.3 Ghost Button

Ghost buttons should use:

```text
Transparent background
Dark text
Minimal or no border
```

Use for low-priority actions.

---

## 15.4 Destructive Button

Use destructive styling for:

* Cancel Booking
* Delete Space
* Delete Image
* Delete Account

Use muted error styling.

Do not make destructive buttons visually dominant unless necessary.

---

# 16. Button Dimensions

Recommended:

```text
Small:
32–36px height

Default:
40–44px height

Large:
48–52px height
```

Buttons should have comfortable horizontal padding.

Interactive touch targets should generally be approximately:

```text
44 × 44px
```

---

# 17. Button States

Every interactive button should support:

* Default
* Hover
* Focus
* Active
* Disabled
* Loading

Loading buttons should:

* Prevent duplicate submissions
* Show a subtle spinner or loading indicator
* Preserve their width

Example:

```text
Pay Now
```

becomes:

```text
Processing...
```

without causing major layout shifts.

---

# 18. Form Inputs

Inputs should be:

* Clean
* White or warm neutral
* Moderately rounded
* Thin bordered
* Clearly labeled

Recommended height:

```text
40–48px
```

Labels should remain visible.

Do not rely only on placeholders.

---

# 19. Input States

Inputs should support:

* Default
* Hover
* Focus
* Filled
* Error
* Disabled
* Read-only

Focus state should use the primary green subtly.

Do not use extremely thick outlines.

---

# 20. Selects

Select controls should follow the same visual language as inputs.

Examples:

* Category
* Location
* Sort By
* Duration
* Payment Method

Maintain consistent:

* Height
* Radius
* Border
* Typography
* Icons

---

# 21. Checkbox

Checkboxes should be:

* Simple
* Clear
* Accessible
* Consistent

Checked state:

```text
Deep forest green
White checkmark
```

Unchecked state:

```text
White or neutral surface
Neutral border
```

Do not use color alone to communicate the selected state.

---

# 22. Search Bar

Search is one of the most important RentSpace components.

Possible fields:

```text
What are you looking for?
Location
Date
Time
Duration
```

Primary CTA:

```text
Search Spaces
```

Search controls should have strong hierarchy while remaining visually calm.

---

# 23. Explore Page

The Explore page should allow users to quickly discover and compare venues.

Recommended structure:

```text
Navbar

Search Area

Page Header

Filter Sidebar
+
Venue Results

Pagination

Footer
```

Desktop:

```text
Filter Sidebar | Venue Grid
```

Mobile:

```text
Search
Filter Button
Sort Button
Venue List
```

---

# 24. Filter Sidebar

Possible filter groups:

```text
Instant Book
Superhost Venue

Venue Category

Price Range

Distance Radius

Minimum Rating

Facilities & Gear
```

Filter panel should use:

* White background
* Subtle border
* Moderate radius
* Minimal shadow

Avoid excessive visual decoration.

---

# 25. Filter Behavior

Filters should support:

* Multiple selections
* Clear all
* Apply filters
* Selected state
* Mobile drawer/sheet

Desktop:

```text
Persistent sidebar
```

Mobile:

```text
Filter button
↓
Drawer / bottom sheet
```

Do not force the desktop filter sidebar onto mobile.

---

# 26. Venue Card

Venue cards are one of the most important reusable components in RentSpace.

Standard structure:

```text
Venue Image
Badge
Favorite Button
Location / Distance
Category
Rating
Venue Name
Short Description
Price
Reserve Action
```

Example content:

```text
INSTANT BOOK

Kemang · 1.4 km

DAYLIGHT PHOTO STUDIO
★ 4.98 (94)

Lumina Daylight Loft

Double-height glass frontage,
south-facing daylight with blackout...

Rp 350.000 / hr

Reserve →
```

The exact content can vary by venue.

---

# 27. Venue Card Image

Venue images should be visually prominent.

Preferred aspect ratio:

```text
4:3
```

or another ratio consistent with the approved Stitch design.

Images must:

* Cover the image container
* Maintain aspect ratio
* Use object-fit cover
* Have consistent dimensions
* Avoid distortion

---

# 28. Venue Card Favorite

Favorite button should be positioned over the image.

Use a heart icon.

States:

```text
Not saved:
Outline heart

Saved:
Filled heart
```

Do not use oversized heart icons.

Icon-only favorite buttons must have accessible labels.

---

# 29. Venue Card Price

Price should be visually prominent.

Example:

```text
Rp 350.000 / hr
```

The price should use strong typography.

The `/ hr` portion may use smaller or muted typography.

---

# 30. Currency Formatting

All RentSpace prices use Indonesian Rupiah.

Preferred:

```text
Rp 150.000
Rp 350.000
Rp 1.500.000
```

Avoid:

```text
150000 IDR
IDR 150000
Rp150000
```

unless technically required.

Currency formatting must remain consistent across:

* Venue cards
* Venue detail
* Booking
* Payment
* Customer dashboard
* Owner dashboard
* Admin dashboard

---

# 31. Venue Badges

Possible badges:

```text
Instant Book
Verified Host
Superhost Venue
FIBA Parquet
Executive Grade
BWF Standard
```

Badges should be:

* Small
* Informative
* Restrained
* Easy to scan

Avoid bright multicolor badges.

---

# 32. Rating Component

Standard format:

```text
★ 4.98 (94)
```

Use a subtle champagne/gold accent for the star.

Rating must not visually overpower the venue name.

---

# 33. Category Cards

Homepage category cards may include:

```text
Futsal Courts
Badminton
Basketball
Photo Studios
Meeting Suites
Coworking
Classrooms
Events & Gala
```

Default state:

* White or warm neutral background
* Dark text
* Subtle border

Selected state:

* Deep forest green
* White text

Use simple outline icons.

---

# 34. Place Detail Page

The Place Detail page should provide enough information for users to make a confident booking decision.

Recommended structure:

```text
Navbar

Breadcrumb

Image Gallery

Venue Header

Rating
Location
Verification

Description

Facilities

Highlights

Operating Hours

Venue Rules

Reviews

Location / Map

Booking Panel
```

---

# 35. Place Detail Gallery

The gallery should prioritize high-quality venue photography.

Possible layout:

```text
Large primary image
+
Secondary images
```

Gallery may support:

* Image preview
* Multiple images
* Fullscreen/lightbox
* Responsive layout

Do not overwhelm the user with controls.

---

# 36. Place Detail Booking Panel

Desktop:

```text
Sticky booking panel on the right
```

The booking panel should include:

```text
Date
Time
Duration
Price per hour
Total
Reserve
```

The booking CTA must remain visually prominent.

---

# 37. Availability UI

Availability should be easy to understand.

Recommended flow:

```text
Date
↓
Available Time Slots
↓
Duration
↓
Price
```

Unavailable slots must appear disabled.

Never visually guarantee availability that has not been confirmed by the backend.

---

# 38. Availability States

Supported UI states:

```text
Available
Selected
Unavailable
Past
Loading
Error
```

Selected:

```text
Primary green
```

Unavailable:

```text
Muted
Disabled
```

Do not communicate availability using color alone.

---

# 39. Booking Flow

The standard booking flow is:

```text
Select Date & Time
        ↓
Review Booking
        ↓
Payment
        ↓
Confirmation
```

Each step should clearly communicate the current stage.

Do not add unnecessary steps.

---

# 40. Booking Review

The booking review page should include:

```text
Venue Summary
Date
Time
Duration
Customer Information
Booking Notes
Price Breakdown
Cancellation Policy
Continue to Payment
```

Users must be able to verify all important booking information before payment.

---

# 41. Booking Summary

Example:

```text
Urban Arena Futsal

Oct 24, 2025
18:00 – 20:00
2 hours

Rp 150.000 / hour

Total
Rp 300.000
```

The total price must be visually emphasized.

---

# 42. Payment Page

Payment should feel trustworthy and minimal.

Include:

```text
Booking Summary

Venue
Date
Time
Duration
Total Amount

Payment Method

QRIS
Bank Transfer
E-Wallet
Credit / Debit Card

Secure Payment Indicator

Pay Now
```

Do not add unnecessary marketing content during checkout.

---

# 43. Payment Method Selection

Payment methods should have:

* Clear labels
* Familiar icons where available
* Selected state
* Disabled state
* Accessible controls

Selected payment method should use the primary green.

---

# 44. Confirmation Page

Successful booking should display:

```text
Booking Confirmed

Booking Reference

Venue
Date
Time
Duration
Total Payment

QR / Booking Code

View Booking
Back to Explore
```

The confirmation page should feel reassuring.

Avoid excessive celebration animations.

---

# 45. Booking Status

Backend booking statuses:

```text
PENDING
CONFIRMED
COMPLETED
CANCELLED
EXPIRED
```

Display human-readable labels:

```text
Pending
Confirmed
Completed
Cancelled
Expired
```

Only display actions that are valid for the current booking state.

---

# 46. Payment Status

Backend payment statuses:

```text
UNPAID
PENDING
PAID
FAILED
REFUNDED
```

Display human-readable labels in the UI.

---

# 47. Status Badges

Status badges should be compact.

Examples:

```text
Confirmed
Paid
Pending
Cancelled
Expired
```

Use semantic colors carefully.

Do not create completely different badge designs on different pages.

---

# 48. Customer Dashboard

The Customer Dashboard should prioritize:

```text
Upcoming Bookings
Recent Bookings
Saved Spaces
Notifications
Profile
```

The dashboard should not look like an enterprise financial dashboard.

Venue imagery and booking context should remain visible.

---

# 49. Booking History

Booking history should support:

```text
Upcoming
Completed
Cancelled
```

Each booking item should include:

```text
Venue Image
Venue Name
Category
Date
Time
Duration
Payment Status
Booking Status
View Details
```

---

# 50. Booking Detail

Booking detail should display:

```text
Booking Status
Booking Reference
Venue
Date
Time
Duration
Payment Information
Total Price
Booking QR Code
Venue Address
Cancellation Policy
Contact Venue
Cancel Booking
Review
```

Only show actions that are valid for the booking state.

---

# 51. Favorites

Favorites page title:

```text
Saved Spaces
```

Use the same VenueCard component used by Explore.

Possible actions:

```text
Remove Favorite
View Details
Reserve
```

Empty state:

```text
No saved spaces yet.

Save venues you like and they will appear here.

Explore Spaces
```

---

# 52. Notifications

Notifications may include:

```text
Booking confirmed
Payment successful
Booking reminder
Booking cancelled
Review reminder
Venue updates
```

Each notification should contain:

```text
Title
Description
Timestamp
Read / unread state
```

Unread state should be visually noticeable but subtle.

---

# 53. Profile Page

Profile sections:

```text
Profile Information
Account Settings
Notification Preferences
Payment Preferences
Security
Logout
```

Use the same form components throughout the application.

---

# 54. Owner Interface

Owner functionality includes:

```text
Dashboard
My Spaces
Add Space
Edit Space
Pricing
Availability
Bookings
Revenue
Analytics
Reviews
Notifications
```

Owner pages must use the same RentSpace visual identity.

Do not use a generic admin dashboard template.

---

# 55. Owner Dashboard

The Owner Dashboard should prioritize:

```text
Total Revenue
Bookings
Upcoming Bookings
Occupancy
Popular Spaces
Recent Activity
```

Metric cards should remain visually simple.

Do not create metric cards merely to fill empty space.

---

# 56. Owner Place Management

Owners can:

```text
Create Space
Edit Space
Delete Space
Upload Images
Manage Facilities
Manage Pricing
Manage Operating Hours
Manage Availability
```

Complex forms should be grouped into logical sections.

---

# 57. Owner Booking Management

Desktop may use a table.

Recommended columns:

```text
Booking
Customer
Date
Time
Duration
Amount
Status
Action
```

On mobile, transform rows into cards.

Do not force wide tables onto mobile.

---

# 58. Owner Analytics

Possible metrics:

```text
Revenue
Bookings
Occupancy
Popular Spaces
Peak Booking Times
```

Charts should be:

* Simple
* Readable
* Consistent
* Minimal

Avoid excessive colors.

---

# 59. Admin Interface

Admin functionality includes:

```text
Dashboard
Users
Owners
Places
Bookings
Reviews
Reports
Analytics
```

Admin UI may contain more information than customer pages but must maintain the same visual identity.

---

# 60. Admin Tables

Admin tables should support:

* Search
* Filtering
* Sorting
* Pagination
* Row actions
* Status badges

Tables should remain readable.

Avoid excessive borders.

---

# 61. Forms

Forms should be grouped logically.

Example:

```text
Basic Information

Venue Name
Category
Description

Location

Address
City
District

Pricing

Price
Operating Hours

Facilities

Facilities Selection

Images

Image Upload
```

Avoid putting every field into one huge unstructured form.

---

# 62. Form Validation

Validation messages should be:

* Clear
* Specific
* Human-readable
* Positioned near the relevant field

Bad:

```text
Invalid input
```

Good:

```text
Please enter a valid venue name.
```

Do not expose raw backend validation errors to normal users.

---

# 63. Loading States

Data-heavy pages should use skeleton loading where appropriate.

Venue card skeleton should preserve the actual card structure:

```text
Image Skeleton
Text Skeleton
Metadata Skeleton
Price Skeleton
Button Skeleton
```

Avoid using a full-screen spinner for small operations.

---

# 64. Empty States

Every empty state should explain:

1. What is empty
2. Why it may be empty
3. What the user can do next

Example:

```text
No upcoming bookings.

You don't have any upcoming reservations yet.

Explore Spaces
```

---

# 65. Error States

Errors should be clear and actionable.

Example:

```text
Unable to load this venue.

Please try again.

Try Again
```

Booking error:

```text
This time slot is no longer available.

Please choose another time.

Choose Another Time
```

Do not expose technical error messages.

---

# 66. Toast Notifications

Toast messages should be concise.

Examples:

```text
Space saved.
Booking cancelled.
Profile updated.
Payment successful.
```

Do not use paragraphs inside toast notifications.

---

# 67. Modal

Use modals for:

* Confirmation
* Delete actions
* Important decisions
* Short forms

Do not use modals for entire pages.

For mobile, use a Sheet or bottom drawer when appropriate.

---

# 68. Drawer and Sheet

Use drawers or sheets for:

* Mobile filters
* Navigation
* Secondary details
* Short controls

They should be:

* Easy to close
* Keyboard accessible
* Responsive
* Visually consistent

---

# 69. Accessibility

Every UI must follow accessibility best practices.

Requirements:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Sufficient color contrast
* Proper labels
* Appropriate alt text
* Accessible buttons
* Accessible form controls
* Screen-reader-friendly structure

Do not rely solely on color.

---

# 70. Touch Targets

Interactive elements should have sufficiently large touch areas.

Target approximately:

```text
44 × 44px minimum
```

Icons may visually be smaller while their clickable containers remain large enough.

---

# 71. Image Guidelines

Venue imagery is a major part of the RentSpace experience.

Images should feel:

* Realistic
* Premium
* Architectural
* Well-lit
* Professional
* Relevant

Preferred imagery includes:

* Sports courts
* Studios
* Meeting rooms
* Coworking spaces
* Event venues
* Creative spaces
* Classrooms

Avoid:

* Low-quality stock imagery
* Irrelevant imagery
* Distorted imagery
* Inconsistent photography styles
* Excessively artificial imagery

---

# 72. Image Implementation

Use:

```css
object-fit: cover;
```

for venue card images unless the design specifically requires another behavior.

When using Next.js, prefer:

```text
next/image
```

where appropriate.

Images should define appropriate dimensions or aspect ratios to reduce layout shifts.

---

# 73. Image Accessibility

Meaningful venue images must have descriptive alt text.

Example:

```text
Urban Arena Futsal indoor court
```

Do not use generic alt text such as:

```text
image
photo
picture
```

Decorative images may use empty alt text when appropriate.

---

# 74. Responsive Design

RentSpace must support:

* Desktop
* Tablet
* Mobile

Desktop is the primary visual reference, but responsive layouts must be intentionally designed.

Do not simply shrink desktop layouts.

---

# 75. Recommended Breakpoints

Use Tailwind standard breakpoints where practical:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Do not create custom breakpoints unless necessary.

---

# 76. Mobile Layout Rules

On mobile:

* Reduce horizontal padding
* Stack columns
* Collapse filters
* Simplify navigation
* Reduce heading sizes
* Keep primary CTA accessible
* Avoid horizontal overflow
* Convert tables into cards
* Keep images readable

---

# 77. Explore Mobile

Desktop:

```text
Filter Sidebar | Venue Grid
```

Mobile:

```text
Search
Filter Button
Sort Button
Venue List
```

The filter sidebar becomes a:

```text
Sheet / Drawer
```

---

# 78. Booking Mobile

Booking CTA should remain easy to access.

Possible implementation:

```text
Sticky bottom booking action
```

Ensure it does not cover important content.

---

# 79. Tables on Mobile

Tables should not cause unnecessary horizontal overflow.

Preferred transformation:

```text
Desktop:
Table

Mobile:
Card List
```

Each card must preserve important information and actions.

---

# 80. Animation

Animations should be subtle.

Recommended duration:

```text
150–250ms
```

Use animation for:

* Hover
* Focus
* Dropdowns
* Modals
* Drawers
* Toasts
* Loading

Avoid:

* Bouncing
* Excessive parallax
* Large page transitions
* Constant motion
* Decorative animation everywhere

---

# 81. Hover Effects

Recommended hover behavior:

* Slight background change
* Slight border change
* Small elevation change
* Text color change
* Subtle image transition

Do not dramatically scale cards.

---

# 82. Focus States

All interactive elements must have visible focus states.

Focus states should be:

* Clear
* Accessible
* Consistent
* Subtle

Never remove focus indicators without replacing them with an accessible alternative.

---

# 83. Dark Mode

Dark mode is not part of the initial RentSpace MVP.

Do not automatically introduce dark mode.

The initial product should follow the light warm visual identity established by the Stitch designs.

If dark mode is introduced later, it must be designed as a complete design system rather than simply inverting the colors.

---

# 84. Tailwind CSS Rules

The frontend uses Tailwind CSS.

Prefer utility classes and centralized theme configuration.

Prefer standard classes such as:

```text
p-4
p-6
gap-4
rounded-lg
text-sm
```

over arbitrary values such as:

```text
p-[17px]
gap-[13px]
rounded-[11px]
```

unless an exact approved design value requires them.

---

# 85. Tailwind Color Rules

Do not repeatedly hardcode brand colors throughout components.

Prefer centralized design tokens such as:

```text
bg-primary
text-primary
border-border
bg-background
bg-card
text-muted-foreground
```

The exact implementation may use CSS variables or Tailwind theme configuration.

---

# 86. shadcn/ui Rules

shadcn/ui may be used for foundational components such as:

* Button
* Input
* Dialog
* Dropdown Menu
* Select
* Checkbox
* Tabs
* Toast
* Tooltip
* Sheet
* Calendar
* Popover

However, default shadcn/ui styling must be customized to match RentSpace.

Do not blindly use default shadcn/ui styles.

All shadcn components must visually belong to RentSpace.

---

# 87. Component Reuse

Reuse existing components whenever possible.

Before creating a new component:

1. Search the existing component library.
2. Determine whether an existing component can solve the requirement.
3. Extend the existing component if appropriate.
4. Create a new component only when necessary.

Do not create duplicate components with slightly different styles.

---

# 88. Recommended Shared Components

The project should eventually contain reusable components such as:

```text
Navbar
Footer
Button
Input
Select
Checkbox
SearchBar
VenueCard
VenueGrid
VenueGallery
VenueBadge
Rating
FilterPanel
Pagination
DatePicker
TimePicker
BookingPanel
BookingSummary
PaymentMethod
StatusBadge
ReviewCard
NotificationItem
Modal
Drawer
Toast
EmptyState
LoadingState
ErrorState
```

---

# 89. Component Naming

Use descriptive names.

Good:

```text
VenueCard
BookingSummary
SearchBar
FilterPanel
OwnerStatCard
ReviewCard
NotificationItem
```

Bad:

```text
Card2
Box
Thing
ComponentNew
CustomBox
TestCard
```

---

# 90. Component Responsibility

Each component should have a clear responsibility.

Avoid giant components that contain:

* Data fetching
* Business logic
* Form logic
* Styling
* Multiple unrelated sections

Break large interfaces into logical reusable components.

---

# 91. Page Responsibility

Pages should primarily compose reusable components.

Preferred architecture:

```text
Page
 ├── Navbar
 ├── SearchBar
 ├── VenueGrid
 │    └── VenueCard
 ├── Pagination
 └── Footer
```

Avoid putting an entire page into one massive component.

---

# 92. Data and UI Separation

Reusable UI components should not contain unnecessary backend logic.

Prefer:

```text
API / Hook
      ↓
Page
      ↓
UI Component
```

Avoid placing large API calls directly inside visual components unless there is a clear reason.

---

# 93. Next.js Server and Client Components

When using Next.js:

Prefer Server Components by default.

Use Client Components only when required for:

* React state
* Browser APIs
* Interactive controls
* Event handlers
* Client-side forms
* Client-side interaction

Do not add:

```text
"use client"
```

unnecessarily.

---

# 94. Loading Architecture

Every asynchronous page should consider:

```text
Loading
Success
Empty
Error
```

Do not design only the successful state.

---

# 95. Error Architecture

Errors should be handled at appropriate levels:

```text
Field Error
Component Error
Page Error
Network Error
Booking Conflict
Payment Failure
```

User-facing messages must remain understandable.

---

# 96. Booking Conflict UI

If another user books the selected time slot before confirmation:

```text
This time slot is no longer available.

Please choose another time.
```

Provide:

```text
Choose Another Time
```

Do not silently change the selected time.

---

# 97. Payment Failure UI

If payment fails:

```text
Payment could not be completed.

Your booking has not been confirmed.

Try Again
```

Never imply that payment succeeded when it did not.

---

# 98. Confirmation UI

Only display:

```text
Booking Confirmed
```

after the backend confirms the booking according to the actual booking and payment state.

Never show a successful booking state merely because the frontend request was submitted.

---

# 99. Content Guidelines

RentSpace copy should be:

* Clear
* Short
* Human
* Professional
* Confident
* Useful

Avoid:

* Overly corporate language
* Excessive marketing language
* Generic AI wording
* Unnecessary technical terminology

---

# 100. Preferred Copy Style

Preferred:

```text
Find the right space for every plan.
```

Preferred:

```text
Discover and book trusted spaces for sports, work, creativity, and events.
```

Preferred:

```text
Search Spaces
```

Avoid:

```text
Unlock the ultimate next-generation spatial booking ecosystem.
```

---

# 101. Button Copy

Use concise labels.

Preferred:

```text
Reserve
Search Spaces
Update Search
View Details
Apply Filters
Continue to Payment
Pay Now
Cancel Booking
View Booking
Save Space
List Your Space
```

Avoid unnecessarily long button labels.

---

# 102. Date Formatting

Use human-friendly dates.

Example:

```text
Oct 24, 2025
```

or an appropriate Indonesian localized format when localization is enabled.

Never expose raw ISO timestamps to normal users.

---

# 103. Time Formatting

Use:

```text
18:00
20:00
18:00 – 20:00
```

Avoid exposing raw timestamps.

---

# 104. Distance Formatting

Examples:

```text
1.4 km
3.2 km
Within 5 km
```

Keep distance information concise.

---

# 105. Location Display

Venue cards may show:

```text
Kemang · 1.4 km
Jakarta Barat · 3.2 km
Menteng · 4.3 km
```

Use neighborhood and city context when useful.

Do not overcrowd cards with full addresses.

---

# 106. Search Result Information Hierarchy

Venue cards should prioritize:

1. Image
2. Venue name
3. Category
4. Rating
5. Location
6. Description
7. Price
8. Reserve action

Users should understand the venue quickly.

---

# 107. Homepage Hero

The hero should communicate the product immediately.

Primary headline:

```text
Find the right space for every plan.
```

Supporting text:

```text
Discover and book trusted spaces for sports, work, creativity, and events.
```

The search interface should be visually connected to the hero.

Avoid excessive decorative elements.

---

# 108. Homepage Structure

Recommended structure:

```text
Navbar

Hero
Search

Browse by Space Type

Curated Premium Spaces

Spaces Near You

Why RentSpace

CTA

Footer
```

Sections should be separated primarily through whitespace.

---

# 109. Homepage CTA

Possible CTA:

```text
Your next space is closer than you think.
```

Actions:

```text
Explore All Spaces
List Your Venue
```

Maintain the deep green visual treatment established by Stitch.

---

# 110. Why RentSpace Section

Possible benefits:

```text
Easy Discovery
Real-Time Availability
Secure Booking
Trusted Reviews
```

Each benefit may contain:

* Simple icon
* Short title
* Short description

Do not use excessive illustrations.

---

# 111. Map UI

Map sections may support:

* Venue location
* Nearby venues
* Distance
* Directions

The map should not visually overpower venue information.

CTA:

```text
Open Map View
```

---

# 112. Review UI

Review cards should contain:

```text
User
Rating
Date
Review Text
```

Keep review content readable.

Do not make ratings excessively large.

---

# 113. Review Submission

Review submission should be simple.

Fields:

```text
Rating
Review
```

Only allow review submission when business rules permit it.

---

# 114. Profile Avatar

Profile avatars should:

* Be circular
* Have consistent dimensions
* Use fallback initials when no image exists
* Avoid excessive decorative borders

Recommended desktop navbar size:

```text
32–40px
```

---

# 115. Icon System

Use one consistent icon library.

Recommended:

```text
Lucide Icons
```

Icons should generally use:

* Outline style
* Consistent stroke width
* Similar visual weight

Do not mix unrelated icon libraries without a clear reason.

---

# 116. Icon Usage

Icons should communicate meaning.

Examples:

```text
Search → Search
Heart → Favorite
Bell → Notification
Map Pin → Location
Calendar → Date
Clock → Time
Filter → Filters
Star → Rating
```

Do not use icons purely as decoration when they create visual noise.

---

# 117. Accessible Icons

Icon-only buttons must have accessible labels.

Example:

```html
aria-label="Save venue"
```

Do not create icon-only interactive elements without an accessible name.

---

# 118. Z-Index

Use a centralized z-index scale.

Recommended conceptual hierarchy:

```text
Base Content
Dropdown
Sticky Elements
Modal
Toast
```

Avoid arbitrary huge values such as:

```text
z-[99999]
```

unless absolutely necessary.

---

# 119. Sticky Elements

Sticky UI may be used for:

* Booking panel
* Navbar
* Mobile booking CTA
* Filter controls

Sticky elements must not cover important content.

---

# 120. Scroll Behavior

Avoid unexpected scroll locking.

When using:

* Modal
* Drawer
* Sheet

ensure background scrolling is handled correctly.

---

# 121. Performance

UI implementation should avoid unnecessary performance problems.

Prefer:

* Optimized images
* Server Components where appropriate
* Pagination
* Efficient lists
* Reusable components
* Minimal client-side JavaScript

Do not load large client-side dependencies unnecessarily.

---

# 122. Venue Image Performance

Venue images should be optimized.

When using Next.js:

```text
next/image
```

should be preferred where appropriate.

Images should define dimensions or aspect ratios to reduce layout shifts.

---

# 123. Dashboard Card Rules

Dashboard cards should only exist when they provide useful information.

Good:

```text
Total Revenue
Rp 12.500.000
```

Bad:

```text
Random Metric
98%

Another Metric
42

Another Metric
7
```

Do not create metric cards simply to fill empty space.

---

# 124. Chart Rules

Charts should answer a specific question.

Examples:

```text
How much revenue was generated?
How many bookings were made?
What are the busiest hours?
Which spaces perform best?
```

Avoid charts that exist only for decoration.

---

# 125. Data Density

Customer interfaces should remain lightweight.

Owner and Admin interfaces may contain more data.

However:

> More data does not mean more visual clutter.

Use:

* Grouping
* Tabs
* Filters
* Pagination
* Sections
* Clear hierarchy

---

# 126. Page Header

Standard page header may contain:

```text
Eyebrow / Category
Page Title
Supporting Description
Primary Action
```

Example:

```text
MY BOOKINGS

Your Bookings

Manage your upcoming and previous reservations.
```

Do not overcomplicate page headers.

---

# 127. Breadcrumb

Use breadcrumbs on deeper pages when useful.

Example:

```text
Explore
/
Futsal
/
Urban Arena Futsal
```

Breadcrumbs should remain subtle.

---

# 128. Divider

Use dividers sparingly.

Preferred:

```text
1px neutral border
```

Whitespace should often replace dividers.

---

# 129. Card Rules

Cards should group related information.

Use cards for:

* Venues
* Booking summaries
* Metrics
* Reviews
* Payment methods
* Settings sections

Do not put every small piece of information into a separate card.

---

# 130. Avoid Card Overuse

Bad:

```text
Card
  Card
    Card
      Card
```

Good:

```text
Page
 ├── Section
 │    ├── Card
 │    ├── Card
 │    └── Card
```

Use hierarchy instead of excessive nested containers.

---

# 131. Visual Hierarchy

Every page must have:

```text
Primary action
Secondary actions
Primary information
Supporting information
```

Users should immediately understand what they can do.

---

# 132. CTA Hierarchy

Each page should generally have one dominant primary action.

Examples:

Homepage:

```text
Search Spaces
```

Place Detail:

```text
Reserve
```

Booking:

```text
Continue to Payment
```

Payment:

```text
Pay Now
```

Confirmation:

```text
View Booking
```

Avoid multiple competing primary buttons.

---

# 133. Navigation Hierarchy

Navigation should never overpower the page content.

The navbar should be visually lighter than:

* Hero headline
* Venue names
* Booking CTA

---

# 134. Visual Noise Rule

If a page feels visually crowded, first remove:

1. Unnecessary borders
2. Unnecessary icons
3. Unnecessary colors
4. Unnecessary cards
5. Unnecessary text
6. Unnecessary animation

Do not solve clutter by shrinking everything.

---

# 135. Premium Design Rule

Premium does not mean:

```text
More gradients
More gold
More shadows
More animation
More rounded corners
```

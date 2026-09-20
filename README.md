# RentSpace

RentSpace adalah platform web modern untuk mencari, membandingkan, dan melakukan booking berbagai jenis tempat (futsal, badminton, basketball, photo studio, music studio, meeting room, coworking space, event venue) secara online dan real-time.

---

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Go, Gin Web Framework, GORM
- **Database**: PostgreSQL 18
- **Authentication**: JWT & Google OAuth
- **Payment**: Midtrans

---

## Project Structure

```text
RentSpace/
├── AGENTS.md             # AI Agent development rules and constraints
├── PRD.md                # Product Requirements Document
├── ARCHITECTURE.md       # Modular monolith architecture specifications
├── DATABASE.md           # PostgreSQL schema & database rules
├── API.md                # RESTful API specifications
├── UI_GUIDELINES.md      # UI & design system rules
├── TASKS.md              # Project roadmap & development task checklist
├── docs/
│   └── designs/          # UI wireframes & visual designs
├── backend/              # Go backend (Gin, GORM, PostgreSQL)
└── frontend/             # Next.js frontend
```

---

## Getting Started

### Prerequisites

- [Go](https://go.dev/) (>= 1.22)
- [Node.js](https://nodejs.org/) (>= 20) & npm
- [PostgreSQL](https://www.postgresql.org/) (>= 15)

### Backend Setup

1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Salin environment configuration:
   ```bash
   copy .env.example .env
   ```
3. Sesuaikan konfigurasi database di file `.env`.
4. Jalankan backend:
   ```bash
   go run .
   ```
   API akan berjalan di `http://localhost:8080`.

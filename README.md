# SmilePro Dental — Clinic Management & Booking Website

A modern, full-featured dental clinic website with an online appointment booking system, a comprehensive admin dashboard, real-time slot management, and review moderation. Built for dental clinics that need both a beautiful public-facing website and a powerful back-office to manage patients, appointments, services, and revenue.

> **Live Demo:** [https://dental-demo1.lovable.app](https://dental-demo1.lovable.app)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Public Website](#public-website)
  - [Admin Dashboard](#admin-dashboard)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Routes & Pages](#routes--pages)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Admin Authentication](#admin-authentication)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

SmilePro Dental is a production-ready dental clinic web application that connects patients to your practice through a sleek, responsive website. Patients can browse services, meet the doctors, read verified reviews, and book appointments online. Clinic staff manage everything through a secure admin dashboard with role-based access control.

The app uses **Lovable Cloud** (powered by Supabase) for its backend — providing authentication, PostgreSQL database, real-time subscriptions, and Row-Level Security out of the box.

---

## Features

### Public Website

| Feature | Description |
|---------|-------------|
| **Hero Section** | Animated landing with clinic branding, call-to-action buttons, and a "Closed Today" holiday banner |
| **Services Overview** | Dynamic service catalog fetched from the database (no hardcoded services) |
| **Why Choose Us** | Trust-building section highlighting clinic strengths |
| **Featured Doctors** | Auto-synced doctor profiles managed from the admin panel |
| **Real Patient Reviews** | Live testimonials pulled from approved reviews in the database |
| **Online Booking** | Multi-step booking form with calendar, time-slot picker, and real-time availability |
| **Holiday Awareness** | Blocked dates show tooltips with reasons; homepage shows a "Closed Today" banner if applicable |
| **No Prices Shown** | Patient-facing UI intentionally hides prices; booking is always action-first |
| **Responsive Design** | Fully mobile-optimized with a sticky, blur-backed navbar |
| **Multi-language Ready** | All UI text is in English; easy to extend for other languages |

### Admin Dashboard

| Section | Capabilities |
|---------|-------------|
| **Overview** | Stats cards (total, pending, confirmed, cancelled appointments), quick-action cards |
| **Appointments** | Search, filter by status/date, grouped by Today/Tomorrow/This Week/Past/Upcoming, update status, delete, copy phone, download PDF invoice, send via email/WhatsApp, export CSV |
| **Calendar** | Visual month view showing all appointments and closed/holiday days |
| **Patients** | Auto-built patient directory from appointments; view visit history per patient |
| **Doctors** | Full CRUD for doctor profiles (name, specialization, experience, bio, photo) — synced to public site |
| **Services** | Manage service names, descriptions, prices (internal), durations, sort order, active/hidden toggle |
| **Revenue** | Earnings summary based on current service prices and appointment volumes |
| **Holidays** | Block any date with a reason; patients cannot book on blocked days; tooltips show the reason |
| **Reviews** | Moderation queue — approve or reject patient reviews before they appear on the homepage |
| **Settings** | Clinic name, address, phone, email, working hours, slot duration, and logo URL |

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript 5, Vite 5 |
| **Styling** | Tailwind CSS 3, shadcn/ui components |
| **State & Data** | TanStack Query (React Query), Supabase Client |
| **Backend** | Lovable Cloud (Supabase) — PostgreSQL, Auth, Realtime, Row-Level Security |
| **Charts** | Recharts |
| **PDF Generation** | jsPDF |
| **Date Handling** | date-fns |
| **Icons** | Lucide React |
| **Testing** | Vitest, Playwright |

---

## Project Structure

```
├── public/                  # Static assets (robots.txt, placeholder.svg)
├── src/
│   ├── App.tsx              # Root router with all routes
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles + Tailwind + design tokens
│   ├── pages/               # Route-level page components
│   │   ├── Index.tsx        # Homepage
│   │   ├── Services.tsx     # Full services listing
│   │   ├── Doctors.tsx      # All doctors page
│   │   ├── Reviews.tsx      # Leave a review page
│   │   ├── BookAppointment.tsx   # Online booking form
│   │   ├── AdminLogin.tsx   # Admin auth login
│   │   ├── AdminDashboard.tsx    # Admin panel shell
│   │   └── NotFound.tsx     # 404 page
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── FeaturedDoctors.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── Footer.tsx
│   │   ├── ClosedTodayBanner.tsx
│   │   └── admin/           # Admin-only sub-components
│   │       ├── AdminAppointments.tsx
│   │       ├── AdminCalendar.tsx
│   │       ├── AdminDoctors.tsx
│   │       ├── AdminHolidays.tsx
│   │       ├── AdminPatients.tsx
│   │       ├── AdminRevenue.tsx
│   │       ├── AdminReviews.tsx
│   │       ├── AdminServices.tsx
│   │       ├── AdminSettings.tsx
│   │       └── AdminAnalytics.tsx
│   ├── components/ui/       # shadcn/ui primitives (Button, Card, Dialog, Table, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions (utils.ts, csvExport.ts)
│   └── integrations/supabase/
│       ├── client.ts        # Supabase client singleton
│       └── types.ts         # Auto-generated DB types
├── supabase/
│   └── migrations/          # SQL migration files
│   └── config.toml          # Supabase project config
├── tailwind.config.ts
├── vite.config.ts
├── package.json
└── README.md
```

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `appointments` | Patient bookings: name, phone, email, service, doctor, date, time_slot, status (pending/confirmed/completed/cancelled) |
| `clinic_settings` | Single-row config: clinic name, address, phone, email, opening/closing times, slot duration, logo URL |
| `doctors` | Doctor profiles: name, specialization, qualifications, experience, bio, image_url |
| `holidays` | Blocked dates with reason; prevents booking on these days |
| `reviews` | Patient reviews: name, rating (1-5), comment, approved (boolean) |
| `services` | Dental services: name, description, price, duration_minutes, active, sort_order |
| `user_roles` | Role-based access: links auth.users to roles (`admin`, `user`) |

### Enums

- `app_role`: `admin`, `user`

### Functions

- `has_role(user_id, role)` — Security definer function for RLS policies to check user roles without recursion.

### Row-Level Security (RLS)

All tables have RLS enabled:
- `appointments` — Authenticated users can manage; admins have full access
- `services`, `doctors`, `holidays`, `reviews` — Public read for active items; admin CRUD
- `clinic_settings` — Public read; admin update
- `user_roles` — Read for authenticated users; full access for service role

---

## Routes & Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Homepage | Public |
| `/services` | Services Listing | Public |
| `/doctors` | Doctors Listing | Public |
| `/reviews` | Write a Review | Public |
| `/book` | Book Appointment | Public |
| `/admin/login` | Admin Login | Public (protected redirect if logged in) |
| `/admin` | Admin Dashboard | Admin only (role check) |
| `*` | 404 Not Found | Public |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

The app runs at `http://localhost:8080` by default.

### Build for Production

```bash
bun run build
```

### Run Tests

```bash
bun run test        # Unit tests (Vitest)
bun run test:watch  # Watch mode
```

---

## Environment Variables

The project uses Vite environment variables. These are automatically injected by Lovable Cloud:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public anon key for Supabase client |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |

> **Note:** The `.env` file is auto-managed by Lovable Cloud. Do not edit it manually.

---

## Admin Authentication

1. Navigate to `/admin/login`
2. Sign in with admin credentials
3. The system checks the `user_roles` table for `role = 'admin'`
4. Non-admin users are signed out and redirected back to login

### Setting Up the First Admin

Run this SQL in your Lovable Cloud database (or via migration):

```sql
-- After creating the user through Supabase Auth
INSERT INTO public.user_roles (user_id, role)
VALUES ('<ADMIN_USER_UUID>', 'admin');
```

---

## Deployment

This project is built with Vite and deploys seamlessly on **Lovable**.

1. Push your changes
2. Lovable automatically builds and deploys
3. Visit your published URL

The project is also compatible with Vercel, Netlify, or any static hosting that supports SPA routing (ensure fallback to `index.html`).

---

## Key Design Decisions

- **No prices on the public site** — The booking flow is designed to drive action first; prices are managed internally in the admin panel and shown on PDF invoices.
- **Auto-generated time slots** — Slot times are calculated dynamically from `clinic_settings.opening_time`, `closing_time`, and `slot_duration_minutes`. Changing clinic hours instantly updates the booking calendar.
- **Real-time slot protection** — When a patient picks a date, the app subscribes to Supabase Realtime to instantly hide slots that just got booked by another patient (race-condition guard on submit too).
- **Holiday tooltip system** — Blocked dates show the reason on hover in both the admin calendar and the patient booking calendar.
- **Closed Today banner** — Automatically appears on the homepage if today's date exists in the `holidays` table.

---

## License

This project was built with ❤️ on [Lovable](https://lovable.dev). Feel free to customize and deploy for your own clinic.

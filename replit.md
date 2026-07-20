# SureFund Financial Services — Platform

**Funding Dreams. Building Futures.**
Lucknow, Uttar Pradesh, India | info@surefund.in

## Project Overview

A full loan-DSA (Direct Selling Agent) platform built with Next.js 15/16:

- **Public marketing site** — home, product pages (personal loan, business loan, credit card), EMI calculator, blog, contact, legal pages
- **Customer portal** — OTP (SMS) login, profile, loan applications dashboard, status timeline, notifications
- **Multi-step application wizard** — 5-step wizard with document upload (Cloudinary)
- **Admin dashboard** — lead management, status updates, notes, follow-up reminders, Excel export, CIBIL request tracking

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack), TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Database**: MongoDB via Mongoose
- **Auth**: JWT in httpOnly cookies (admin + customer sessions)
- **OTP**: Twilio Verify (SMS)
- **File storage**: Cloudinary (PAN / Aadhaar uploads)
- **Email**: Nodemailer (SMTP)

## How to Run

The app starts automatically via the **Start application** workflow:

```
npm run dev -- -p 5000
```

Runs on **port 5000**.

## Environment Variables

Copy `.env.example` for the full list. Key secrets to configure for full functionality:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret (use a long random string) |
| `CLOUDINARY_*` | Cloudinary cloud name, API key, API secret |
| `TWILIO_*` | Twilio Account SID, Auth Token, Verify Service SID |
| `SMTP_*` | SMTP host/port/user/pass for email notifications |

Currently running with **stub values** — the UI and static pages work, but database queries, OTP login, document uploads, and email notifications require real credentials.

## Seeding the Admin Account

```bash
npx tsx scripts/seedAdmin.ts
```

Requires `MONGODB_URI` and `ADMIN_EMAIL` / `ADMIN_DEFAULT_PASSWORD` to be set.

## Key Routes

| Path | Description |
|---|---|
| `/` | Public homepage |
| `/apply/[productType]` | 5-step loan application wizard |
| `/portal/login` | Customer OTP login |
| `/portal/applications` | Customer applications dashboard |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |
| `/admin/leads` | Lead management |

## User Preferences

_None recorded yet._

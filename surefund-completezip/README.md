# SureFund Financial Services — Platform

**Funding Dreams. Building Futures.**
Lucknow, Uttar Pradesh, India | info@surefund.in | +91 1234567890

A complete loan-DSA platform: public marketing site, customer portal with SMS OTP
login, a multi-step loan application wizard, and a protected admin dashboard for
lead and application management.

---

## Phase 1 — Backbone

- **Models** (`/models`): Admin, Customer, Lead, LoanApplication, CibilRequest, Notification
- **Auth** (`/lib/auth.ts`): JWT signing/verification for admin + customer sessions via httpOnly cookies
- **OTP** (`/lib/otp.ts`): Twilio Verify integration (swap for MSG91/2Factor for an India-first provider)
- **Email** (`/lib/email.ts`): Nodemailer notifications to `info@surefund.in` on new leads/applications/CIBIL requests/contact form
- **Cloudinary** (`/lib/cloudinary.ts`): PAN/Aadhaar upload with format + 5MB size validation
- **Qualification engine** (`/lib/qualification.ts`): implements the exact eligibility rules specified
- **Core API routes**: OTP send/verify, admin login, leads CRUD, CIBIL requests, applications

## Phase 2 — Admin Dashboard

- **Route protection**: `middleware.ts` (edge redirect) + `lib/requireAdmin.ts` (real JWT check per page)
- **Dashboard**: metric cards, recent leads, upcoming follow-up reminders
- **Leads list**: search, status/product filters, pagination, Excel export
- **Lead detail**: status update, notes, follow-up reminders, document viewer, delete
- **Excel export**: `app/api/leads/export/route.ts` respects the active search/filters
- Fully responsive — sidebar collapses into a mobile drawer

## Phase 3 — Customer Portal, Application Wizard & Public Site

### Customer Portal (`/portal`)
- **OTP login** (`app/portal/(auth)/login`): mobile → OTP → verify, via existing `/api/auth/otp/*`
- **Route protection**: `middleware.ts` now also guards `/portal/*`; `lib/requireCustomer.ts` verifies the session server-side on every page
- **Profile** (`/portal/profile`): view/edit name, email, DOB, city, PAN (mobile is the fixed login ID)
- **Application dashboard** (`/portal/applications`): all of a customer's applications with status
- **Application detail + timeline** (`/portal/applications/[id]`): visual status pipeline (`StatusTimeline`), document viewer, additional-document upload
- **Notifications center** (`/portal/notifications`): list + mark-as-read, populated automatically whenever an admin changes a lead's status (see `notifications` creation in `app/api/leads/[id]/route.ts`)

New/updated API routes:
- `GET/PATCH /api/customer/me` — profile
- `GET /api/notifications`, `PATCH /api/notifications/[id]` — notifications
- `GET /api/applications/[id]` — single application (owner or admin)
- `POST /api/applications/[id]/documents` — additional document upload
- `POST /api/leads` now attaches the logged-in customer automatically
- `PATCH /api/leads/[id]` now creates a `Notification` when status changes

### Multi-Step Loan Application (`/apply/[productType]`)
Slugs: `personal-loan`, `business-loan`, `credit-card` (`lib/productSlug.ts`).

1. **Personal Details** — name, mobile, email, DOB, city, PAN
2. **Employment Details** — adapts to Business Details (business name/age/turnover) for Business Loan
3. **Loan Details** — amount (relabeled "Credit Limit" for Credit Card), CIBIL, existing EMI/loan
4. **Document Upload** — PAN + Aadhaar, client-validated (PDF/JPG/PNG, 5MB)
5. **Review & Submit** — full summary, then calls `POST /api/leads` → `POST /api/applications`

Progress for steps 1-3 auto-saves to `localStorage` per product (`lib/applyFormStorage.ts`) so a refresh doesn't lose typed data; files are never persisted to storage and must be re-selected after a hard refresh. On submit, the draft is cleared and the user lands on `/apply/success` with a reference ID.

### Public Site (`(public)` route group — adds `Navbar`/`Footer`)
- `/` — home (Hero, product cards, bank marquee, stats, free CIBIL check)
- `/about` — company story and values
- `/personal-loan`, `/business-loan`, `/credit-card` — product pages via shared `ProductPageTemplate`, each showing the exact eligibility rules specified
- `/emi-calculator` — interactive client-side EMI calculator
- `/faq` — accordion (`FaqAccordion`)
- `/blog`, `/blog/[slug]` — static content source in `lib/blogData.ts` (swap for a real CMS later)
- `/contact` — working contact form → `POST /api/contact` → email to `info@surefund.in`
- `/privacy-policy`, `/terms-conditions`, `/disclaimer` — legal pages via `LegalPageLayout`

---

## Setup

```bash
npm install
cp .env.example .env.local   # fill in real MongoDB/Cloudinary/Twilio/SMTP values
npx tsx scripts/seedAdmin.ts # creates the one admin account
npm run dev
```

- Public site: `http://localhost:3000/`
- Customer portal: `http://localhost:3000/portal/login`
- Admin dashboard: `http://localhost:3000/admin/login` (credentials from `seedAdmin.ts`)

## Notes on third-party services

- **OTP**: Twilio Verify is wired in `lib/otp.ts`. India-specific alternatives (MSG91,
  2Factor, Kaleyra) work fine too — only that file needs to change.
- **CIBIL bureau data**: no aggregator offers score lookups without a signed data-use
  agreement, so `fetchCibilScore()` in `app/api/cibil/route.ts` is a documented
  integration point, not a live score. The flow still captures the lead and consent
  correctly and notifies your team to follow up manually.
- **Blog**: currently static (`lib/blogData.ts`). Swap for a headless CMS (Sanity,
  Contentful) or a `BlogPost` Mongo collection when ready — the page components
  won't need structural changes.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import into Vercel, set all variables from `.env.example` in Project Settings → Environment Variables.
3. Point `MONGODB_URI` at your Atlas cluster (whitelist `0.0.0.0/0` or Vercel's IPs).
4. Deploy — Next.js API routes run as serverless functions automatically.

---

## Final Project Tree

```
surefund/
├── .env.example
├── README.md
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts
├── scripts/
│   └── seedAdmin.ts
├── models/
│   ├── Admin.ts
│   ├── CibilRequest.ts
│   ├── Customer.ts
│   ├── Lead.ts
│   ├── LoanApplication.ts
│   └── Notification.ts
├── lib/
│   ├── applyFormStorage.ts
│   ├── auth.ts
│   ├── blogData.ts
│   ├── cloudinary.ts
│   ├── constants.ts
│   ├── email.ts
│   ├── format.ts
│   ├── mongodb.ts
│   ├── otp.ts
│   ├── productSlug.ts
│   ├── qualification.ts
│   ├── requireAdmin.ts
│   └── requireCustomer.ts
├── components/
│   ├── Hero.tsx, ProductCards.tsx, TrustAndStats.tsx, CibilCheckForm.tsx
│   ├── admin/    (AdminShell, Sidebar, MetricCard, Badges, LeadFilters,
│   │              StatusUpdateForm, NotesSection, ReminderForm,
│   │              DocumentViewer, DeleteLeadButton)
│   ├── portal/   (PortalShell, PortalSidebar, OtpLoginForm, ProfileForm,
│   │              StatusTimeline, NotificationItem, AdditionalDocumentUpload)
│   ├── apply/    (ProgressBar, StepPersonalDetails, StepEmploymentDetails,
│   │              StepLoanDetails, StepDocumentUpload, StepReview)
│   └── site/     (Navbar, Footer, ProductPageTemplate, FaqAccordion,
│                  ContactForm, LegalPageLayout)
└── app/
    ├── layout.tsx, globals.css
    ├── (public)/            → "/", about, personal-loan, business-loan,
    │                          credit-card, emi-calculator, faq, blog,
    │                          blog/[slug], contact, privacy-policy,
    │                          terms-conditions, disclaimer  (+ layout w/ Navbar/Footer)
    ├── apply/
    │   ├── layout.tsx
    │   ├── [productType]/page.tsx      → 5-step wizard
    │   └── success/page.tsx
    ├── admin/
    │   ├── page.tsx                    → redirect to dashboard
    │   ├── (auth)/login/page.tsx
    │   └── (dashboard)/                → layout (guard), dashboard, leads, leads/[id]
    ├── portal/
    │   ├── page.tsx                    → redirect to applications
    │   ├── (auth)/login/page.tsx
    │   └── (dashboard)/                → layout (guard), profile, applications,
    │                                      applications/[id], notifications
    └── api/
        ├── admin/login, admin/logout
        ├── auth/otp/send, auth/otp/verify, auth/logout
        ├── customer/me
        ├── leads, leads/[id], leads/export
        ├── applications, applications/[id], applications/[id]/documents
        ├── cibil
        ├── notifications, notifications/[id]
        └── contact
```

## Not yet built

- Shadcn UI component wiring / toast notifications (currently plain Tailwind + inline state)
- Real CIBIL bureau integration (pending a signed data-partner agreement)
- CMS-backed blog (currently static array)
- Automated tests

Ask for any of these next and they'll be built the same way — real, working code, not stubs.

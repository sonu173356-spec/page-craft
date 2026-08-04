# Page Craft — Premium Book Publishing Platform

> Your Story, Professionally Published

A full-stack, production-quality website for **Page Craft**, a premium self-publishing platform that helps authors publish, distribute, and market their books worldwide.

---

## 🚀 Features

### Public Website
- **30+ Pages** — Home, About, Services, Bookstore, Blog, Careers, and more
- **Premium Design** — Elegant, modern UI with Framer Motion animations
- **Responsive** — Pixel-perfect across desktop, tablet, and mobile
- **SEO Optimized** — Metadata, Open Graph, Twitter Cards, JSON-LD, Sitemap
- **Accessible** — ARIA labels, keyboard navigation, semantic HTML

### Bookstore
- Search, filter by category/genre/price, sort
- Book detail pages with reviews and ratings
- Shopping cart, wishlist, checkout flow
- Mock payment integration

### Authentication
- Login, Register, Forgot/Reset Password
- Email & OTP Verification UI
- Role-based access (Admin, Author, Customer)
- JWT with refresh token architecture

### Author Dashboard
- Book management (upload, edit, track status)
- Sales analytics with charts
- Royalty tracking
- Messages & notifications

### Admin Dashboard
- Full analytics overview
- Books, Authors, Orders, Users management
- Blog, Coupons, Reviews moderation
- Newsletter & Support ticket management
- Role management

### Backend API
- RESTful API with versioned routes (`/api/v1/`)
- Repository pattern for database abstraction
- JWT authentication & role-based authorization
- Request validation (Zod), rate limiting, logging
- Mock data — database-ready architecture

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS v3 |
| **Animations** | Framer Motion |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js, TypeScript |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Validation** | Zod |
| **Logging** | Winston |
| **Security** | Helmet, CORS, express-rate-limit |

---

## 📁 Project Structure

```
the-page-craft/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   │   ├── (main)/     # Public pages
│   │   │   ├── (auth)/     # Auth pages
│   │   │   └── (dashboard)/ # Dashboard pages
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Constants & utilities
│   │   ├── services/       # API service layer
│   │   ├── store/          # Zustand stores
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets
├── server/                 # Express Backend
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── routes/v1/      # API routes
│       ├── middleware/      # Auth, validation, etc.
│       ├── services/       # Business logic
│       ├── repositories/   # Data access layer
│       ├── data/           # Mock JSON data
│       └── interfaces/     # TypeScript interfaces
├── database/               # Migration scripts (future)
└── docs/                   # Documentation
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/the-page-craft.git
cd the-page-craft

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Environment Setup

```bash
# Frontend
cp client/.env.example client/.env.local

# Backend
cp server/.env.example server/.env
```

### Running Development Servers

```bash
# Terminal 1 — Frontend (http://localhost:3000)
cd client
npm run dev

# Terminal 2 — Backend (http://localhost:5000)
cd server
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/login` | User login | — |
| POST | `/api/v1/auth/register` | User registration | — |
| POST | `/api/v1/auth/refresh` | Refresh token | — |
| GET | `/api/v1/books` | List books (filterable) | — |
| GET | `/api/v1/books/:id` | Book details | — |
| POST | `/api/v1/books` | Create book | Admin/Author |
| PUT | `/api/v1/books/:id` | Update book | Admin/Author |
| DELETE | `/api/v1/books/:id` | Delete book | Admin |
| GET | `/api/v1/authors` | List authors | — |
| GET | `/api/v1/orders` | List orders | Auth |
| POST | `/api/v1/orders` | Create order | Auth |
| GET | `/api/v1/blogs` | List blog posts | — |
| GET | `/api/v1/reviews` | List reviews | — |
| POST | `/api/v1/contact` | Submit contact form | — |
| POST | `/api/v1/newsletter` | Subscribe | — |
| GET | `/api/v1/plans` | Publishing plans | — |
| GET | `/api/v1/faqs` | FAQs | — |

---

## 🗄 Database Integration

The backend uses the **Repository Pattern** for data access. To connect a real database:

1. Create a new repository implementation (e.g., `PostgresBookRepository`)
2. Implement the repository interface (e.g., `IBookRepository`)
3. Update the dependency injection in `services/`
4. No frontend changes needed

See `docs/DATABASE_MIGRATION.md` for detailed instructions.

---

## 📦 Deployment

### Frontend (Vercel)
```bash
cd client
npx vercel deploy
```

### Backend (Railway/Render)
```bash
cd server
npm run build
npm start
```

See `docs/DEPLOYMENT.md` for detailed deployment guides.

---

## 🎨 Brand

| Element | Value |
|---------|-------|
| **Name** | Page Craft |
| **Primary Color** | #8B1A1A (Deep Crimson) |
| **Accent Color** | #C5A55A (Warm Gold) |
| **Heading Font** | Playfair Display |
| **Body Font** | Inter |

---

## 📄 License

© 2024 Page Craft. All rights reserved.

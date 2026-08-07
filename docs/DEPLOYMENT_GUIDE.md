# The Page Craft — Enterprise Deployment Guide

This guide covers local development, database seeding, and production deployment on Vercel and PostgreSQL.

---

## 1. Local Development Setup

1. **Install Dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Prisma Database Setup & Seed**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000/admin/internal-dashboard?menu=Dashboard`

---

## 2. Super Admin Initial Credentials

- **Email**: `admin@thepagecraft.com`
- **Password**: `AdminPass2026!`
- *Note*: Super Admin credentials are stored as a bcrypt hash in the `users` table.

---

## 3. Production Deployment (Vercel + PostgreSQL)

1. **Set Up PostgreSQL Database**:
   - Provision a PostgreSQL instance on Supabase, Neon, or AWS RDS.
   - Obtain the connection string `DATABASE_URL`.

2. **Configure Vercel Environment Variables**:
   In Vercel Dashboard -> Project Settings -> Environment Variables, add:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_DRIVE_PARENT_FOLDER_ID`

3. **Deploy to Vercel**:
   ```bash
   git push origin main
   ```
   or via CLI:
   ```bash
   npx vercel --prod
   ```

# Page Craft — Setup Guide

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| Git | 2.30+ | `git -v` |

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/the-page-craft.git
cd the-page-craft
```

### 2. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

### 3. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server (with hot reload)
npm run dev
```

Backend API will be available at: **http://localhost:5000**

---

## Environment Variables

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Page Craft
```

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000
```

---

## Available Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with hot reload (ts-node-dev) |
| `npm run build` | Compile TypeScript |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@pagecraft.com | password123 |
| Author | test@pagecraft.com | password123 |
| Customer | reader@pagecraft.com | password123 |

---

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Node modules issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check for type errors without building
npx tsc --noEmit
```

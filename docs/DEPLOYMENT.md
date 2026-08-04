# Page Craft — Deployment Guide

## Frontend Deployment (Vercel — Recommended)

### Prerequisites
- Vercel account
- GitHub repository connected

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-org/the-page-craft.git
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Set the **Root Directory** to `client`
- Framework will be auto-detected as Next.js

3. **Environment Variables**
Set in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://api.thepagecraft.com/api/v1
NEXT_PUBLIC_SITE_URL=https://www.thepagecraft.com
```

4. **Deploy**
Vercel will automatically build and deploy on every push.

---

## Backend Deployment

### Option 1: Railway

1. Create account at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Set root directory to `server`
4. Add environment variables
5. Railway auto-detects Node.js

### Option 2: Render

1. Create account at [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Build Command: `cd server && npm install && npm run build`
4. Start Command: `cd server && npm start`
5. Add environment variables

### Option 3: AWS (EC2 + PM2)

```bash
# On EC2 instance
git clone https://github.com/your-org/the-page-craft.git
cd the-page-craft/server
npm install
npm run build

# Install PM2
npm install -g pm2
pm2 start dist/server.js --name pagecraft-api
pm2 save
pm2 startup
```

### Option 4: Docker

```dockerfile
# server/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

```bash
docker build -t pagecraft-api ./server
docker run -p 5000:5000 --env-file ./server/.env pagecraft-api
```

---

## Domain & SSL

1. Purchase domain (e.g., thepagecraft.com)
2. Add to Vercel for frontend (auto-SSL)
3. Configure API subdomain (api.thepagecraft.com)
4. Update CORS origins in backend config

---

## CI/CD

GitHub Actions workflow is recommended for automated testing and deployment.
Create `.github/workflows/deploy.yml` for automated pipelines.

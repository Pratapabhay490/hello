# 🚀 Deployment Guide - TeraBooks Player

This guide covers deploying TeraBooks Player to various platforms.

## Table of Contents

- [Vercel Deployment](#vercel-deployment-recommended)
- [Docker Deployment](#docker-deployment)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Environment Variables](#environment-variables)
- [Production Checklist](#production-checklist)
- [Troubleshooting](#troubleshooting)

---

## Vercel Deployment (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Step 1: Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TeraBooks Player"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/terabooks-player.git
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   JWT_SECRET=your-production-secret-key-here
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

6. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 3: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

---

## Docker Deployment

### Create Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Create docker-compose.yml

```yaml
# docker-compose.yml
version: '3.8'

services:
  terabooks:
    build: .
    ports:
      - "3000:3000"
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    restart: unless-stopped
    networks:
      - terabooks-network

networks:
  terabooks-network:
    driver: bridge
```

### Build and Run

```bash
# Build Docker image
docker build -t terabooks-player .

# Run container
docker run -p 3000:3000 \
  -e JWT_SECRET=your-secret-key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  terabooks-player

# Or use docker-compose
docker-compose up -d
```

### Docker Hub Deployment

```bash
# Tag image
docker tag terabooks-player yourusername/terabooks-player:latest

# Push to Docker Hub
docker push yourusername/terabooks-player:latest

# Pull and run on server
docker pull yourusername/terabooks-player:latest
docker run -d -p 3000:3000 yourusername/terabooks-player:latest
```

---

## Self-Hosted Deployment

### Prerequisites

- Node.js 18+ installed
- Nginx (recommended for reverse proxy)
- PM2 (for process management)
- SSL certificate (Let's Encrypt)

### Step 1: Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 2: Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/terabooks-player.git
cd terabooks-player

# Install dependencies
npm ci

# Create .env.local
nano .env.local
# Add your production environment variables

# Build application
npm run build

# Start with PM2
pm2 start npm --name "terabooks" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Step 3: Configure Nginx

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/terabooks
```

Add configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/terabooks /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (automatically configured)
sudo certbot renew --dry-run
```

---

## Environment Variables

### Required Variables

```bash
# Essential
JWT_SECRET=your-production-secret-key
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional but recommended
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Setting Variables on Vercel

1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add each variable with appropriate environment (Production/Preview/Development)

### Setting Variables on Docker

```bash
# Use .env file
docker run --env-file .env.production terabooks-player

# Or set individually
docker run \
  -e JWT_SECRET=secret \
  -e NEXT_PUBLIC_APP_URL=https://domain.com \
  terabooks-player
```

---

## Production Checklist

### Security

- [ ] Change default JWT_SECRET to strong random value
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Sanitize user inputs
- [ ] Add security headers (Helmet.js)
- [ ] Use environment variables for secrets
- [ ] Enable CSP (Content Security Policy)

### Performance

- [ ] Enable caching headers
- [ ] Optimize images (Next.js Image component)
- [ ] Enable compression (gzip/brotli)
- [ ] Use CDN for static assets
- [ ] Implement lazy loading
- [ ] Monitor bundle size
- [ ] Enable Next.js production optimizations

### Database (When Added)

- [ ] Set up production database
- [ ] Configure connection pooling
- [ ] Enable database backups
- [ ] Set up read replicas (optional)
- [ ] Implement database migrations

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure logging (Winston/Pino)
- [ ] Add analytics (Google Analytics)
- [ ] Monitor uptime (UptimeRobot)
- [ ] Track performance metrics

### Testing

- [ ] Run production build locally
- [ ] Test all features in production mode
- [ ] Verify environment variables
- [ ] Check mobile responsiveness
- [ ] Test video playback on various devices

---

## Troubleshooting

### Build Failures

**Error: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: Out of memory**
```bash
# Increase Node.js memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Issues

**Videos not playing**
- Check CORS headers on video hosting
- Verify video URLs are accessible
- Test with direct video file URLs

**Authentication failing**
- Verify JWT_SECRET is set correctly
- Check token expiration settings
- Ensure cookies are enabled

**Images not loading**
- Configure Next.js Image domains in next.config.ts
- Check image URLs are HTTPS
- Verify CDN configuration

### Performance Issues

**Slow page loads**
```bash
# Analyze bundle
npm run build
# Check .next/analyze output
```

**High memory usage**
- Enable production mode
- Check for memory leaks in components
- Implement proper cleanup in useEffect

### PM2 Issues

```bash
# View logs
pm2 logs terabooks

# Restart application
pm2 restart terabooks

# Monitor
pm2 monit

# Check status
pm2 status
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# View error log
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

---

## Scaling

### Horizontal Scaling

Use a load balancer (Nginx, HAProxy) with multiple instances:

```nginx
upstream terabooks_backend {
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
}

server {
    location / {
        proxy_pass http://terabooks_backend;
    }
}
```

### Caching Strategy

1. **Redis**: For session storage and rate limiting
2. **CDN**: For static assets (Cloudflare, AWS CloudFront)
3. **Edge Caching**: Use Vercel Edge Network or similar

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Support

For deployment issues:
- Check [Next.js Documentation](https://nextjs.org/docs/deployment)
- Visit [Vercel Documentation](https://vercel.com/docs)
- Open an issue in the repository

---

**Happy Deploying! 🚀**

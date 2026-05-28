# 🚀 GitHub Setup Instructions for TeraBooks Player

## Option 1: Create New Repository on GitHub (Recommended)

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `terabooks-player`
   - **Description**: "Netflix-style video streaming platform built with Next.js 15"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to the project
cd /projects/sandbox/terabooks-player

# Add the remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/terabooks-player.git

# Push to GitHub
git push -u origin main
```

**Or if you see an error**, use:
```bash
git branch -M main
git push -u origin main
```

---

## Option 2: Deploy to Vercel Directly (Easiest)

You can deploy directly to Vercel without pushing to GitHub first:

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
cd /projects/sandbox/terabooks-player
vercel
```

Follow the prompts:
- Login with GitHub/GitLab/Email
- Link to existing project or create new one
- Configure settings (use defaults)
- Deploy!

Vercel will give you a live URL immediately: `https://terabooks-player.vercel.app`

---

## Option 3: Use the Files Directly

If you prefer to work locally first:

### Download the project files:

The entire project is located at: `/projects/sandbox/terabooks-player/`

You can:
1. Zip the directory
2. Download to your local machine
3. Open in VS Code
4. Initialize your own git repository
5. Push to GitHub from your local machine

```bash
# On your local machine
cd terabooks-player
git init
git add .
git commit -m "Initial commit: TeraBooks Player"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/terabooks-player.git
git push -u origin main
```

---

## 🌐 Access Your Live Website

### After Pushing to GitHub:

**Vercel (Recommended - Free):**
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"
5. Get your live URL: `https://terabooks-player.vercel.app`

**Netlify:**
1. Go to https://netlify.com
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy!

**Railway:**
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Next.js and deploy

---

## 🔐 Environment Variables

Before deploying, set these in your hosting platform:

### Required:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=https://your-deployed-url.com
```

### Optional:
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## 📱 Access URLs After Deployment

Once deployed, you can access:

- **Homepage**: `https://your-domain.com/`
- **Admin Panel**: `https://your-domain.com/admin`
- **Watch Page**: `https://your-domain.com/watch/1`
- **Search**: `https://your-domain.com/search?q=bunny`
- **Categories**: `https://your-domain.com/categories`
- **Trending**: `https://your-domain.com/trending`
- **My List**: `https://your-domain.com/my-list`

---

## 🔑 Default Admin Credentials

```
Email: admin@terabooks.com
Password: admin123
```

⚠️ **Change these in production!**

---

## 🆘 Troubleshooting

### "Repository not found" error:
- Make sure you created the repository on GitHub
- Check the repository name matches exactly
- Verify you're logged in to the correct GitHub account

### "Permission denied" error:
- Set up SSH keys: https://docs.github.com/en/authentication
- Or use HTTPS with Personal Access Token

### Build fails on Vercel:
- Check environment variables are set
- Ensure `JWT_SECRET` is configured
- View build logs for specific errors

---

## 📞 Need Help?

If you encounter issues:
1. Check the full documentation in `README.md`
2. See deployment guide in `DEPLOYMENT.md`
3. Review build errors carefully
4. Open an issue on GitHub

---

## ✅ Quick Verification

After deployment, test these features:
- [ ] Homepage loads with videos
- [ ] Can play a video
- [ ] Admin panel accessible
- [ ] Search works
- [ ] Mobile responsive

---

## 🎉 You're Done!

Your TeraBooks Player is now live! Share the URL and enjoy your Netflix-style streaming platform.

**Current Project Location**: `/projects/sandbox/terabooks-player/`
**Total Files**: 51 files ready to deploy
**Status**: ✅ Build verified, production ready


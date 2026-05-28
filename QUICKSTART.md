# 🚀 Quick Start Guide - TeraBooks Player

Get TeraBooks Player up and running in 5 minutes!

## Prerequisites

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

## Installation Steps

### 1. Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd terabooks-player

# Or download and extract the ZIP file
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, and Video.js.

### 3. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Open `.env.local` and set your values:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-secret-key-change-this
```

**Important**: Change `JWT_SECRET` to a random secure string for production!

### 4. Start Development Server

```bash
npm run dev
```

The application will start at **http://localhost:3000**

### 5. Access the Application

Open your browser and navigate to:

- **Homepage**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

## Default Credentials

### Admin Account
- **Email**: `admin@terabooks.com`
- **Password**: `admin123`

### User Account
- **Email**: `user@terabooks.com`
- **Password**: `user123`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## First Steps

### 1. Explore the Homepage
- Browse featured videos
- Check out trending content
- Use the search functionality

### 2. Watch a Video
- Click any video card
- Try keyboard shortcuts:
  - `Space` - Play/Pause
  - `F` - Fullscreen
  - `M` - Mute
  - `Arrow keys` - Seek/Volume

### 3. Access Admin Panel
1. Navigate to `/admin`
2. View dashboard statistics
3. Click "Add Video" to add content
4. Fill in the form with video details

### 4. Add Your First Video

**Example Video URLs** (for testing):
```
Title: Sample Video
Description: A test video for the platform
Thumbnail: https://peach.blender.org/wp-content/uploads/title_anouncement.jpg
Video URL: https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
Category: Entertainment
Duration: 596 (seconds)
```

## Project Structure Overview

```
terabooks-player/
├── app/                    # Pages and API routes
│   ├── page.tsx           # Homepage
│   ├── admin/             # Admin panel
│   ├── watch/[id]/        # Video player page
│   └── api/               # Backend API
├── components/            # React components
│   ├── home/              # Homepage components
│   ├── video/             # Video player
│   ├── admin/             # Admin components
│   └── ui/                # Reusable UI components
├── data/                  # Sample data
└── public/                # Static files
```

## Key Features to Try

### 🎥 Video Player
- Multiple playback speeds (0.5x - 2x)
- Quality selection
- Picture-in-Picture mode
- Progress tracking

### 🏠 User Features
- Continue watching
- Search videos
- Browse by category
- View trending videos

### 👨‍💼 Admin Features
- Dashboard with statistics
- Add/edit/delete videos
- Manage categories
- View analytics

## Common Issues

### Port Already in Use

If port 3000 is busy, specify a different port:

```bash
PORT=3001 npm run dev
```

### Module Not Found

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json .next
npm install
```

### Videos Not Playing

Ensure:
1. Video URL is publicly accessible
2. CORS is enabled on video host
3. URL is HTTPS (for secure contexts)

## Next Steps

1. **Customize Theme**: Edit `tailwind.config.js` and `app/globals.css`
2. **Add Your Videos**: Use the admin panel to add content
3. **Configure Database**: Replace sample data with real database
4. **Deploy**: Follow `DEPLOYMENT.md` for production setup

## Learning Resources

- **Next.js**: https://nextjs.org/learn
- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Video.js**: https://docs.videojs.com/

## Getting Help

- **Documentation**: Check `README.md`
- **Issues**: Report bugs on GitHub
- **Deployment**: See `DEPLOYMENT.md`
- **Contributing**: Read `CONTRIBUTING.md`

## Development Tips

### Hot Reload
Changes to files will automatically reload in the browser.

### TypeScript Errors
TypeScript provides type checking. Fix errors for better code quality.

### Component Development
Use React DevTools browser extension for debugging.

### Styling
Tailwind CSS IntelliSense extension for VS Code provides autocomplete.

## What's Included

✅ Modern video player with custom controls  
✅ Admin panel for content management  
✅ User authentication structure  
✅ Responsive design (mobile-friendly)  
✅ Dark theme with glassmorphism  
✅ Search and filtering  
✅ Progress tracking  
✅ 12 sample videos  
✅ 5 categories  
✅ API routes with rate limiting  

## Production Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a secure random string
- [ ] Update `NEXT_PUBLIC_APP_URL` to your domain
- [ ] Replace sample data with real database
- [ ] Enable HTTPS/SSL
- [ ] Configure proper authentication
- [ ] Set up monitoring and logging
- [ ] Optimize images and assets
- [ ] Test on multiple devices

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality

# Git
git add .           # Stage changes
git commit -m "msg" # Commit changes
git push            # Push to remote

# Docker (if using)
docker build -t terabooks .     # Build image
docker run -p 3000:3000 terabooks  # Run container
```

## Support

Need help? Check:
- 📖 Full documentation in `README.md`
- 🚀 Deployment guide in `DEPLOYMENT.md`
- 🤝 Contributing guide in `CONTRIBUTING.md`

---

**Happy Coding! 🎬**

You're now ready to build your own Netflix-style streaming platform!

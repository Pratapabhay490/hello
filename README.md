# 🎬 TeraBooks Player

A modern, Netflix-style video streaming platform built with Next.js 15, React, TypeScript, and Video.js. Features a sleek dark theme with glassmorphism effects, smooth animations, and a comprehensive admin panel.

![TeraBooks Player](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎥 Video Playback
- **Custom Video Player** with Video.js integration
- **Playback Speed Control**: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 1.75x, 2x
- **Quality Selector**: Auto, 360p, 720p, 1080p
- **Keyboard Shortcuts**:
  - `Space` / `K` - Play/Pause
  - `Arrow Left/Right` - Seek backward/forward (10s)
  - `Arrow Up/Down` - Volume control
  - `M` - Mute/Unmute
  - `F` - Fullscreen
  - `P` - Picture-in-Picture
- **Progress Tracking**: Resume playback from where you left off
- **Fullscreen & Picture-in-Picture** support

### 🏠 User Interface
- **Homepage**: Netflix-style hero section with featured videos
- **Video Grid**: Horizontal scrolling rows with hover effects
- **Search**: Real-time video search functionality
- **Categories**: Browse videos by category
- **Trending**: Videos ranked by popularity
- **My List**: 
  - Continue Watching
  - Completed Videos
  - Favorites (coming soon)
- **Responsive Design**: Mobile, tablet, and desktop optimized

### 🎨 Design
- **Dark Theme**: Premium black + blue color scheme
- **Glassmorphism**: Frosted glass effects on UI elements
- **Smooth Animations**: CSS transitions and keyframe animations
- **Card Hover Effects**: Scale and shadow transformations
- **Custom Scrollbar**: Themed scrollbar design
- **Loading States**: Skeleton screens for better UX

### 🔐 Admin Panel
- **Dashboard**: Statistics overview (videos, views, categories)
- **Video Management**: 
  - Add new videos with form validation
  - Edit video metadata
  - Delete videos
  - Search and filter
- **Category Management**: Organize videos by categories
- **Statistics**: View counts, trending analysis

### 🔒 Security
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Server and client-side validation
- **Environment Variables**: Secure configuration management

### 🚀 Performance
- **Next.js 15**: Latest features and optimizations
- **Server Components**: Improved performance
- **Lazy Loading**: Images and components load on demand
- **Optimized Streaming**: CDN-friendly architecture
- **Caching**: Local storage for watch progress

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd terabooks-player
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# JWT Secret (Change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
terabooks-player/
├── app/                      # Next.js 15 App Router
│   ├── admin/               # Admin panel pages
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── categories/     # Category endpoints
│   │   ├── search/         # Search endpoint
│   │   └── videos/         # Video endpoints
│   ├── categories/         # Categories page
│   ├── my-list/            # User's personal list
│   ├── search/             # Search results page
│   ├── trending/           # Trending videos page
│   ├── watch/              # Video player page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── admin/              # Admin-specific components
│   ├── home/               # Homepage components
│   ├── ui/                 # Reusable UI components
│   └── video/              # Video player components
├── hooks/                   # Custom React hooks
├── lib/                     # Library code
│   ├── auth.ts             # Authentication utilities
│   ├── constants.ts        # App constants
│   └── rateLimit.ts        # Rate limiting
├── services/                # API service layer
├── types/                   # TypeScript type definitions
├── utils/                   # Utility functions
│   ├── helpers.ts          # Helper functions
│   ├── storage.ts          # LocalStorage utilities
│   └── validation.ts       # Validation functions
├── data/                    # Sample data
└── public/                  # Static assets
```

## 🎮 Usage

### User Features

1. **Browse Videos**: Explore the homepage with featured and trending videos
2. **Watch Videos**: Click any video to start watching
3. **Search**: Use the search bar in the navbar to find specific videos
4. **Continue Watching**: Your progress is automatically saved
5. **My List**: Access your continue watching and completed videos

### Admin Features

1. **Access Admin Panel**: Navigate to `/admin`
2. **Login Credentials**:
   - **Admin**: admin@terabooks.com / admin123
   - **User**: user@terabooks.com / user123
3. **Add Videos**: Fill out the form with video metadata
4. **Manage Content**: Edit or delete existing videos
5. **View Statistics**: Monitor platform metrics

### Adding Videos

**Supported URL Types:**
- Direct video URLs (MP4, WEBM, OGG)
- TeraBox public links
- HLS streams (.m3u8)
- DASH streams (.mpd)
- Other public video hosting services

**Example:**
```
Title: Big Buck Bunny
Description: A short animated comedy film...
Thumbnail URL: https://example.com/thumbnail.jpg
Video URL: https://example.com/video.mp4
Category: Entertainment
Duration: 596 (seconds)
```

## 🔑 API Routes

### Videos
- `GET /api/videos` - List all videos (with pagination)
- `GET /api/videos/:id` - Get single video
- `POST /api/videos/track-view` - Track video view

### Categories
- `GET /api/categories` - List all categories

### Search
- `GET /api/search?q={query}` - Search videos

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

## 🎨 Customization

### Theming

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: {
    DEFAULT: '#3B82F6',  // Change primary color
    dark: '#1E40AF',
    light: '#60A5FA',
  },
}
```

### Sample Data

Modify `data/sampleData.ts` to add your own videos and categories.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables
- Deploy

3. **Environment Variables** (Set in Vercel Dashboard)
```
JWT_SECRET=your-production-secret-key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Manual Deployment

1. **Build the project**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

3. **Or export static site**
```bash
npm run build
# Then deploy the 'out' directory to any static host
```

### Docker Deployment

```bash
# Build Docker image
docker build -t terabooks-player .

# Run container
docker run -p 3000:3000 -e JWT_SECRET=your-secret terabooks-player
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📦 Built With

- **[Next.js 15](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[Video.js](https://videojs.com/)** - Video player
- **[jose](https://github.com/panva/jose)** - JWT authentication
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

## 🔐 Security Notes

⚠️ **Important for Production:**

1. **Change JWT Secret**: Update `JWT_SECRET` in `.env.local`
2. **Use Real Database**: Replace mock data with actual database
3. **Implement Real Auth**: Use proper authentication service
4. **Add HTTPS**: Enable SSL/TLS certificates
5. **Rate Limiting**: Configure proper rate limits for production
6. **Input Sanitization**: Validate all user inputs
7. **CORS Configuration**: Set appropriate CORS policies

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js 15 and modern web technologies.

## 🎯 Roadmap

- [ ] User authentication with OAuth
- [ ] Video upload functionality
- [ ] Comments and ratings
- [ ] Playlist creation
- [ ] Share functionality
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Mobile apps (React Native)
- [ ] Video recommendations
- [ ] Live streaming support

## 📞 Support

For support, email support@terabooks.com or open an issue in the repository.

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

**Note**: This application uses publicly available sample videos for demonstration purposes. Always ensure you have proper rights to host and stream video content.

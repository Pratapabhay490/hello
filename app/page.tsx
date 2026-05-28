import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/home/HeroSection';
import VideoRow from '@/components/home/VideoRow';
import {
  sampleVideos,
  sampleCategories,
  getFeaturedVideos,
  getTrendingVideos,
  getVideosByCategory,
  getRecentVideos,
} from '@/data/sampleData';

export default function HomePage() {
  const featuredVideos = getFeaturedVideos();
  const trendingVideos = getTrendingVideos();
  const recentVideos = getRecentVideos(6);

  // Get hero video (first featured video)
  const heroVideo = featuredVideos[0] || sampleVideos[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection video={heroVideo} />

      {/* Content Sections */}
      <div className="-mt-32 relative z-10">
        {/* Trending Section */}
        <VideoRow title="🔥 Trending Now" videos={trendingVideos} showProgress={false} />

        {/* Featured Section */}
        <VideoRow title="⭐ Featured" videos={featuredVideos} showProgress={false} />

        {/* Recent Videos */}
        <VideoRow title="🆕 Recently Added" videos={recentVideos} showProgress={false} />

        {/* Categories */}
        {sampleCategories.map((category) => {
          const categoryVideos = getVideosByCategory(category.id);
          if (categoryVideos.length === 0) return null;

          return (
            <VideoRow
              key={category.id}
              title={`${category.name}`}
              videos={categoryVideos}
              showProgress={true}
            />
          );
        })}

        {/* Continue Watching - This will be populated from localStorage */}
        <VideoRow
          title="▶️ Continue Watching"
          videos={[]} // Will be populated dynamically with client-side hook
          showProgress={true}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'TeraBooks Player - Premium Video Streaming',
  description:
    'Watch your favorite videos on TeraBooks Player. Stream high-quality content with our modern, fast, and user-friendly platform.',
  keywords: 'video streaming, online videos, watch videos, entertainment',
  openGraph: {
    title: 'TeraBooks Player - Premium Video Streaming',
    description: 'Stream high-quality videos on TeraBooks Player',
    type: 'website',
  },
};

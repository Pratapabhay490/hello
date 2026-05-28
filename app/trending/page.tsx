import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import VideoCard from '@/components/home/VideoCard';
import { getTrendingVideos } from '@/data/sampleData';
import { FaFire, FaChartLine } from 'react-icons/fa';

export default function TrendingPage() {
  const trendingVideos = getTrendingVideos();

  // Sort by views for "hot" ranking
  const sortedVideos = [...trendingVideos].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container-responsive">
          {/* Header with animated gradient */}
          <div className="mb-12 relative">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <FaFire className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Trending Now
                </h1>
                <p className="text-gray-400 text-lg">
                  {sortedVideos.length} hot videos right now
                </p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="glass rounded-lg p-4 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-primary" />
                <span className="text-sm text-gray-400">
                  Updated in real-time based on popularity
                </span>
              </div>
            </div>
          </div>

          {/* Videos Grid with Rankings */}
          {sortedVideos.length > 0 ? (
            <div className="space-y-6">
              {/* Top 3 - Featured Display */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                  <span>🏆</span>
                  <span>Top 3 Trending</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                  {sortedVideos.slice(0, 3).map((video, index) => (
                    <div key={video.id} className="relative">
                      <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-lg">
                        {index + 1}
                      </div>
                      <VideoCard video={video} priority={true} showProgress={false} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rest of Trending */}
              {sortedVideos.length > 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">More Trending Videos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedVideos.slice(3).map((video, index) => (
                      <div key={video.id} className="relative">
                        <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white">
                          {index + 4}
                        </div>
                        <VideoCard video={video} showProgress={false} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="glass rounded-lg p-12 text-center">
              <FaFire className="text-6xl text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                No trending videos yet
              </h2>
              <p className="text-gray-500">Check back later for trending content</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const metadata = {
  title: 'Trending - TeraBooks Player',
  description: 'Watch the most trending videos on TeraBooks Player',
};

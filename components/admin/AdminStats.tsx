'use client';

import React from 'react';
import { sampleVideos, sampleCategories } from '@/data/sampleData';
import { FaVideo, FaEye, FaFolder, FaFire, FaStar, FaClock } from 'react-icons/fa';
import { formatCompactNumber } from '@/utils/helpers';

const AdminStats: React.FC = () => {
  // Calculate statistics
  const totalVideos = sampleVideos.length;
  const totalViews = sampleVideos.reduce((sum, video) => sum + video.views, 0);
  const totalCategories = sampleCategories.length;
  const trendingCount = sampleVideos.filter(v => v.trending).length;
  const featuredCount = sampleVideos.filter(v => v.featured).length;
  
  // Get recent videos (last 5)
  const recentVideos = [...sampleVideos]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Get most viewed videos
  const popularVideos = [...sampleVideos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const stats = [
    {
      icon: FaVideo,
      label: 'Total Videos',
      value: totalVideos,
      color: 'bg-blue-500',
    },
    {
      icon: FaEye,
      label: 'Total Views',
      value: formatCompactNumber(totalViews),
      color: 'bg-green-500',
    },
    {
      icon: FaFolder,
      label: 'Categories',
      value: totalCategories,
      color: 'bg-purple-500',
    },
    {
      icon: FaFire,
      label: 'Trending',
      value: trendingCount,
      color: 'bg-red-500',
    },
    {
      icon: FaStar,
      label: 'Featured',
      value: featuredCount,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="glass rounded-lg p-6 hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent and Popular Videos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Videos */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaClock className="text-primary" />
            <h3 className="text-xl font-semibold">Recent Videos</h3>
          </div>
          <div className="space-y-3">
            {recentVideos.map((video) => (
              <div
                key={video.id}
                className="flex items-center space-x-3 p-3 bg-surface rounded-lg hover:bg-surface-light transition-colors"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{video.title}</p>
                  <p className="text-gray-400 text-sm">
                    {formatCompactNumber(video.views)} views
                  </p>
                </div>
                {video.trending && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                    Trending
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Popular Videos */}
        <div className="glass rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaFire className="text-red-500" />
            <h3 className="text-xl font-semibold">Most Viewed</h3>
          </div>
          <div className="space-y-3">
            {popularVideos.map((video, index) => (
              <div
                key={video.id}
                className="flex items-center space-x-3 p-3 bg-surface rounded-lg hover:bg-surface-light transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{video.title}</p>
                  <p className="text-gray-400 text-sm">
                    {formatCompactNumber(video.views)} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="glass rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold mb-4">Categories Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleCategories.map((category) => {
            const videosInCategory = sampleVideos.filter(v => v.categoryId === category.id);
            const totalViewsInCategory = videosInCategory.reduce((sum, v) => sum + v.views, 0);

            return (
              <div
                key={category.id}
                className="p-4 bg-surface rounded-lg hover:bg-surface-light transition-colors"
              >
                <h4 className="text-white font-semibold mb-2">{category.name}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{videosInCategory.length} videos</span>
                  <span className="text-primary">{formatCompactNumber(totalViewsInCategory)} views</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;

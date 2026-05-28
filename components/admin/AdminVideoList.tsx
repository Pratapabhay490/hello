'use client';

import React, { useState } from 'react';
import { sampleVideos, sampleCategories } from '@/data/sampleData';
import { Video } from '@/types';
import { formatCompactNumber, formatDuration } from '@/utils/helpers';
import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa';
import Image from 'next/image';

const AdminVideoList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'title'>('recent');

  // Filter and sort videos
  let filteredVideos = [...sampleVideos];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredVideos = filteredVideos.filter(
      video =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (selectedCategory) {
    filteredVideos = filteredVideos.filter(video => video.categoryId === selectedCategory);
  }

  // Sort
  switch (sortBy) {
    case 'popular':
      filteredVideos.sort((a, b) => b.views - a.views);
      break;
    case 'title':
      filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'recent':
    default:
      filteredVideos.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  const handleDelete = (videoId: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      console.log('Delete video:', videoId);
      // In production, call API to delete
    }
  };

  const handleEdit = (videoId: string) => {
    console.log('Edit video:', videoId);
    // In production, navigate to edit page or open edit modal
  };

  const getCategoryName = (categoryId: string): string => {
    return sampleCategories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Video Management</h2>
        <p className="text-gray-400">Manage all videos on the platform</p>
      </div>

      {/* Filters */}
      <div className="glass rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full pl-12 pr-4 py-3 bg-surface border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">All Categories</option>
            {sampleCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'title')}
            className="px-4 py-3 bg-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400">
        Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
      </div>

      {/* Video List */}
      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="glass rounded-lg p-4 hover:bg-surface-light transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              {/* Thumbnail */}
              <div className="relative w-full md:w-48 aspect-video rounded overflow-hidden flex-shrink-0">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                {video.trending && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                    TRENDING
                  </span>
                )}
                {video.featured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-2 truncate">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center space-x-1 text-gray-400">
                    <FaEye />
                    <span>{formatCompactNumber(video.views)} views</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{formatDuration(video.duration)}</span>
                  <span className="text-gray-400">•</span>
                  <span className="px-2 py-1 bg-surface-lighter rounded text-primary text-xs">
                    {getCategoryName(video.categoryId)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400 text-xs">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col items-center md:items-end space-x-2 md:space-x-0 md:space-y-2">
                <button
                  onClick={() => handleEdit(video.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  <FaEdit />
                  <span className="hidden md:inline">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <FaTrash />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredVideos.length === 0 && (
          <div className="glass rounded-lg p-12 text-center">
            <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No videos found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideoList;

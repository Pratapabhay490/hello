'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import VideoCard from '@/components/home/VideoCard';
import { watchProgressStorage } from '@/utils/storage';
import { sampleVideos } from '@/data/sampleData';
import { Video } from '@/types';
import { FaHeart, FaClock, FaCheckCircle } from 'react-icons/fa';

type TabType = 'continue' | 'completed' | 'favorites';

export default function MyListPage() {
  const [activeTab, setActiveTab] = useState<TabType>('continue');
  const [continueWatching, setContinueWatching] = useState<Video[]>([]);
  const [completedVideos, setCompletedVideos] = useState<Video[]>([]);
  const [favoriteVideos] = useState<Video[]>([]); // Would be populated from user favorites

  useEffect(() => {
    // Get all watch progress
    const allProgress = watchProgressStorage.getAll();

    const continueList: Video[] = [];
    const completedList: Video[] = [];

    Object.entries(allProgress).forEach(([videoId, data]) => {
      const video = sampleVideos.find(v => v.id === videoId);
      if (!video) return;

      const percentage = (data.currentTime / data.duration) * 100;

      if (percentage >= 90) {
        completedList.push(video);
      } else if (percentage > 10) {
        continueList.push(video);
      }
    });

    setContinueWatching(continueList);
    setCompletedVideos(completedList);
  }, []);

  const renderContent = () => {
    let videos: Video[] = [];
    let emptyIcon: React.ReactNode;
    let emptyTitle: string;
    let emptyMessage: string;

    switch (activeTab) {
      case 'continue':
        videos = continueWatching;
        emptyIcon = <FaClock className="text-6xl text-gray-600 mx-auto mb-4" />;
        emptyTitle = 'No videos to continue';
        emptyMessage = 'Start watching videos to see them here';
        break;
      case 'completed':
        videos = completedVideos;
        emptyIcon = <FaCheckCircle className="text-6xl text-gray-600 mx-auto mb-4" />;
        emptyTitle = 'No completed videos';
        emptyMessage = 'Finish watching videos to see them here';
        break;
      case 'favorites':
        videos = favoriteVideos;
        emptyIcon = <FaHeart className="text-6xl text-gray-600 mx-auto mb-4" />;
        emptyTitle = 'No favorite videos';
        emptyMessage = 'Add videos to your favorites to see them here';
        break;
    }

    if (videos.length === 0) {
      return (
        <div className="glass rounded-lg p-12 text-center">
          {emptyIcon}
          <h2 className="text-2xl font-semibold text-gray-400 mb-2">{emptyTitle}</h2>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} showProgress={true} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container-responsive">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My List</h1>
            <p className="text-gray-400 text-lg">
              Your personal collection and watch history
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-gray-800">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('continue')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  activeTab === 'continue'
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FaClock />
                  <span>Continue Watching</span>
                  {continueWatching.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                      {continueWatching.length}
                    </span>
                  )}
                </div>
                {activeTab === 'continue' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  activeTab === 'completed'
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FaCheckCircle />
                  <span>Completed</span>
                  {completedVideos.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                      {completedVideos.length}
                    </span>
                  )}
                </div>
                {activeTab === 'completed' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`pb-4 px-2 font-semibold transition-colors relative ${
                  activeTab === 'favorites'
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FaHeart />
                  <span>Favorites</span>
                </div>
                {activeTab === 'favorites' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}

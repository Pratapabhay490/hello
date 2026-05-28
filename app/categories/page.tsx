import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import VideoCard from '@/components/home/VideoCard';
import { sampleCategories, getVideosByCategory } from '@/data/sampleData';
import { FaFolder } from 'react-icons/fa';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container-responsive">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h1>
            <p className="text-gray-400 text-lg">
              Explore our collection organized by categories
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-16">
            {sampleCategories.map((category) => {
              const videos = getVideosByCategory(category.id);

              if (videos.length === 0) return null;

              return (
                <div key={category.id} id={category.slug}>
                  {/* Category Header */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <FaFolder className="text-primary text-2xl" />
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                    </div>
                    {category.description && (
                      <p className="text-gray-400 ml-11">{category.description}</p>
                    )}
                    <p className="text-gray-500 text-sm ml-11 mt-1">
                      {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                    </p>
                  </div>

                  {/* Videos Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {videos.map((video) => (
                      <VideoCard key={video.id} video={video} showProgress={true} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const metadata = {
  title: 'Categories - TeraBooks Player',
  description: 'Browse videos by category on TeraBooks Player',
};

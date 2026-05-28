import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import VideoCard from '@/components/home/VideoCard';
import { searchVideos } from '@/data/sampleData';
import { FaSearch } from 'react-icons/fa';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? searchVideos(query) : [];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container-responsive">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {query ? `Search Results for "${query}"` : 'Search Videos'}
            </h1>
            {query && (
              <p className="text-gray-400">
                {results.length} {results.length === 1 ? 'video' : 'videos'} found
              </p>
            )}
          </div>

          {/* Results */}
          {query ? (
            results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <FaSearch className="text-6xl text-gray-600 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                  No results found
                </h2>
                <p className="text-gray-500">
                  Try searching for something else
                </p>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <FaSearch className="text-6xl text-gray-600 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                Start searching
              </h2>
              <p className="text-gray-500">
                Enter a search term to find videos
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';

  return {
    title: query ? `Search: ${query} - TeraBooks Player` : 'Search - TeraBooks Player',
    description: query
      ? `Search results for "${query}" on TeraBooks Player`
      : 'Search for videos on TeraBooks Player',
  };
}

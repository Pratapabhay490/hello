import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/video/VideoPlayer';
import { getVideoById } from '@/data/sampleData';
import { Video } from '@/types';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface WatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Loading component
function VideoPlayerSkeleton() {
  return (
    <div className="w-full aspect-video bg-surface animate-pulse rounded-lg" />
  );
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white hover:text-primary transition-colors"
            >
              <FaArrowLeft size={20} />
              <span className="text-lg font-semibold">Back to Home</span>
            </Link>
            <div className="text-2xl font-bold gradient-text">TeraBooks Player</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container-responsive">
          {/* Video Player */}
          <div className="mb-8">
            <Suspense fallback={<VideoPlayerSkeleton />}>
              <VideoPlayer video={video} autoplay={false} />
            </Suspense>
          </div>

          {/* Video Info */}
          <div className="max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{video.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <span>{video.views.toLocaleString()} views</span>
              <span>•</span>
              <span>{new Date(video.releaseDate).toLocaleDateString()}</span>
              {video.trending && (
                <>
                  <span>•</span>
                  <span className="px-3 py-1 bg-primary rounded-full text-white text-xs font-semibold">
                    Trending
                  </span>
                </>
              )}
              {video.featured && (
                <>
                  <span>•</span>
                  <span className="px-3 py-1 bg-yellow-500 rounded-full text-black text-xs font-semibold">
                    Featured
                  </span>
                </>
              )}
            </div>

            <div className="bg-surface rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed">{video.description}</p>
            </div>
          </div>

          {/* Related Videos Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">More Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Placeholder for related videos - will be implemented with real data */}
              <div className="bg-surface rounded-lg overflow-hidden">
                <div className="aspect-video bg-surface-light skeleton" />
                <div className="p-4">
                  <div className="h-4 bg-surface-light skeleton rounded mb-2" />
                  <div className="h-3 bg-surface-light skeleton rounded w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: WatchPageProps) {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }

  return {
    title: `${video.title} - TeraBooks Player`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [video.thumbnailUrl],
    },
  };
}

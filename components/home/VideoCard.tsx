'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';
import { formatDuration, formatCompactNumber } from '@/utils/helpers';
import { watchProgressStorage } from '@/utils/storage';
import { FaPlay, FaClock } from 'react-icons/fa';

interface VideoCardProps {
  video: Video;
  priority?: boolean;
  showProgress?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  priority = false,
  showProgress = true,
}) => {
  const progress = showProgress ? watchProgressStorage.getPercentage(video.id) : 0;
  const hasProgress = progress > 0 && progress < 100;

  return (
    <Link href={`/watch/${video.id}`} className="group block">
      <div className="relative rounded-lg overflow-hidden bg-surface card-hover">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-glow">
              <FaPlay className="text-white text-xl ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-white text-xs font-semibold">
            {formatDuration(video.duration)}
          </div>

          {/* Trending Badge */}
          {video.trending && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 rounded text-white text-xs font-bold uppercase">
              Trending
            </div>
          )}

          {/* Featured Badge */}
          {video.featured && !video.trending && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 rounded text-black text-xs font-bold uppercase">
              Featured
            </div>
          )}

          {/* Progress Bar */}
          {hasProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FaClock size={12} />
              {formatCompactNumber(video.views)} views
            </span>
            <span>{new Date(video.releaseDate).getFullYear()}</span>
          </div>

          {hasProgress && (
            <div className="mt-2 text-xs text-primary font-medium">
              {Math.round(progress)}% watched
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

'use client';

import React from 'react';
import Link from 'next/link';
import { Video } from '@/types';
import { formatDuration, formatCompactNumber } from '@/utils/helpers';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

interface HeroSectionProps {
  video: Video;
}

const HeroSection: React.FC<HeroSectionProps> = ({ video }) => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${video.thumbnailUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container-responsive flex flex-col justify-center">
        <div className="max-w-2xl space-y-4 animate-fade-in">
          {/* Badges */}
          <div className="flex items-center gap-2">
            {video.featured && (
              <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded uppercase">
                Featured
              </span>
            )}
            {video.trending && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded uppercase">
                Trending
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {video.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <span className="text-green-500 font-semibold">
                {formatCompactNumber(video.views)}
              </span>
              <span>views</span>
            </span>
            <span>•</span>
            <span>{formatDuration(video.duration)}</span>
            <span>•</span>
            <span>{new Date(video.releaseDate).getFullYear()}</span>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed line-clamp-3">
            {video.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <Link
              href={`/watch/${video.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <FaPlay size={18} />
              <span>Play Now</span>
            </Link>
            <Link
              href={`/watch/${video.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-300 border border-white/30"
            >
              <FaInfoCircle size={18} />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default HeroSection;

'use client';

import React, { useRef } from 'react';
import { Video } from '@/types';
import VideoCard from './VideoCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface VideoRowProps {
  title: string;
  videos: Video[];
  showProgress?: boolean;
}

const VideoRow: React.FC<VideoRowProps> = ({ title, videos, showProgress = false }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
    const newScrollLeft =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll();
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 group/row">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white mb-6 px-4 md:px-8">{title}</h2>

      {/* Videos Container */}
      <div className="relative px-4 md:px-8">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-black to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:from-black/80"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-white text-2xl" />
          </button>
        )}

        {/* Videos Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex-shrink-0 w-[280px] md:w-[320px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VideoCard video={video} showProgress={showProgress} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-black to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hover:from-black/80"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-white text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoRow;

import React from 'react';

export const VideoCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg overflow-hidden bg-surface animate-pulse">
      <div className="aspect-video w-full bg-surface-light skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-surface-light skeleton rounded" />
        <div className="h-3 bg-surface-light skeleton rounded w-2/3" />
      </div>
    </div>
  );
};

export const VideoRowSkeleton: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="h-8 bg-surface-light skeleton rounded w-48 mb-6 mx-4 md:mx-8" />
      <div className="flex gap-4 px-4 md:px-8 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[280px] md:w-[320px]">
            <VideoCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[70vh] md:h-[80vh] bg-surface skeleton" />
  );
};

export const GridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full spinner`}
      />
    </div>
  );
};

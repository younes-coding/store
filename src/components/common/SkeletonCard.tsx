import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl overflow-hidden bg-white p-3 border border-brand-200/60 shadow-sm">
      <div className="w-full aspect-[3/4] rounded-xl skeleton-shimmer" />
      <div className="space-y-2 pt-1 px-1">
        <div className="h-3 w-1/3 rounded skeleton-shimmer" />
        <div className="h-5 w-3/4 rounded skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded skeleton-shimmer" />
        <div className="flex gap-1.5 pt-2">
          <div className="w-4 h-4 rounded-full skeleton-shimmer" />
          <div className="w-4 h-4 rounded-full skeleton-shimmer" />
          <div className="w-4 h-4 rounded-full skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

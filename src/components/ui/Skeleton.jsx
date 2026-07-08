import React from 'react';

export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'animate-pulse bg-gradient-to-r from-[var(--bg-elevated)] via-[var(--bg-card)] to-[var(--bg-elevated)] bg-[length:400%_100%] rounded-xl';
  if (variant === 'circle') {
    return <div className={`${base} rounded-full ${className}`} />;
  }
  if (variant === 'text') {
    return <div className={`${base} h-4 rounded-lg ${className}`} />;
  }
  return <div className={`${base} ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-3xl overflow-hidden backdrop-blur-md">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-6 space-y-4">
        <Skeleton variant="text" className="w-20 h-3" />
        <Skeleton variant="text" className="w-3/4 h-5.5" />
        <Skeleton variant="text" className="w-full h-3" />
        <Skeleton variant="text" className="w-2/3 h-3" />
      </div>
    </div>
  );
}

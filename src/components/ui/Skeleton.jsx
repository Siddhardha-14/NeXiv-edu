import React from 'react';

export default function Skeleton({ className = '', variant = 'rect' }) {
  const base = 'animate-pulse bg-[var(--bg-elevated)] rounded-xl';
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
    <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-2xl overflow-hidden">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" className="w-20" />
        <Skeleton variant="text" className="w-3/4 h-5" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
    </div>
  );
}

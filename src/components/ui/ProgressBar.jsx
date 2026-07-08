import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color = 'bg-gradient-to-r from-[var(--accent)] to-[#06b6d4]',
  showLabel = false,
  className = '',
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-[9px] font-mono font-bold text-[var(--text-tertiary)] uppercase tracking-widest">Progress</span>
          <span className="text-[10px] font-mono font-bold text-[var(--accent-hover)]">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full bg-[var(--bg-inset)] rounded-full overflow-hidden border border-[var(--border-subtle)] ${heights[size] || heights.md}`}>
        <div
          className={`
            relative ${heights[size] || heights.md} ${color} rounded-full transition-all duration-700 ease-[var(--ease-spring)]
            shadow-[0_0_12px_rgba(124,58,237,0.3)]
          `}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Internal Shimmer Sweep effect */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:200px_100%] animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}

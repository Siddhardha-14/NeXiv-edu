import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color = 'bg-[var(--accent)]',
  showLabel = false,
  className = '',
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2.5' };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-mono font-bold text-[var(--accent)]">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full bg-[var(--bg-inset)] rounded-full overflow-hidden ${heights[size] || heights.md}`}>
        <div
          className={`${heights[size] || heights.md} ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}

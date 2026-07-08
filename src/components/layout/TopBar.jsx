import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';

export default function TopBar({ children, rightContent }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[var(--bg-root)]/70 backdrop-blur-xl border-b border-[var(--border-default)] shadow-sm">
      {/* Dynamic Luminous Gradient Top Highlight Bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[var(--accent)] via-[#22d3ee] to-[var(--accent-hover)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {children}
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {rightContent}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

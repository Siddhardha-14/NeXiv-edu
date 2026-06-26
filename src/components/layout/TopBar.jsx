import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';

export default function TopBar({ children, rightContent }) {
  return (
    <header className="sticky top-0 z-30 bg-[var(--bg-root)]/80 backdrop-blur-xl border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {children}
        <div className="flex items-center gap-3">
          {rightContent}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

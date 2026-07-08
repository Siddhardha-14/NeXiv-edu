import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]/60 text-[var(--text-secondary)] hover:text-[var(--text-primary)]
        hover:border-[var(--accent-hover)] hover:bg-[var(--bg-card-hover)] hover:shadow-[0_0_12px_rgba(124,58,237,0.15)]
        transition-all duration-300 ease-[var(--ease-spring)] cursor-pointer select-none active:scale-90
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-4.5 h-4.5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4.5 h-4.5 text-amber-400 rotate-0 transition-transform duration-500 ease-[var(--ease-spring)]" />
        ) : (
          <Moon className="w-4.5 h-4.5 text-indigo-400 rotate-360 transition-transform duration-500 ease-[var(--ease-spring)]" />
        )}
      </div>
    </button>
  );
}

import React from 'react';

export default function SkipLink({ target = '#main-content' }) {
  return (
    <a
      href={target}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--accent)] focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-bold focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

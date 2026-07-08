import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Floating scroll-to-top button that appears when user scrolls past 400px.
 * Respects reduced-motion preference.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg shadow-[var(--accent-glow)] hover:bg-[var(--accent-hover)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/10"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Focus trap + ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    const timer = setTimeout(() => {
      const focusable = contentRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusable?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md animate-fade-in" />

      {/* Content Container (2026 Luminous Glass Dialog Box) */}
      <div
        ref={contentRef}
        className={`relative ${maxWidth} w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.6),0_0_30px_rgba(124,58,237,0.15)] animate-fade-in my-8 overflow-hidden backdrop-blur-xl`}
      >
        {/* Luminous Top Indicator Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] to-[#22d3ee]" />

        {title && (
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]/40">
            <h2 className="text-[10px] font-mono font-bold text-[var(--text-primary)] uppercase tracking-widest">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition duration-200 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

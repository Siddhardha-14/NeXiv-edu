import React from 'react';

const variants = {
  default: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]',
  primary: 'bg-[var(--accent-muted)] text-[var(--accent-hover)] border border-[var(--accent)]/30 shadow-[0_0_10px_rgba(124,58,237,0.1)]',
  success: 'bg-[var(--success-muted)] text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
  warning: 'bg-[var(--warning-muted)] text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
  error: 'bg-[var(--error-muted)] text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
  info: 'bg-[var(--info-muted)] text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]',
};

export default function Badge({
  children,
  variant = 'default',
  dot = false,
  className = '',
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest
        px-2.5 py-1 rounded-lg font-mono leading-none select-none backdrop-blur-md
        ${variants[variant] || variants.default}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
      )}
      {children}
    </span>
  );
}

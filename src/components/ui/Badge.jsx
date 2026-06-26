import React from 'react';

const variants = {
  default: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]',
  primary: 'bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/20',
  success: 'bg-[var(--success-muted)] text-[var(--success)] border border-[var(--success)]/20',
  warning: 'bg-[var(--warning-muted)] text-[var(--warning)] border border-[var(--warning)]/20',
  error: 'bg-[var(--error-muted)] text-[var(--error)] border border-[var(--error)]/20',
  info: 'bg-[var(--info-muted)] text-[var(--info)] border border-[var(--info)]/20',
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
        inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider
        px-2.5 py-1 rounded-lg font-mono leading-none select-none
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

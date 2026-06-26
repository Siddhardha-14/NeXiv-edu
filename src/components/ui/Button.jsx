import React from 'react';

const variants = {
  primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-md shadow-[var(--accent-glow)] hover:shadow-lg',
  secondary: 'bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card)]',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
  danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md',
  accent: 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-md dark:bg-zinc-100 dark:hover:bg-zinc-200',
};

const sizes = {
  sm: 'text-[11px] px-3 py-1.5 gap-1.5',
  md: 'text-xs px-4 py-2.5 gap-2',
  lg: 'text-xs px-6 py-3.5 gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-xl
        transition-all duration-200 cursor-pointer select-none
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
        active:scale-[0.97]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="w-4 h-4 shrink-0" />}
    </button>
  );
}

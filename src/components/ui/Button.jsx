import React from 'react';

const variants = {
  primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-md shadow-[var(--accent-glow)] hover:shadow-[0_0_20px_var(--accent-glow)] border border-transparent',
  secondary: 'bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--accent-hover)] hover:bg-[var(--bg-card-hover)] hover:shadow-[0_0_15px_rgba(124,58,237,0.15)]',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-transparent',
  danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]',
  accent: 'bg-white text-slate-900 hover:bg-slate-100 border border-transparent shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.25)]',
};

const sizes = {
  sm: 'text-[10px] px-3.5 py-2 gap-1.5',
  md: 'text-[11px] px-5 py-3 gap-2',
  lg: 'text-xs px-7 py-4 gap-2.5',
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
        inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-xl
        transition-all duration-300 ease-[var(--ease-spring)] cursor-pointer select-none
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]
        active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
        backdrop-blur-[var(--glass-blur)]
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
      ) : null}
      <span className="leading-none">{children}</span>
      {IconRight && !loading && <IconRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </button>
  );
}

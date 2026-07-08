import React from 'react';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  rightContent,
  className = '',
}) {
  return (
    <header className={`flex flex-col sm:flex-row sm:items-start sm:justify-between pb-6.5 border-b border-[var(--border-subtle)] mb-8 gap-5 ${className}`}>
      <div className="min-w-0">
        {eyebrow && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-hover)] to-[#06b6d4] text-[9px] font-mono font-bold uppercase tracking-widest block mb-1.5 animate-[fadeIn_0.5s_ease-out]">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {rightContent && <div className="shrink-0 animate-[fadeIn_0.5s_ease-out_0.2s_both]">{rightContent}</div>}
    </header>
  );
}

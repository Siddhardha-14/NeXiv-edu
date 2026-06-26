import React from 'react';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  rightContent,
  className = '',
}) {
  return (
    <header className={`flex flex-col sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-[var(--border-subtle)] mb-8 gap-4 ${className}`}>
      <div className="min-w-0">
        {eyebrow && (
          <span className="text-[var(--accent)] text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
            {eyebrow}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {rightContent && <div className="shrink-0">{rightContent}</div>}
    </header>
  );
}

import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * BentoGrid is a container that uses CSS Grid to lay out modular cards.
 * It is fully responsive, shifting to 1 column on mobile and 3 columns on medium/larger viewports.
 */
export function BentoGrid({ children, className = '' }) {
  return (
    <div className={`grid w-full auto-rows-[23rem] grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * BentoCard is an individual content cell within the BentoGrid.
 * It features a background preview hook, a hover translation effect, and sliding CTA.
 */
export function BentoCard({
  name,
  className = '',
  background,
  Icon,
  description,
  href,
  cta = 'Learn more',
  onCtaClick,
  badge,
}) {
  return (
    <div
      className={`
        group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl
        bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent-hover)]
        transition-all duration-500 ease-[var(--ease-spring)] shadow-lg hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.6),0_0_20px_var(--accent-glow)]
        backdrop-blur-[var(--glass-blur)]
        ${className}
      `}
    >
      {/* Background graphic layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-all duration-500 select-none overflow-hidden scale-100 group-hover:scale-105">
        {background}
      </div>

      {/* Modern gradient overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-root)] via-[var(--bg-root)]/60 to-transparent z-10 pointer-events-none" />

      {/* Optional Badge */}
      {badge && (
        <div className="absolute top-5 right-5 z-20 transition-transform duration-300 group-hover:scale-105">
          {badge}
        </div>
      )}

      {/* Main Info Layer */}
      <div className="pointer-events-none z-20 flex flex-col gap-1 p-6 mt-auto transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-2">
        {Icon && (
          <div className="p-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-2xl w-fit flex items-center justify-center text-[var(--accent)] group-hover:scale-110 group-hover:text-[var(--accent-hover)] group-hover:border-[var(--accent-muted)] transition-all duration-300">
            <Icon className="h-5.5 w-5.5" />
          </div>
        )}
        <h3 className="text-base font-bold text-[var(--text-primary)] mt-3.5 tracking-tight">
          {name}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 max-w-[280px] leading-relaxed mt-1">
          {description}
        </p>
      </div>

      {/* Hover CTA Trigger Layer */}
      <div
        className={`
          pointer-events-auto z-20 flex items-center justify-between px-6 pb-6 pt-0
          opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-500 ease-[var(--ease-spring)]
        `}
      >
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--accent-hover)] hover:text-[var(--text-primary)] transition cursor-pointer"
        >
          {cta}
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

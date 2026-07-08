import React from 'react';

const variants = {
  elevated: 'bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--glass-shadow)] backdrop-blur-[var(--glass-blur)]',
  flat: 'bg-[var(--bg-card)] border border-[var(--border-default)] backdrop-blur-[var(--glass-blur)]',
  interactive: 'bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--accent-hover)] hover:-translate-y-1 hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.5),0_0_15px_rgba(124,58,237,0.15)] cursor-pointer backdrop-blur-[var(--glass-blur)]',
  ghost: 'bg-transparent border border-transparent',
};

export default function Card({
  children,
  variant = 'elevated',
  className = '',
  padding = 'p-6',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`
        rounded-2xl transition-all duration-300 ease-[var(--ease-spring)]
        ${variants[variant] || variants.elevated}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}

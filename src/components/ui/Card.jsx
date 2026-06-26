import React from 'react';

const variants = {
  elevated: 'bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-sm)]',
  flat: 'bg-[var(--bg-card)] border border-[var(--border-default)]',
  interactive: 'bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] cursor-pointer',
  ghost: 'bg-transparent',
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
        rounded-2xl transition-all duration-300
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

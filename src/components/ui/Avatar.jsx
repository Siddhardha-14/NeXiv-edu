import React from 'react';

export default function Avatar({
  name = '',
  size = 'md',
  className = '',
  src,
}) {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const sizes = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover border border-[var(--border-default)] ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/20 flex items-center justify-center font-bold text-[var(--accent)] select-none ${sizes[size]} ${className}`}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

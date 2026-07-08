import React from 'react';

export default function Avatar({
  name = '',
  size = 'md',
  className = '',
  src,
}) {
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const sizes = {
    sm: 'w-8 h-8 text-[9px] border',
    md: 'w-10 h-10 text-[10px] border-2',
    lg: 'w-14 h-14 text-xs border-2',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover border-[var(--border-default)] shadow-md ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        rounded-full bg-gradient-to-br from-[var(--accent-muted)] to-[var(--bg-elevated)]
        border-[var(--accent)]/30 flex items-center justify-center font-bold text-[var(--accent-hover)]
        shadow-[0_0_12px_rgba(124,58,237,0.15)] select-none tracking-wider font-mono
        ${sizes[size]} ${className}
      `}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

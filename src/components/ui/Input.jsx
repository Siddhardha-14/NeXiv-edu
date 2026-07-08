import React from 'react';

export default function Input({
  label,
  type = 'text',
  icon: Icon,
  error,
  className = '',
  id,
  ...props
}) {
  const inputId = id || `input-${label?.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-[9px] font-mono font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={type}
          className={`
            w-full bg-[var(--bg-inset)] border rounded-xl px-4 py-3 text-xs
            text-[var(--text-primary)] font-medium placeholder:text-[var(--text-muted)]
            backdrop-blur-md
            focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-muted)]
            focus:shadow-[0_0_15px_rgba(124,58,237,0.15)]
            transition-all duration-300 ease-[var(--ease-spring)]
            ${error ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error-muted)]' : 'border-[var(--border-default)]'}
            ${Icon ? 'pr-10' : ''}
          `}
          {...props}
        />
        {Icon && (
          <Icon className="w-4 h-4 text-[var(--text-muted)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>
      {error && (
        <p className="text-[var(--error)] text-[9px] font-mono font-bold uppercase tracking-wider mt-2 pl-1">{error}</p>
      )}
    </div>
  );
}

export function Select({
  label,
  children,
  className = '',
  id,
  ...props
}) {
  const selectId = id || `select-${label?.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-[9px] font-mono font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-muted)] focus:shadow-[0_0_15px_rgba(124,58,237,0.15)] transition-all duration-300 ease-[var(--ease-spring)] cursor-pointer appearance-none bg-no-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 16px center',
            paddingRight: '40px'
          }}
          {...props}
        >
          {children}
        </select>
      </div>
    </div>
  );
}

export function Textarea({
  label,
  className = '',
  id,
  ...props
}) {
  const textareaId = id || `textarea-${label?.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={textareaId} className="block text-[9px] font-mono font-bold text-[var(--text-tertiary)] uppercase tracking-widest mb-2.5">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] font-medium placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-muted)] focus:shadow-[0_0_15px_rgba(124,58,237,0.15)] transition-all duration-300 ease-[var(--ease-spring)] resize-y min-h-[100px]"
        {...props}
      />
    </div>
  );
}

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
        <label htmlFor={inputId} className="block text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={type}
          className={`
            w-full bg-[var(--bg-inset)] border rounded-xl px-4 py-3 text-sm
            text-[var(--text-primary)] font-medium
            placeholder:text-[var(--text-muted)]
            focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)]
            transition-all duration-200
            ${error ? 'border-[var(--error)]' : 'border-[var(--border-default)]'}
            ${Icon ? 'pr-10' : ''}
          `}
          {...props}
        />
        {Icon && (
          <Icon className="w-4 h-4 text-[var(--text-muted)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
      </div>
      {error && (
        <p className="text-[var(--error)] text-[10px] font-medium mt-1.5">{error}</p>
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
        <label htmlFor={selectId} className="block text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] font-medium focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)] transition-all duration-200 cursor-pointer appearance-none"
        {...props}
      >
        {children}
      </select>
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
        <label htmlFor={textareaId} className="block text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] font-medium placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-muted)] transition-all duration-200 resize-y"
        {...props}
      />
    </div>
  );
}

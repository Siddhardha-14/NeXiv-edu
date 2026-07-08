import React from 'react';
import { CircleCheck, CircleAlert, TriangleAlert, X } from 'lucide-react';

const styles = {
  success: { Icon: CircleCheck, border: 'border-emerald-500/30', bg: 'bg-emerald-950/20', iconColor: 'text-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]' },
  warning: { Icon: TriangleAlert, border: 'border-amber-500/30', bg: 'bg-amber-950/20', iconColor: 'text-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]' },
  error: { Icon: CircleAlert, border: 'border-red-500/30', bg: 'bg-red-950/20', iconColor: 'text-red-400', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)]' },
  info: { Icon: CircleAlert, border: 'border-blue-500/30', bg: 'bg-blue-950/20', iconColor: 'text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]' },
};

export default function Toast({ toast, onDismiss }) {
  const { Icon, border, bg, iconColor, glow } = styles[toast.type] || styles.info;

  return (
    <div
      className={`pointer-events-auto p-4.5 rounded-2xl border ${border} bg-[var(--bg-surface)]/90 backdrop-blur-xl ${glow} flex items-start gap-3.5 animate-slide-in-right transition-all duration-300 ease-[var(--ease-spring)]`}
      role="alert"
    >
      <div className={`p-1.5 w-8 h-8 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <p className="flex-grow text-[11px] font-semibold text-[var(--text-primary)] leading-normal pt-1">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition duration-200 cursor-pointer shrink-0 p-1 rounded-lg hover:bg-[var(--bg-elevated)]"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed top-6 right-6 z-[60] flex flex-col gap-3 max-w-sm w-full pointer-events-none" aria-live="polite">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

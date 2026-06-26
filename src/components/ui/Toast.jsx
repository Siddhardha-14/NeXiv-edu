import React from 'react';
import { CircleCheck, CircleAlert, TriangleAlert, X } from 'lucide-react';

const styles = {
  success: { Icon: CircleCheck, border: 'border-emerald-500/30', bg: 'bg-emerald-950/20', iconColor: 'text-emerald-400' },
  warning: { Icon: TriangleAlert, border: 'border-amber-500/30', bg: 'bg-amber-950/20', iconColor: 'text-amber-500' },
  error: { Icon: CircleAlert, border: 'border-red-500/30', bg: 'bg-red-950/20', iconColor: 'text-red-400' },
  info: { Icon: CircleAlert, border: 'border-blue-500/30', bg: 'bg-blue-950/20', iconColor: 'text-blue-400' },
};

export default function Toast({ toast, onDismiss }) {
  const { Icon, border, bg, iconColor } = styles[toast.type] || styles.info;

  return (
    <div
      className={`pointer-events-auto p-4 rounded-xl border ${border} bg-[var(--bg-surface)]/95 backdrop-blur-md shadow-[var(--shadow-lg)] flex items-start gap-3 animate-slide-in-right`}
      role="alert"
    >
      <div className={`p-1 w-7 h-7 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <p className="flex-grow text-[11px] font-semibold text-[var(--text-primary)] leading-normal pt-0.5">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition cursor-pointer shrink-0 p-1"
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

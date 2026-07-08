import React from 'react';

export default function DashboardLayout({ sidebar, children }) {
  return (
    <div className="min-h-screen flex bg-[var(--bg-root)] text-[var(--text-primary)]">
      {sidebar}
      <main
        id="main-content"
        className="flex-1 min-w-0 overflow-y-auto"
        style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
      >
        {children}
      </main>
    </div>
  );
}

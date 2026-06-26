import React from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ sidebar, children }) {
  return (
    <div className="min-h-screen flex bg-[var(--bg-root)] text-[var(--text-primary)]">
      {sidebar}
      <main id="main-content" className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

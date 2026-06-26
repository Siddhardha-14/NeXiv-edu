import React, { useState } from 'react';
import { BookOpen, Compass, Award, Menu, X, ChevronLeft } from 'lucide-react';
import Avatar from '../ui/Avatar';
import ThemeToggle from '../ui/ThemeToggle';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export default function Sidebar({
  role = 'student',
  user,
  navItems = [],
  activeItem = 0,
  onNavClick,
  onLogout,
  bottomAction,
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <aside
      className={`
        bg-[var(--bg-root)] border-r border-[var(--border-default)] flex flex-col justify-between shrink-0
        transition-all duration-300 h-full
        ${isMobile ? 'fixed inset-y-0 left-0 z-50 w-72 shadow-2xl' : collapsed ? 'w-[72px]' : 'w-64'}
        ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
      `}
    >
      {/* Header */}
      <div>
        <div className={`flex items-center gap-3 p-5 pb-4 border-b border-[var(--border-subtle)] ${collapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-mono font-black text-base shadow-md shadow-[var(--accent-glow)] shrink-0">
            N
          </div>
          {(!collapsed || isMobile) && (
            <div className="min-w-0">
              <span className="font-black text-base text-[var(--text-primary)] block leading-tight tracking-tight">
                NeXiv<span className="text-[var(--accent)]">.EDU</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[var(--text-muted)] block font-mono">
                {role === 'admin' ? 'Control Center' : 'Learning Hub'}
              </span>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition cursor-pointer"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          )}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="p-3 space-y-1" aria-label="Main navigation">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === activeItem;
            return (
              <button
                key={idx}
                onClick={() => {
                  onNavClick?.(idx);
                  if (isMobile) setMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer
                  ${collapsed && !isMobile ? 'justify-center' : ''}
                  ${isActive
                    ? 'bg-[var(--accent-muted)] text-[var(--accent)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                  }
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                {(!collapsed || isMobile) && <span>{item.label}</span>}
                {(!collapsed || isMobile) && item.badge && (
                  <span className="ml-auto text-[9px] font-mono font-bold bg-[var(--accent-muted)] text-[var(--accent)] px-1.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {(!collapsed || isMobile) && bottomAction && (
          <div className="px-3 mt-2">
            {bottomAction}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 mb-3">
          <ThemeToggle />
        </div>
        {user && (
          <div className={`flex items-center gap-3 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
            <Avatar name={user.name} size="sm" />
            {(!collapsed || isMobile) && (
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[var(--text-primary)] block truncate">{user.name}</span>
                <span className="text-[10px] font-mono text-[var(--text-muted)] block truncate">{user.email}</span>
              </div>
            )}
          </div>
        )}
        {(!collapsed || isMobile) && (
          <button
            onClick={onLogout}
            className="mt-3 w-full text-left text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--error)] transition cursor-pointer py-1.5"
          >
            Log out
          </button>
        )}
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile hamburger trigger */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-md text-[var(--text-primary)] cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {sidebarContent}
    </>
  );
}

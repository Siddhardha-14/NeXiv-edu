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
        bg-[var(--bg-root)]/50 backdrop-blur-xl border-r border-[var(--border-default)] flex flex-col justify-between shrink-0
        transition-all duration-500 ease-[var(--ease-spring)] h-full z-40
        ${isMobile ? 'fixed inset-y-0 left-0 w-72 shadow-2xl' : collapsed ? 'w-[76px]' : 'w-64'}
        ${isMobile && !mobileOpen ? '-translate-x-full' : 'translate-x-0'}
      `}
    >
      {/* Header */}
      <div>
        <div className={`flex items-center gap-3 p-5 pb-4.5 border-b border-[var(--border-subtle)] ${collapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center text-white font-mono font-black text-base shadow-lg shadow-[var(--accent-glow)] shrink-0">
            N
          </div>
          {(!collapsed || isMobile) && (
            <div className="min-w-0">
              <span className="font-extrabold text-base text-[var(--text-primary)] block leading-tight tracking-tight">
                NeXiv<span className="text-[var(--accent-hover)]">.EDU</span>
              </span>
              <span className="text-[8px] uppercase font-bold tracking-widest text-[var(--text-tertiary)] block font-mono mt-0.5">
                {role === 'admin' ? 'Control Center' : 'Learning Hub'}
              </span>
            </div>
          )}
          {!isMobile && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition duration-200 cursor-pointer"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          )}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="p-3.5 space-y-1.5" aria-label="Main navigation">
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
                  w-full flex items-center gap-3 px-3 py-3 text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer relative group
                  ${collapsed && !isMobile ? 'justify-center' : ''}
                  ${isActive
                    ? 'bg-[var(--accent-muted)] text-[var(--text-primary)] border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(124,58,237,0.1)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)] border border-transparent'
                  }
                `}
                title={collapsed ? item.label : undefined}
              >
                {/* Active side indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-[var(--accent-hover)] to-[#22d3ee] rounded-r-full" />
                )}
                
                <Icon className={`w-[18px] h-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-[var(--accent-hover)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'}`} />
                {(!collapsed || isMobile) && <span className="leading-none">{item.label}</span>}
                {(!collapsed || isMobile) && item.badge && (
                  <span className="ml-auto text-[8px] font-mono font-bold bg-[var(--accent)] text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {(!collapsed || isMobile) && bottomAction && (
          <div className="px-3.5 mt-4">
            {bottomAction}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/20">
        <div className="flex items-center gap-2 mb-4">
          <ThemeToggle />
        </div>
        {user && (
          <div className={`flex items-center gap-3 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
            <Avatar name={user.name} size="sm" />
            {(!collapsed || isMobile) && (
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[var(--text-primary)] block truncate leading-tight">{user.name}</span>
                <span className="text-[9px] font-mono text-[var(--text-muted)] block truncate mt-0.5">{user.email}</span>
              </div>
            )}
          </div>
        )}
        {(!collapsed || isMobile) && (
          <button
            onClick={onLogout}
            className="mt-4 w-full text-left text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--error)] transition duration-200 py-1.5"
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
          className="fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-lg backdrop-blur-md text-[var(--text-primary)] cursor-pointer active:scale-90 transition-transform duration-200"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {sidebarContent}
    </>
  );
}

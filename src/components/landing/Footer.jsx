import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Sparkles,
  CircleHelp,
  Mail,
  Globe,
  Shield,
  FileSpreadsheet,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function Footer() {
  const { showToast } = useAuth();
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Trigger premium success toast notification
    showToast(`Successfully subscribed ${email} to the NeXiv newsletter!`, 'success');
    setEmail('');
  };

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    
    const langNames = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      ja: '日本語'
    };
    showToast(`Language preference updated to: ${langNames[selected] || selected}`, 'info');
  };

  return (
    <footer className="bg-[var(--bg-surface)]/40 text-[var(--text-secondary)] border-t border-[var(--border-default)] pt-12 sm:pt-20 pb-8 sm:pb-12 backdrop-blur-xl" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 mb-12 sm:mb-16">
        
        {/* Brand Block */}
        <div className="col-span-2 sm:col-span-2 md:col-span-4 flex flex-col items-start gap-5">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center text-white font-mono font-black text-base shadow-lg shadow-[var(--accent-glow)]">
              N
            </div>
            <span className="font-extrabold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-hover)] transition tracking-tight">
              NeXiv<span className="text-[var(--accent-hover)]">.EDU</span>
            </span>
          </a>
          
          <p className="text-[var(--text-tertiary)] text-xs leading-relaxed max-w-sm">
            Empowering modern engineers, designers, and scientists to acquire job-ready, verified credentials through calm, AI-assisted interactive syllabus learning.
          </p>

          <div className="text-[10px] font-mono text-[var(--text-muted)] space-y-2">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[var(--accent-hover)]" />
              <span>support@nexiv.edu</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[var(--accent-hover)]" />
              <span>Singapore · San Francisco</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5 pt-2.5">
            {[
              { 
                icon: (props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                ), 
                href: 'https://github.com/Siddhardha-14/NeXiv-edu', 
                label: 'GitHub' 
              },
              { 
                icon: (props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                ), 
                href: '#', 
                label: 'Twitter' 
              },
              { 
                icon: (props) => (
                  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                ), 
                href: '#', 
                label: 'YouTube' 
              },
              { 
                icon: MessageSquare, 
                href: '#', 
                label: 'Discord Community' 
              }
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)]/60 border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent-hover)] hover:shadow-[0_0_12px_rgba(124,58,237,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="w-4.5 h-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Academy */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-primary)] uppercase mb-5">
            Academy
          </h4>
          <ul className="space-y-4 text-xs text-[var(--text-tertiary)] font-semibold">
            <li>
              <a href="#courses-gallery" className="hover:text-[var(--text-primary)] transition flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[var(--accent-hover)]/70" /> Courses
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[var(--accent-hover)]/70" /> How It Works
              </a>
            </li>
            <li>
              <a href="#learning-paths" className="hover:text-[var(--text-primary)] transition flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[var(--accent-hover)]/70" /> Specializations
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-primary)] uppercase mb-5">
            Platform
          </h4>
          <ul className="space-y-4 text-xs text-[var(--text-tertiary)] font-semibold">
            <li>
              <a href="#" className="hover:text-[var(--text-primary)] transition flex items-center gap-2.5">
                <CircleHelp className="w-4 h-4 text-[var(--accent-hover)]/70" /> FAQ Desk
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--text-primary)] transition flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--accent-hover)]/70" /> Contact Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--text-primary)] transition flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[var(--accent-hover)]/70" /> Dev Community
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Localization */}
        <div className="col-span-2 sm:col-span-2 md:col-span-4 flex flex-col items-start gap-4">
          <h4 className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-primary)] uppercase mb-2">
            Stay Updated
          </h4>
          <p className="text-[var(--text-tertiary)] text-xs leading-relaxed mb-1.5">
            Subscribe to our weekly ledger to receive system announcements, microlearning slides, and course launches.
          </p>

          {/* Newsletter Input Form */}
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-sm">
            <input
              type="email"
              required
              placeholder="operator@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-3.5 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition duration-300"
            />
            <Button type="submit" size="sm" iconRight={ArrowRight} className="shrink-0 leading-none">
              Join
            </Button>
          </form>

          {/* Language Selector Dropdown */}
          <div className="w-full max-w-[170px] mt-2">
            <label htmlFor="footer-lang" className="sr-only">Change Language</label>
            <select
              id="footer-lang"
              value={language}
              onChange={handleLanguageChange}
              className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-secondary)] focus:outline-none cursor-pointer appearance-none bg-no-repeat transition-colors duration-300 hover:border-[var(--border-hover)]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 14px center',
                paddingRight: '36px'
              }}
            >
              <option value="en">English (US)</option>
              <option value="es">Español (ES)</option>
              <option value="fr">Français (FR)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="ja">日本語 (JP)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6.5 border-t border-[var(--border-subtle)] text-[var(--text-muted)] text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-semibold">
        <div className="flex items-center gap-2 flex-wrap">
          <span>© {new Date().getFullYear()} NeXiv.EDU.</span>
          <span className="text-[var(--text-muted)]/40 hidden sm:inline">·</span>
          <a href="#" className="hover:text-[var(--text-primary)] transition flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Privacy Policy
          </a>
          <span className="text-[var(--text-muted)]/40 hidden sm:inline">·</span>
          <a href="#" className="hover:text-[var(--text-primary)] transition flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Terms of Service
          </a>
        </div>
        <span className="text-[8px] font-mono bg-[var(--bg-inset)] border border-[var(--border-default)] px-3.5 py-1.5 rounded-full shadow-sm">
          🔒 SSL Secured · 🌐 Global Operations
        </span>
      </div>
    </footer>
  );
}

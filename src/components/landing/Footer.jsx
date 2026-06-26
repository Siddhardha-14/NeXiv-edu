import React from 'react';
import { BookOpen, Award, Sparkles, CircleHelp, Mail, Globe, Shield, FileSpreadsheet } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-surface)] text-[var(--text-secondary)] border-t border-[var(--border-default)] py-14" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
        <div className="md:col-span-4 flex flex-col items-start gap-3">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-mono font-bold text-sm shadow">N</div>
            <span className="font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition">
              NeXiv<span className="text-[var(--accent)]">.EDU</span>
            </span>
          </a>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed max-w-xs">
            Helping the next generation of engineers, designers, and data scientists build real-world skills through hands-on learning.
          </p>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-mono tracking-wider text-[var(--text-primary)] uppercase font-bold mb-3">Academy</h4>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li><a href="#courses-gallery" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Courses</a></li>
            <li><a href="#how-it-works" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> How It Works</a></li>
            <li><a href="#learning-paths" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><Award className="w-3.5 h-3.5" /> Certifications</a></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-mono tracking-wider text-[var(--text-primary)] uppercase font-bold mb-3">Company</h4>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li><a href="#" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><CircleHelp className="w-3.5 h-3.5" /> About</a></li>
            <li><a href="#" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Contact</a></li>
            <li><a href="#" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> LinkedIn</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-mono tracking-wider text-[var(--text-primary)] uppercase font-bold mb-3">Legal</h4>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li><a href="#" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Privacy</a></li>
            <li><a href="#" className="hover:text-[var(--text-primary)] transition inline-flex items-center gap-2"><FileSpreadsheet className="w-3.5 h-3.5" /> Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-[var(--border-subtle)] text-[var(--text-muted)] text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} NeXiv.EDU. All rights reserved.</span>
        <span className="text-[10px] font-mono">🔒 SSL Secured · 🌐 Global Access</span>
      </div>
    </footer>
  );
}

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import TopBar from '../layout/TopBar';
import Hero from './Hero';
import LearningPaths from './LearningPaths';
import CourseGrid from './CourseGrid';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import Footer from './Footer';
import SkipLink from '../ui/SkipLink';
import Button from '../ui/Button';
import ScrollToTop from '../ui/ScrollToTop';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';

export default function LandingPage() {
  const { navigate } = useNavigation();
  const { courses } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => { setMobileMenuOpen(false); navigate('auth', { role: 'student' }); };
  const handleAdminLogin = () => { setMobileMenuOpen(false); navigate('auth', { role: 'admin' }); };
  const handleSelectCourse = (course) => navigate('auth', { role: 'student', course });
  const handleExploreCourses = () => {
    document.getElementById('courses-gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Courses', href: '#courses-gallery' },
    { label: 'Learning Paths', href: '#learning-paths' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  // Scroll-triggered reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] relative overflow-hidden">
      {/* Background Decorative Ambient Blur Orbs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-2/3 -right-64 w-96 h-96 bg-[#22d3ee]/10 rounded-full blur-[120px] pointer-events-none" />

      <SkipLink />

      {/* Navigation */}
      <TopBar
        rightContent={
          <div className="flex items-center gap-3">
            <button onClick={handleGetStarted} className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition px-3 py-2 cursor-pointer hidden sm:block">
              Log In
            </button>
            <Button size="sm" onClick={handleGetStarted} className="hidden sm:inline-flex">
              Get Started
            </Button>
            <button onClick={handleAdminLogin} className="text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--accent-hover)] hover:text-[var(--text-primary)] transition cursor-pointer hidden lg:block pl-4 border-l border-[var(--border-default)]">
              Admin
            </button>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-[var(--bg-elevated)]/60 border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        }
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center text-white font-mono font-black text-base shadow-lg shadow-[var(--accent-glow)]">N</div>
          <span className="font-extrabold text-base text-[var(--text-primary)] group-hover:text-[var(--accent-hover)] transition tracking-tight">
            NeXiv<span className="text-[var(--accent-hover)]">.EDU</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 ml-8 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]" aria-label="Primary navigation">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} className="hover:text-[var(--text-primary)] transition">
              {link.label}
            </a>
          ))}
        </nav>
      </TopBar>

      {/* Mobile Slide-out Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-72 z-50 bg-[var(--bg-root)] border-l border-[var(--border-default)] shadow-2xl flex flex-col md:hidden transition-transform duration-400 ease-[var(--ease-spring)]
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center text-white font-mono font-black text-sm shadow-lg">N</div>
            <span className="font-extrabold text-base text-[var(--text-primary)] tracking-tight">
              NeXiv<span className="text-[var(--accent-hover)]">.EDU</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col p-5 gap-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/60 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="mt-auto p-5 border-t border-[var(--border-subtle)] space-y-3">
          <Button size="sm" onClick={handleGetStarted} className="w-full justify-center">
            Get Started Free
          </Button>
          <button
            onClick={handleGetStarted}
            className="w-full text-center text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition py-2"
          >
            Log In
          </button>
          <button
            onClick={handleAdminLogin}
            className="w-full text-center text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--accent-hover)] hover:text-[var(--text-primary)] transition py-1"
          >
            Admin Portal
          </button>
        </div>
      </aside>

      <main id="main-content">
        <Hero onGetStarted={handleGetStarted} onExploreCourses={handleExploreCourses} />

        <div className="reveal">
          <LearningPaths courses={courses} onSelectCourse={handleSelectCourse} />
        </div>
        <div className="reveal">
          <CourseGrid courses={courses} onSelectCourse={handleSelectCourse} />
        </div>
        <div className="reveal">
          <HowItWorks />
        </div>
        <div className="reveal">
          <Testimonials />
        </div>
        <div className="reveal">
          <CTASection onGetStarted={handleGetStarted} />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import TopBar from '../layout/TopBar';
import Hero from './Hero';
import LearningPaths from './LearningPaths';
import CourseGrid from './CourseGrid';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import Footer from './Footer';
import ThemeToggle from '../ui/ThemeToggle';
import SkipLink from '../ui/SkipLink';
import Button from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';

export default function LandingPage() {
  const { navigate } = useNavigation();
  const { courses } = useAuth();

  const handleGetStarted = () => navigate('auth', { role: 'student' });
  const handleAdminLogin = () => navigate('auth', { role: 'admin' });
  const handleSelectCourse = (course) => navigate('auth', { role: 'student', course });
  const handleExploreCourses = () => {
    document.getElementById('courses-gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll-triggered reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)]">
      <SkipLink />

      {/* Navigation */}
      <TopBar
        rightContent={
          <div className="flex items-center gap-3">
            <button onClick={handleGetStarted} className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition px-2 py-1.5 cursor-pointer hidden sm:block">
              Log In
            </button>
            <Button size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
            <button onClick={handleAdminLogin} className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition cursor-pointer hidden md:block pl-3 border-l border-[var(--border-default)]">
              Admin
            </button>
          </div>
        }
      >
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-mono font-black text-base shadow-md shadow-[var(--accent-glow)]">N</div>
          <span className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent)] transition tracking-tight">
            NeXiv<span className="text-[var(--accent)]">.EDU</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 ml-8 text-sm text-[var(--text-secondary)]" aria-label="Primary navigation">
          {[
            { label: 'Courses', href: '#courses-gallery' },
            { label: 'Learning Paths', href: '#learning-paths' },
            { label: 'How It Works', href: '#how-it-works' },
          ].map((link, i) => (
            <a key={i} href={link.href} className="hover:text-[var(--text-primary)] transition font-medium">
              {link.label}
            </a>
          ))}
        </nav>
      </TopBar>

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
    </div>
  );
}

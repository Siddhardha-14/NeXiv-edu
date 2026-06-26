import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ onGetStarted, onExploreCourses }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-orb absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />
        <div className="hero-orb absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col items-start gap-6">
          <div className="hero-badge-in flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 bg-[var(--accent-muted)] text-[var(--accent)] text-[10px] font-mono uppercase font-bold tracking-widest px-3.5 py-2 rounded-full border border-[var(--accent)]/20">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Now Enrolling — Summer 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[var(--bg-elevated)] text-[var(--text-secondary)] text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-full border border-[var(--border-default)]">
              <Award className="w-3 h-3 text-amber-400" /> Certified
            </span>
          </div>

          <h1 className="hero-fade-up-1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-[var(--text-primary)]">
            Build Real Skills.{' '}
            <span className="hero-shimmer">Land Real Jobs.</span>
          </h1>

          <p className="hero-fade-up-2 text-[var(--text-secondary)] text-base lg:text-lg leading-relaxed max-w-lg">
            Go from beginner to job-ready with hands-on courses in{' '}
            <span className="text-[var(--text-primary)] font-medium">UI/UX Design</span>,{' '}
            <span className="text-[var(--text-primary)] font-medium">Data Science</span>,{' '}
            <span className="text-[var(--text-primary)] font-medium">Embedded Systems</span>, and{' '}
            <span className="text-[var(--text-primary)] font-medium">AI Prototyping</span>. 
            Earn verified certificates — 100% free.
          </p>

          <div className="hero-fade-up-3 flex flex-wrap gap-3 pt-1">
            <Button size="lg" onClick={onExploreCourses} iconRight={ArrowRight}>
              Explore Courses
            </Button>
            <Button variant="secondary" size="lg" onClick={onGetStarted}>
              Get Started Free
            </Button>
          </div>

          <div className="hero-fade-up-4 flex items-center gap-8 pt-4 border-t border-[var(--border-subtle)] w-full flex-wrap">
            {[
              { val: '15K+', label: 'Students' },
              { val: '6', label: 'Career Tracks' },
              { val: '98%', label: 'Completion' },
              { val: 'Free', label: 'Forever' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="text-xl font-bold text-[var(--text-primary)] font-mono leading-none">{stat.val}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual card */}
        <div className="hidden lg:block relative hero-image-in">
          <div className="hero-float relative">
            <div className="aspect-[4/3] bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] shadow-[var(--shadow-xl)] overflow-hidden p-3 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent pointer-events-none z-10 rounded-2xl" />
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop"
                referrerPolicy="no-referrer"
                alt="Students collaborating on a design project"
                className="w-full h-full object-cover rounded-xl brightness-[85%] transition duration-700 hover:brightness-100 hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute top-5 right-5 z-20 bg-[var(--accent)]/90 backdrop-blur-md text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-white" />
                Live Learning
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="float-card-a absolute -top-6 -left-6 z-20 bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--border-default)] rounded-2xl px-4 py-3 shadow-[var(--shadow-lg)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div>
              <div className="text-[11px] font-bold text-[var(--text-primary)] leading-none mb-0.5">Certificate Issued</div>
              <div className="text-[9px] font-mono uppercase text-emerald-400 tracking-wider">UI/UX Design ✓</div>
            </div>
          </div>

          <div className="float-card-b absolute -bottom-4 -right-4 z-20 bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--border-default)] rounded-2xl px-4 py-3 shadow-[var(--shadow-lg)]">
            <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">Progress</div>
            <div className="space-y-2 min-w-[130px]">
              {[
                { label: 'Data Science', pct: 82, color: 'bg-[var(--accent)]' },
                { label: 'UI/UX', pct: 65, color: 'bg-emerald-500' },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[8px] font-mono text-[var(--text-muted)]">{t.label}</span>
                    <span className="text-[8px] font-mono text-[var(--text-primary)] font-bold">{t.pct}%</span>
                  </div>
                  <div className="h-1 bg-[var(--bg-inset)] rounded-full overflow-hidden">
                    <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

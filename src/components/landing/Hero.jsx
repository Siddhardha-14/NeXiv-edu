import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero({ onGetStarted, onExploreCourses }) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden py-12 sm:py-16" aria-label="Hero">
      {/* Decorative Aurora Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full opacity-[0.25] hero-orb"
        style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />
      <div className="absolute top-1/3 -right-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full opacity-[0.2] hero-orb"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)' }} />
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col items-start gap-5 sm:gap-6">
          <div className="flex items-center gap-3 flex-wrap animate-[fadeIn_0.6s_ease-out]">
            <span className="inline-flex items-center gap-2 bg-[var(--accent-muted)] text-[var(--accent-hover)] text-[9px] font-mono uppercase font-bold tracking-widest px-3.5 py-1.5 rounded-full border border-[var(--accent)]/30">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Now Enrolling — Summer 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[var(--bg-elevated)]/60 text-[var(--text-secondary)] text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-[var(--border-default)]">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Certified
            </span>
          </div>

          <h1 className="hero-fade-up-1 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] text-[var(--text-primary)]">
            Build Real Skills.{' '}
            <span className="hero-shimmer">Land Real Jobs.</span>
          </h1>

          <p className="hero-fade-up-2 text-[var(--text-secondary)] text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
            Go from beginner to job-ready with hands-on courses in{' '}
            <span className="text-[var(--text-primary)] font-bold">UI/UX Design</span>,{' '}
            <span className="text-[var(--text-primary)] font-bold">Data Science</span>,{' '}
            <span className="text-[var(--text-primary)] font-bold">Embedded Systems</span>, and{' '}
            <span className="text-[var(--text-primary)] font-bold">AI Prototyping</span>. 
            Earn verified certificates — 100% free.
          </p>

          <div className="hero-fade-up-3 flex flex-wrap gap-3 sm:gap-4 pt-2">
            <Button size="lg" onClick={onExploreCourses} iconRight={ArrowRight}>
              Explore Courses
            </Button>
            <Button variant="secondary" size="lg" onClick={onGetStarted}>
              Get Started Free
            </Button>
          </div>

          <div className="hero-fade-up-4 flex items-center gap-5 sm:gap-8 pt-5 sm:pt-6 border-t border-[var(--border-subtle)] w-full flex-wrap">
            {[
              { val: '15K+', label: 'Students' },
              { val: '6', label: 'Career Tracks' },
              { val: '98%', label: 'Completion' },
              { val: 'Free', label: 'Forever' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-mono leading-none tracking-tight">{stat.val}</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--text-muted)] mt-1.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual layout with floating glass panels (desktop only) */}
        <div className="hidden lg:block relative w-full h-[400px]">
          {/* Main Visual Image Card */}
          <div className="float-card-a absolute right-10 top-0 w-10/12 aspect-[4/3] bg-[var(--bg-card)] rounded-3xl border border-[var(--border-default)] shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden p-3.5">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/15 via-transparent to-transparent pointer-events-none z-10" />
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop"
              referrerPolicy="no-referrer"
              alt="Students collaborating on a design project"
              className="w-full h-full object-cover rounded-2xl brightness-[85%] transition duration-700 hover:brightness-100 hover:scale-[1.01]"
              loading="lazy"
            />
            <div className="absolute top-6 right-6 z-20 bg-[var(--accent)]/90 backdrop-blur-md text-white text-[8px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg border border-white/10">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Classroom
            </div>
          </div>

          {/* Floating Card A: Certificate Issued */}
          <div className="float-card-b absolute top-12 -left-4 z-20 bg-[var(--bg-surface)]/90 backdrop-blur-xl border border-[var(--border-hover)] rounded-2xl px-4.5 py-3.5 shadow-2xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div>
              <div className="text-[11px] font-extrabold text-[var(--text-primary)] leading-none mb-1">Certificate Issued</div>
              <div className="text-[8px] font-mono uppercase text-emerald-400 tracking-wider">UI/UX Design ✓</div>
            </div>
          </div>

          {/* Floating Card B: Progress Tracking */}
          <div className="float-card-a absolute -bottom-6 right-0 z-20 bg-[var(--bg-surface)]/90 backdrop-blur-xl border border-[var(--border-hover)] rounded-2xl px-5 py-4 shadow-2xl">
            <div className="text-[8px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Live Progress</div>
            <div className="space-y-2.5 min-w-[150px]">
              {[
                { label: 'Data Science', pct: 82, color: 'bg-[var(--accent)]' },
                { label: 'UI/UX Design', pct: 65, color: 'bg-emerald-500' },
              ].map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] font-mono text-[var(--text-tertiary)]">{t.label}</span>
                    <span className="text-[8px] font-mono text-[var(--text-primary)] font-bold">{t.pct}%</span>
                  </div>
                  <div className="h-1 bg-[var(--bg-inset)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                    <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Visual Preview Card */}
        <div className="lg:hidden relative w-full rounded-2xl overflow-hidden border border-[var(--border-default)] shadow-xl aspect-video">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
            referrerPolicy="no-referrer"
            alt="Students collaborating"
            className="w-full h-full object-cover brightness-[75%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-root)]/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-hover)] rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-mono uppercase tracking-wider text-white font-bold">Live Classroom</span>
            </div>
            <div className="bg-[var(--accent)]/90 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white font-bold">Certified ✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

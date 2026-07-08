import React from 'react';
import { BookOpen, Target, Award } from 'lucide-react';
import Card from '../ui/Card';

export default function HowItWorks() {
  const steps = [
    { step: '01', icon: BookOpen, title: 'Pick a Course', description: 'Browse expert-designed tracks. From UI/UX to AI — find the skill that matches your career goals.' },
    { step: '02', icon: Target, title: 'Learn & Practice', description: 'Work through bite-sized lessons, get instant help from your AI tutor, and prove understanding with knowledge checks.' },
    { step: '03', icon: Award, title: 'Get Certified', description: 'Complete every lesson, pass the quiz, and earn a verified digital certificate to share anywhere.' },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[var(--bg-surface)]/20 border-t border-[var(--border-subtle)]" aria-label="How It Works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-hover)] to-[#06b6d4] text-[9px] font-mono font-bold uppercase tracking-widest block mb-2">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">How It Works</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Three steps to go from curious learner to certified professional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
          {/* Neon connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-[1.5px] bg-gradient-to-r from-[var(--accent)] via-[#22d3ee] to-[var(--accent-hover)] opacity-35" />

          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} variant="flat" className="text-center flex flex-col items-center gap-5 group hover:-translate-y-1.5 hover:border-[var(--accent-hover)] hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)] transition-all duration-500 ease-[var(--ease-spring)] p-8">
                <div className="w-14 h-14 rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent-hover)] group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-mono font-bold text-[var(--accent-hover)] uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-base font-extrabold text-[var(--text-primary)] tracking-tight">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-xs">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

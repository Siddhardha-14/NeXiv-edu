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
    <section id="how-it-works" className="py-20 bg-[var(--bg-surface)]" aria-label="How It Works">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[var(--accent)] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">Simple Process</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">How It Works</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Three steps to go from curious learner to certified professional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[33%] right-[33%] h-px bg-gradient-to-r from-[var(--accent)]/30 via-[var(--border-default)] to-[var(--accent)]/30" />

          {steps.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} variant="flat" className="text-center flex flex-col items-center gap-4 group hover:-translate-y-1 hover:border-[var(--border-hover)] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)]/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

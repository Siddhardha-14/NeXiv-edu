import React from 'react';
import { Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function CTASection({ onGetStarted }) {
  return (
    <section className="py-16 px-6" aria-label="Call to Action">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[var(--bg-card)] to-[var(--accent-muted)] rounded-2xl border border-[var(--border-default)] p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden transition-colors duration-500 shadow-[var(--shadow-lg)]">
          <div className="md:col-span-8 flex flex-col items-start gap-4 z-10">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-muted)] border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight max-w-xl">
              Ready to Level Up?
            </h3>
            <p className="text-[var(--text-secondary)] text-sm max-w-lg leading-relaxed">
              Join 15,000+ students already building real-world skills. Pick a course, learn at your own pace, and walk away with a verified certificate.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end z-10">
            <Button variant="accent" size="lg" onClick={onGetStarted}>
              Start Learning Free
            </Button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[var(--accent)]/5 to-transparent opacity-50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

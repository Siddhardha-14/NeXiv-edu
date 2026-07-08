import React from 'react';
import { Zap } from 'lucide-react';
import Button from '../ui/Button';

export default function CTASection({ onGetStarted }) {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6" aria-label="Call to Action">
      <div className="max-w-7xl mx-auto">
        {/* Luminous Animated Call to Action Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-hover)] p-8 sm:p-10 md:p-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center bg-gradient-to-br from-[var(--bg-surface)] to-[var(--accent-muted)] backdrop-blur-xl shadow-2xl">
          {/* Animated background mesh highlight */}
          <div className="absolute inset-0 bg-radial-[circle_at_right_bottom,var(--accent)_0%,transparent_60%] opacity-20 pointer-events-none" />
          
          <div className="md:col-span-8 flex flex-col items-start gap-3 sm:gap-4 z-10">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-[var(--accent-muted)] border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent-hover)] shadow-lg">
              <Zap className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight max-w-xl">
              Ready to Level Up?
            </h3>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-lg leading-relaxed">
              Join 15,000+ students already building real-world skills. Pick a course, learn at your own pace, and walk away with a verified certificate.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-start md:justify-end z-10">
            <Button variant="accent" size="lg" onClick={onGetStarted} className="shadow-2xl w-full sm:w-auto justify-center">
              Start Learning Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

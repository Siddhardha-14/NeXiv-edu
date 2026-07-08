import React, { useState, useRef, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const testimonials = [
  { name: 'Priya Sharma', role: 'UX Designer at Razorpay', quote: 'The UI/UX track completely changed how I approach design problems. The AI tutor was like having a senior mentor available 24/7. I landed my dream role two months after finishing.', stars: 5, course: 'UI/UX Design' },
  { name: 'Daniel Kim', role: 'Data Analyst at Stripe', quote: 'I tried three other platforms before NeXiv. The difference? Here you actually build things. The knowledge checks forced me to truly understand the concepts, not just memorize them.', stars: 5, course: 'Data Analysis' },
  { name: 'Amara Okafor', role: 'IoT Engineer at Siemens', quote: 'From zero embedded systems knowledge to building my own sensor network in 8 weeks. The lesson content is incredibly well-written and the quizzes are genuinely challenging.', stars: 5, course: 'Embedded Systems' },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 4500);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    clearInterval(intervalRef.current);
    setActive(idx);
    startAutoplay();
  };

  return (
    <section className="py-16 sm:py-24 border-t border-[var(--border-subtle)]" aria-label="Student Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-hover)] to-[#06b6d4] text-[9px] font-mono font-bold uppercase tracking-widest block mb-2">
            Student Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">What Students Say</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Real feedback from learners who built their skills on NeXiv.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} variant="interactive" className="flex flex-col justify-between p-6 min-h-[300px]">
              <div>
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-[var(--accent-hover)]/30 mb-3.5" />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">"{t.quote}"</p>
              </div>
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3.5">
                <Avatar name={t.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-extrabold text-[var(--text-primary)] block leading-tight">{t.name}</span>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] block mt-0.5">{t.role}</span>
                </div>
                <Badge variant="primary" className="shrink-0">{t.course}</Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-[var(--ease-spring)]"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0">
                  <Card variant="interactive" className="flex flex-col justify-between p-5 min-h-[260px]">
                    <div>
                      <div className="flex items-center gap-0.5 mb-3">
                        {Array.from({ length: t.stars }).map((_, si) => (
                          <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-4 h-4 text-[var(--accent-hover)]/30 mb-2.5" />
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">"{t.quote}"</p>
                    </div>
                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3 mt-4">
                      <Avatar name={t.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-extrabold text-[var(--text-primary)] block">{t.name}</span>
                        <span className="text-[9px] font-mono text-[var(--text-muted)] block mt-0.5">{t.role}</span>
                      </div>
                      <Badge variant="primary" className="shrink-0 text-[7px]">{t.course}</Badge>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots + Controls */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
              className="w-8 h-8 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === active ? 'w-5 h-2 bg-[var(--accent)]' : 'w-2 h-2 bg-[var(--text-muted)]/40 hover:bg-[var(--text-muted)]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo((active + 1) % testimonials.length)}
              className="w-8 h-8 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

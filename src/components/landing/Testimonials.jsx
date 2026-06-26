import React from 'react';
import { Star, Quote } from 'lucide-react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const testimonials = [
  { name: 'Priya Sharma', role: 'UX Designer at Razorpay', quote: 'The UI/UX track completely changed how I approach design problems. The AI tutor was like having a senior mentor available 24/7. I landed my dream role two months after finishing.', stars: 5, course: 'UI/UX Design' },
  { name: 'Daniel Kim', role: 'Data Analyst at Stripe', quote: 'I tried three other platforms before NeXiv. The difference? Here you actually build things. The knowledge checks forced me to truly understand the concepts, not just memorize them.', stars: 5, course: 'Data Analysis' },
  { name: 'Amara Okafor', role: 'IoT Engineer at Siemens', quote: 'From zero embedded systems knowledge to building my own sensor network in 8 weeks. The lesson content is incredibly well-written and the quizzes are genuinely challenging.', stars: 5, course: 'Embedded Systems' },
];

export default function Testimonials() {
  return (
    <section className="py-20" aria-label="Student Testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-[var(--accent)] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">Student Reviews</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">What Students Say</h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed">
            Real feedback from learners who built their skills on NeXiv.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} variant="interactive" className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-4 h-4 text-[var(--accent)]/30 mb-2" />
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{t.quote}</p>
              </div>
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-3">
                <Avatar name={t.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-[var(--text-primary)] block leading-tight">{t.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)] block">{t.role}</span>
                </div>
                <Badge variant="primary">{t.course}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

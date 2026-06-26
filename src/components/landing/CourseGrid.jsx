import React from 'react';
import { ArrowRight, Clock, Award } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function CourseGrid({ courses, onSelectCourse }) {
  return (
    <section id="courses-gallery" className="py-24 bg-[var(--bg-root)]" aria-label="Course Catalog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-[var(--accent)] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">Full Catalog</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Available Programs
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-sm leading-relaxed">
            Acquire deep domain knowledge through structured, industry-aligned lessons, verified certifications, and interactive quizzes.
          </p>
        </div>

        {/* Bento Grid layout for courses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => {
            const isWide = index === 0 || index === 3;

            if (isWide) {
              // Featured horizontal split card layout (occupies 2 columns on desktop)
              return (
                <div
                  key={course.id}
                  className="col-span-1 md:col-span-2 group relative overflow-hidden rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent-hover)]/30 hover:shadow-xl hover:shadow-[var(--accent-glow)] transition-all duration-300 flex flex-col md:flex-row min-h-[300px]"
                >
                  {/* Left panel: Image */}
                  <div className="md:w-5/12 h-52 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={course.imageUrl}
                      referrerPolicy="no-referrer"
                      alt={course.title}
                      className="w-full h-full object-cover brightness-[85%] group-hover:scale-105 group-hover:brightness-[95%] duration-700 transition"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-4 left-4 bg-[var(--bg-surface)]/90 backdrop-blur-sm text-[var(--text-primary)] text-[9px] font-mono font-bold tracking-wider px-3 py-1 rounded-full border border-[var(--border-default)] flex items-center gap-1 shadow-sm">
                      <Clock className="w-3 h-3 text-[var(--accent)]" /> {course.duration}
                    </span>
                  </div>

                  {/* Right panel: Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
                          {course.category}
                        </span>
                        <span className="text-[9px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">
                          {course.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-6 max-w-lg">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {course.skills.slice(0, 4).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-mono bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] px-2.5 py-1 rounded-lg">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-muted)]">
                        <Award className="w-3.5 h-3.5 text-[var(--accent)]" /> Verifiable Cert
                      </div>
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="text-xs font-bold uppercase tracking-wider text-[var(--accent-hover)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer transition group/arrow"
                      >
                        Enroll Now <ArrowRight className="w-3.5 h-3.5 group-hover/arrow:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Standard vertical card layout (occupies 1 column)
              return (
                <div
                  key={course.id}
                  className="col-span-1 group relative overflow-hidden rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent-hover)]/30 hover:shadow-xl hover:shadow-[var(--accent-glow)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.imageUrl}
                        referrerPolicy="no-referrer"
                        alt={course.title}
                        className="w-full h-full object-cover brightness-[85%] group-hover:scale-105 group-hover:brightness-[95%] duration-700 transition"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      
                      <span className="absolute top-4 left-4 bg-[var(--bg-surface)]/90 backdrop-blur-sm text-[var(--text-primary)] text-[9px] font-mono font-bold tracking-wider px-3 py-1 rounded-full border border-[var(--border-default)] flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3 text-[var(--accent)]" /> {course.duration}
                      </span>
                    </div>

                    {/* Content padding */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-mono font-bold text-[var(--accent)] uppercase tracking-wider">
                          {course.category}
                        </span>
                        <span className="text-[9px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                          {course.difficulty}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] tracking-tight mb-2 truncate">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 mt-auto">
                    <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-muted)]">
                        <Award className="w-3.5 h-3.5 text-[var(--accent)]" /> Verifiable Cert
                      </div>
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="text-xs font-bold uppercase tracking-wider text-[var(--accent-hover)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer transition group/arrow"
                      >
                        Enroll Now <ArrowRight className="w-3.5 h-3.5 group-hover/arrow:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

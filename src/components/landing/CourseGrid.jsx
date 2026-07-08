import React from 'react';
import { ArrowRight, Clock, Award } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

export default function CourseGrid({ courses, onSelectCourse }) {
  return (
    <section id="courses-gallery" className="py-16 sm:py-24 bg-[var(--bg-root)]" aria-label="Course Catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-hover)] to-[#06b6d4] text-[9px] font-mono font-bold uppercase tracking-widest block mb-2">
            Full Catalog
          </span>
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
                  className="col-span-1 md:col-span-2 group relative overflow-hidden rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent-hover)] hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.6),0_0_20px_var(--accent-glow)] transition-all duration-500 ease-[var(--ease-spring)] flex flex-col md:flex-row min-h-[300px]"
                >
                  {/* Left panel: Image */}
                  <div className="md:w-5/12 h-52 md:h-auto relative overflow-hidden shrink-0">
                    <img
                      src={course.imageUrl}
                      referrerPolicy="no-referrer"
                      alt={course.title}
                      className="w-full h-full object-cover brightness-[80%] group-hover:scale-105 group-hover:brightness-[90%] duration-700 transition ease-[var(--ease-spring)]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--bg-root)] via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-4 left-4 bg-[var(--bg-surface)]/90 backdrop-blur-md text-[var(--text-primary)] text-[8px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-xl border border-[var(--border-default)] flex items-center gap-1.5 shadow-md">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-hover)]" /> {course.duration}
                    </span>
                  </div>

                  {/* Right panel: Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-gradient-to-br from-transparent to-[var(--bg-card)]/30">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-mono font-bold text-[var(--accent-hover)] uppercase tracking-widest">
                          {course.category}
                        </span>
                        <span className="text-[8px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] px-2.5 py-1 rounded-xl uppercase font-bold tracking-widest">
                          {course.difficulty}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)] tracking-tight mb-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-6 max-w-lg">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.skills.slice(0, 4).map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-mono bg-[var(--bg-elevated)]/40 text-[var(--text-secondary)] border border-[var(--border-default)] px-3 py-1.5 rounded-xl backdrop-blur-md">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        <Award className="w-4 h-4 text-[var(--accent-hover)]" /> Verifiable Cert
                      </div>
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent-hover)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer transition duration-300 group/arrow"
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
                  className="col-span-1 group relative overflow-hidden rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--accent-hover)] hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.6),0_0_20px_var(--accent-glow)] transition-all duration-500 ease-[var(--ease-spring)] flex flex-col justify-between"
                >
                  <div>
                    {/* Top image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.imageUrl}
                        referrerPolicy="no-referrer"
                        alt={course.title}
                        className="w-full h-full object-cover brightness-[80%] group-hover:scale-105 group-hover:brightness-[90%] duration-700 transition ease-[var(--ease-spring)]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-root)] via-transparent to-transparent pointer-events-none" />
                      
                      <span className="absolute top-4 left-4 bg-[var(--bg-surface)]/90 backdrop-blur-md text-[var(--text-primary)] text-[8px] font-mono font-bold tracking-widest px-3 py-1.5 rounded-xl border border-[var(--border-default)] flex items-center gap-1.5 shadow-md">
                        <Clock className="w-3.5 h-3.5 text-[var(--accent-hover)]" /> {course.duration}
                      </span>
                    </div>

                    {/* Content padding */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-mono font-bold text-[var(--accent-hover)] uppercase tracking-widest">
                          {course.category}
                        </span>
                        <span className="text-[8px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] px-2.5 py-1 rounded-xl uppercase font-bold tracking-widest">
                          {course.difficulty}
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-[var(--text-primary)] tracking-tight mb-2 truncate">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 mt-auto">
                    <div className="pt-4.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        <Award className="w-4 h-4 text-[var(--accent-hover)]" /> Verifiable Cert
                      </div>
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--accent-hover)] hover:text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer transition duration-300 group/arrow"
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

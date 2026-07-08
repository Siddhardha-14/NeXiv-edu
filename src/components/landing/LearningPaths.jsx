import React from 'react';
import { ArrowRight, PenTool, BarChart3, Cpu, Wifi, Palette, Brain, Layers } from 'lucide-react';
import { BentoGrid, BentoCard } from '../ui/BentoGrid';
import { categoryColors } from '../../data/courses';

const categoryHexColors = {
  'UI/UX Design': '#a78bfa',
  'Data Analysis': '#10b981',
  'Embedded Systems': '#f97316',
  'IoT Basics': '#06b6d4',
  'Graphic Design': '#ec4899',
  'AI Production': '#f59e0b',
};

function getCategoryIcon(category) {
  const icons = {
    'UI/UX Design': PenTool,
    'Data Analysis': BarChart3,
    'Embedded Systems': Cpu,
    'IoT Basics': Wifi,
    'Graphic Design': Palette,
    'AI Production': Brain,
  };
  return icons[category] || Layers;
}

export default function LearningPaths({ courses, onSelectCourse }) {
  return (
    <section id="learning-paths" className="py-16 sm:py-24 bg-[var(--bg-surface)]/20 border-t border-[var(--border-subtle)]" aria-label="Learning Paths">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-hover)] to-[#06b6d4] text-[9px] font-mono font-bold uppercase tracking-widest block mb-2">
            Learning Paths
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            Choose Your Specialization
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl text-sm leading-relaxed">
            Structured micro-learning tracks built for 2026 skills. Progress from foundational concepts to advanced production projects with active AI support.
          </p>
        </div>

        <BentoGrid>
          {courses.map((course, index) => {
            const Icon = getCategoryIcon(course.category);
            const hex = categoryHexColors[course.category] || '#7c3aed';
            
            // Layout styling configuration
            const isWide = index === 0 || index === 3;
            const spanClass = isWide ? 'md:col-span-2' : 'md:col-span-1';

            // Custom Background Graphic Overlay (Aurora Glass highlights)
            const backgroundGraphic = (
              <div className="absolute inset-0 pointer-events-none">
                {/* Visual grid network */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                {/* Glow Core */}
                <div 
                  className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle at 85% 15%, ${hex}20 0%, transparent 60%)`
                  }}
                />
                {/* Visual geometric accent */}
                <div 
                  className="absolute top-8 right-8 w-24 h-24 rounded-full filter blur-2xl opacity-15 group-hover:opacity-25 transition-all duration-700"
                  style={{ backgroundColor: hex }}
                />
              </div>
            );

            // Badge with metadata
            const courseBadge = (
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] px-3 py-1.5 rounded-xl shadow-sm">
                {course.difficulty}
              </span>
            );

            return (
              <BentoCard
                key={course.id}
                name={course.category}
                description={course.description}
                className={spanClass}
                Icon={Icon}
                badge={courseBadge}
                background={backgroundGraphic}
                cta="Explore path"
                onCtaClick={() => onSelectCourse(course)}
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

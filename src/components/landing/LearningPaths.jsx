import React from 'react';
import { ArrowRight, PenTool, BarChart3, Cpu, Wifi, Palette, Brain, Layers } from 'lucide-react';
import { BentoGrid, BentoCard } from '../ui/BentoGrid';
import { categoryColors } from '../../data/courses';

const categoryHexColors = {
  'UI/UX Design': '#a78bfa',
  'Data Analysis': '#34d399',
  'Embedded Systems': '#fb923c',
  'IoT Basics': '#22d3ee',
  'Graphic Design': '#f472b6',
  'AI Production': '#fbbf24',
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
    <section id="learning-paths" className="py-24 bg-[var(--bg-surface)]" aria-label="Learning Paths">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-[var(--accent)] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">Learning Paths</span>
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
            const colors = categoryColors[course.category];
            const hex = categoryHexColors[course.category] || '#6366f1';
            
            // Create an asymmetrical layout spanning 
            // Item 1: col-span-2, Item 2: col-span-1, Item 3: col-span-1, Item 4: col-span-2, Item 5: col-span-1, Item 6: col-span-1
            const isWide = index === 0 || index === 3;
            const spanClass = isWide ? 'md:col-span-2' : 'md:col-span-1';

            // Custom Background Graphic Overlay
            const backgroundGraphic = (
              <div className="absolute inset-0 pointer-events-none">
                {/* Grid Network */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
                {/* Glowing Core */}
                <div 
                  className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: `radial-gradient(circle at 85% 15%, ${hex}18 0%, transparent 60%)`
                  }}
                />
                {/* Visual geometric accent */}
                <div 
                  className="absolute top-10 right-10 w-24 h-24 rounded-full filter blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"
                  style={{ backgroundColor: hex }}
                />
              </div>
            );

            // Badge with metadata
            const courseBadge = (
              <span className="text-[9px] font-mono font-bold tracking-wider uppercase bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] px-2.5 py-1 rounded-full shadow-sm">
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

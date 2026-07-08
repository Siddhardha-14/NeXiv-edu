import React from 'react';
import { BookOpen, Compass, Award, Flame, ChevronRight, GraduationCap, Clock, Sparkles } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import Sidebar from '../layout/Sidebar';
import PageHeader from '../layout/PageHeader';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import ProgressRing from '../ui/ProgressRing';
import { BentoGrid, BentoCard } from '../ui/BentoGrid';
import ScrollToTop from '../ui/ScrollToTop';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { categoryColors } from '../../data/courses';

export default function StudentDashboard() {
  const { user, courses, enrollCourse, requestCertificate, logout } = useAuth();
  const { navigate } = useNavigation();

  if (!user) return null;
  const enrolledIds = Object.keys(user.progress);
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));
  const recommendedCourses = courses.filter(c => !enrolledIds.includes(c.id));
  const completedLessons = Object.values(user.lessonProgress).flat().length;

  const getGreeting = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  };

  const navItems = [
    { icon: BookOpen, label: 'My Courses' },
    { icon: Compass, label: 'Explore', badge: recommendedCourses.length },
    { icon: Award, label: 'Certificates' },
  ];

  const handleNavClick = (idx) => {
    const targets = [null, 'recommended-section', 'certifications-section'];
    if (targets[idx]) document.getElementById(targets[idx])?.scrollIntoView({ behavior: 'smooth' });
  };

  // Find the course with the highest progress that isn't 100% completed
  const activeCourse = enrolledCourses
    .filter(c => (user.progress[c.id] || 0) < 100)
    .sort((a, b) => (user.progress[b.id] || 0) - (user.progress[a.id] || 0))[0] || enrolledCourses[0];

  const sidebar = (
    <Sidebar
      role="student"
      user={user}
      navItems={navItems}
      activeItem={0}
      onNavClick={handleNavClick}
      onLogout={() => { logout(); navigate('home'); }}
      bottomAction={
        <Button size="sm" className="w-full" onClick={() => document.getElementById('recommended-section')?.scrollIntoView({ behavior: 'smooth' })}>
          View Catalog
        </Button>
      }
    />
  );

  return (
    <>
      <DashboardLayout sidebar={sidebar}>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-6xl">
        {/* Header */}
        <PageHeader
          eyebrow="Dashboard"
          title={`${getGreeting()}, ${user.name.split(' ')[0]}`}
          subtitle="Here's your learning overview. Continue a lesson, check progress, or explore something new."
          rightContent={
            <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2.5 rounded-full shadow-lg shadow-amber-500/5 backdrop-blur-md">
              <Flame className="w-4.5 h-4.5 fill-amber-500 animate-pulse text-amber-500" />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{user.streak}-day streak</span>
            </div>
          }
        />

        {/* Bento Dashboard Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          
          {/* Bento Card 1: Main Resume Learning Card (2 Columns wide) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2 relative overflow-hidden rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 sm:p-6 flex flex-col justify-between min-h-[260px] sm:min-h-[300px] shadow-lg backdrop-blur-xl">
            {/* Visual gradient backdrop */}
            <div className="absolute inset-0 bg-radial-[circle_at_right_top,var(--accent)_0%,transparent_65%] opacity-[0.12] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40 pointer-events-none" />
            
            <div className="z-10 w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[var(--accent-hover)] bg-[var(--accent-muted)] px-3 py-1.5 rounded-xl border border-[var(--accent)]/25">
                  Resume Learning
                </span>
                {activeCourse && (
                  <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                    {user.progress[activeCourse.id] || 0}% Completed
                  </span>
                )}
              </div>

              {activeCourse ? (
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
                    {activeCourse.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-6 max-w-md leading-relaxed">
                    Next up: {activeCourse.lessons[(user.lessonProgress[activeCourse.id] || []).length]?.title || activeCourse.lessons[0].title}
                  </p>
                  <div className="max-w-md mb-6">
                    <ProgressBar value={user.progress[activeCourse.id] || 0} showLabel={false} />
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <BookOpen className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2.5" />
                  <p className="text-xs text-[var(--text-secondary)]">You are not enrolled in any programs yet.</p>
                </div>
              )}
            </div>

            <div className="z-10 pt-4.5 border-t border-[var(--border-subtle)] flex items-center justify-between">
              {activeCourse ? (
                <>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    {(user.lessonProgress[activeCourse.id] || []).length} of {activeCourse.lessons.length} Units Finished
                  </span>
                  <Button
                    size="sm"
                    onClick={() => navigate('lesson-view', { courseId: activeCourse.id })}
                    iconRight={ChevronRight}
                  >
                    Resume classroom
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => document.getElementById('recommended-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Browse Courses
                </Button>
              )}
            </div>
          </div>

          {/* Bento Card 2: Weekly Progress Ring */}
          <div className="col-span-1 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 sm:p-6 flex flex-col items-center justify-between min-h-[260px] sm:min-h-[300px] shadow-lg backdrop-blur-xl">
            <h3 className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-tertiary)] uppercase self-start">
              Goal Tracking
            </h3>
            
            <div className="my-3 transition-transform duration-300 hover:scale-105">
              <ProgressRing value={completedLessons} max={activeCourse ? activeCourse.lessons.length : 10} size={110}>
                <div className="text-center select-none">
                  <div className="text-2.5xl font-extrabold text-[var(--text-primary)] font-mono leading-none">{completedLessons}</div>
                  <div className="text-[7.5px] font-mono text-[var(--text-muted)] uppercase tracking-widest mt-1">Units Done</div>
                </div>
              </ProgressRing>
            </div>

            <div className="w-full pt-4.5 border-t border-[var(--border-subtle)] text-[9px] space-y-2 font-mono uppercase tracking-wider">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Quizzes Cleared</span>
                <span className="text-[var(--text-primary)] font-bold">{Object.keys(user.quizScores).length}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Streak Status</span>
                <span className="text-amber-400 font-bold">{user.streak} Days</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Other Enrolled Courses List (1 Column wide) */}
          {enrolledCourses.length > 1 && (
            <div className="col-span-1 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 sm:p-6 flex flex-col justify-between shadow-lg backdrop-blur-xl">
              <div>
                <h3 className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-tertiary)] uppercase mb-4.5">
                  Other enrollments
                </h3>
                <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1">
                  {enrolledCourses
                    .filter(c => c.id !== activeCourse?.id)
                    .map(course => (
                      <div
                        key={course.id}
                        onClick={() => navigate('lesson-view', { courseId: course.id })}
                        className="p-3 bg-[var(--bg-inset)]/60 border border-[var(--border-subtle)] hover:border-[var(--accent-hover)] hover:bg-[var(--bg-surface)] transition duration-300 rounded-2xl cursor-pointer flex justify-between items-center group"
                      >
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{course.title}</h4>
                          <span className="text-[9px] font-mono text-[var(--text-muted)]">{user.progress[course.id] || 0}% Complete</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-hover)] transition group-hover:translate-x-0.5" />
                      </div>
                    ))}
                </div>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Click any path to load materials.
              </div>
            </div>
          )}

          {/* Bento Card 4: Certificates Status List (2 Columns wide if other enrollments exist, else 3 columns) */}
          <div className={`${enrolledCourses.length > 1 ? 'col-span-1 sm:col-span-2 md:col-span-2' : 'col-span-1 sm:col-span-2 md:col-span-3'} rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] p-5 sm:p-6 flex flex-col justify-between shadow-lg backdrop-blur-xl`}>
            <div id="certifications-section">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Award className="w-4.5 h-4.5 text-[var(--accent-hover)]" />
                <h3 className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-secondary)] uppercase">
                  Verified Credentials
                </h3>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] mb-4">Complete paths and score at least 80% on lessons to request validation.</p>
              
              {enrolledCourses.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--text-muted)] font-mono">
                  Enroll in a path to unlock certificate options.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-1">
                  {enrolledCourses.map(course => {
                    const pct = user.progress[course.id] || 0;
                    const certStatus = user.certificates[course.id] || 'none';
                    return (
                      <div key={course.id} className="p-3 bg-[var(--bg-inset)]/60 border border-[var(--border-subtle)] rounded-2xl flex items-center justify-between gap-2.5">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{course.title}</h4>
                          <span className="text-[9px] font-mono text-[var(--text-muted)]">{pct}% complete</span>
                        </div>
                        <div className="shrink-0">
                          {certStatus === 'approved' ? (
                            <Button size="sm" variant="ghost" icon={Award} onClick={() => navigate('certificate', { courseId: course.id })} className="text-emerald-400 !px-2.5 !py-1.5">
                              View
                            </Button>
                          ) : certStatus === 'pending' ? (
                            <Badge variant="warning" dot className="!text-[8px]">Review</Badge>
                          ) : pct >= 100 ? (
                            <Button size="sm" className="!px-2.5 !py-1.5 !text-[8px]" onClick={() => requestCertificate(course.id)}>Request</Button>
                          ) : (
                            <span className="text-[8px] text-[var(--text-muted)] italic font-mono uppercase tracking-widest pl-2">Locked</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {enrolledCourses.length > 0 && (
              <div className="pt-3.5 mt-4 border-t border-[var(--border-subtle)] text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                Approved certificates support instant high-resolution printing.
              </div>
            )}
          </div>
        </div>

        {/* Recommended Learning tracks section */}
        <section id="recommended-section" className="mb-8 border-t border-[var(--border-subtle)] pt-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4.5 h-4.5 text-[var(--accent-hover)]" />
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight">AI Recommended Tracks</h2>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">Custom recommendations optimized for your profile.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {recommendedCourses.map((course, idx) => {
              const hex = categoryHexColors[course.category] || '#7c3aed';
              // Standard card visual details
              const cardBg = (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
                  <div 
                    className="absolute inset-0 transition-opacity duration-300 opacity-60"
                    style={{
                      background: `radial-gradient(circle at 90% 10%, ${hex}12 0%, transparent 50%)`
                    }}
                  />
                </div>
              );

              return (
                <BentoCard
                  key={course.id}
                  name={course.title}
                  description={course.description}
                  badge={
                    <span className="text-[8px] font-mono bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] px-2.5 py-1.5 rounded-xl font-bold tracking-widest uppercase">
                      {course.duration}
                    </span>
                  }
                  Icon={GraduationCap}
                  background={cardBg}
                  cta="Enroll Track"
                  onCtaClick={() => enrollCourse(course.id)}
                />
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
    <ScrollToTop />
    </>
  );
}

// Category color mappings from index.css to hex
const categoryHexColors = {
  'UI/UX Design': '#a78bfa',
  'Data Analysis': '#10b981',
  'Embedded Systems': '#f97316',
  'IoT Basics': '#06b6d4',
  'Graphic Design': '#ec4899',
  'AI Production': '#f59e0b',
};

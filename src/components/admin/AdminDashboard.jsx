import React, { useState } from 'react';
import {
  Shield,
  BookOpen,
  Award,
  Search,
  Check,
  Plus,
  CircleAlert,
  LogOut,
  X,
  FileSpreadsheet,
  TrendingUp,
  Cpu
} from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import Sidebar from '../layout/Sidebar';
import PageHeader from '../layout/PageHeader';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { Select } from '../ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';

export default function AdminDashboard() {
  const { user, courses, approvals, approveCertificate, addCourse, logout } = useAuth();
  const { navigate } = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Course fields
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('AI Production');
  const [newOverview, setNewOverview] = useState('');
  const [newDuration, setNewDuration] = useState('8 Weeks');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newSkills, setNewSkills] = useState('');

  // Lesson/Quiz fields
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [newQuizQuestion, setNewQuizQuestion] = useState('');
  const [newQuizOptions, setNewQuizOptions] = useState(['', '', '', '']);
  const [newQuizCorrect, setNewQuizCorrect] = useState(0);

  if (!user || user.role !== 'admin') return null;

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newTitle || !newOverview || !newLessonTitle || !newLessonContent || !newQuizQuestion) {
      alert('Please fill in course title, overview, first lesson content, and quiz details.');
      return;
    }

    const newCourseObj = {
      id: 'course-dyn-' + Math.random().toString(36).substring(2, 9),
      title: newTitle,
      description: newOverview,
      category: newCategory,
      duration: newDuration,
      difficulty: newDifficulty,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      skills: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      lessons: [
        {
          id: 'lesson-custom-1',
          title: newLessonTitle,
          duration: '45 Mins',
          content: newLessonContent,
          quiz: [
            {
              id: 'quiz-custom-1',
              question: newQuizQuestion,
              options: newQuizOptions.filter(Boolean),
              correctAnswer: parseInt(newQuizCorrect, 10),
            }
          ]
        }
      ]
    };

    addCourse(newCourseObj);
    setShowCreateModal(false);

    // Reset fields
    setNewTitle('');
    setNewOverview('');
    setNewLessonTitle('');
    setNewLessonContent('');
    setNewQuizQuestion('');
    setNewQuizOptions(['', '', '', '']);
    setNewQuizCorrect(0);
  };

  const handleOptionChange = (idx, val) => {
    setNewQuizOptions(prev => {
      const updated = [...prev];
      updated[idx] = val;
      return updated;
    });
  };

  const filteredApprovals = approvals.filter(item => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && item.status === statusFilter;
  });

  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;

  const sidebarNavItems = [
    { icon: FileSpreadsheet, label: 'Approval Queue' },
  ];

  const handleSidebarClick = () => {
    // Scroll to top of table
    document.getElementById('approvals-table-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const sidebar = (
    <Sidebar
      role="admin"
      user={user}
      navItems={sidebarNavItems}
      activeItem={0}
      onNavClick={handleSidebarClick}
      onLogout={() => { logout(); navigate('home'); }}
      bottomAction={
        <Button size="sm" className="w-full" onClick={() => setShowCreateModal(true)} icon={Plus}>
          New Course
        </Button>
      }
    />
  );

  return (
    <DashboardLayout sidebar={sidebar}>
      <div className="p-6 md:p-8 lg:p-10 max-w-6xl">
        {/* Header */}
        <PageHeader
          eyebrow="Admin Console"
          title="Operations Hub"
          subtitle="Review incoming course certificate requests, approve student credentials, or publish syllabus tracks."
          rightContent={
            <Button size="sm" onClick={() => setShowCreateModal(true)} icon={Plus}>
              Create Course
            </Button>
          }
        />

        {/* Admin KPI Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Total Courses */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex flex-col justify-between min-h-[140px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-radial-[circle_at_right_top,var(--accent)_0%,transparent_50%] opacity-[0.05] pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">Total Tracks</span>
              <BookOpen className="w-4 h-4 text-[var(--accent-hover)]" />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-[var(--text-primary)]">{courses.length}</div>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">Active syllabus tracks published</p>
            </div>
          </div>

          {/* Card 2: Pending Approvals */}
          <div className={`p-6 rounded-3xl bg-[var(--bg-surface)] border flex flex-col justify-between min-h-[140px] relative overflow-hidden group transition ${
            pendingApprovalsCount > 0 ? 'border-amber-500/20' : 'border-[var(--border-default)]'
          }`}>
            <div className="absolute inset-0 bg-radial-[circle_at_right_top,var(--warning)_0%,transparent_50%] opacity-[0.05] pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">Pending Approvals</span>
              <Award className={`w-4 h-4 ${pendingApprovalsCount > 0 ? 'text-amber-400 fill-amber-500/10' : 'text-[var(--text-muted)]'}`} />
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-[var(--text-primary)]">{pendingApprovalsCount}</div>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">Requests awaiting evaluation</p>
            </div>
          </div>

          {/* Card 3: Platform Level */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex flex-col justify-between min-h-[140px] relative overflow-hidden group">
            <div className="absolute inset-0 bg-radial-[circle_at_right_top,var(--success)_0%,transparent_50%] opacity-[0.05] pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">Operator Role</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-4">
              <div className="text-lg font-bold text-[var(--text-primary)] truncate uppercase tracking-tight">ROOT CONSOLE</div>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">Full publishing & validation scopes</p>
            </div>
          </div>

        </div>

        {/* Approvals Table Section */}
        <section id="approvals-table-section" className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl p-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-subtle)]">
            <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
              Certificate Approvals
            </h3>
            
            {/* Table Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search student or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl pl-9 pr-4 py-1.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition w-48 sm:w-60"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-3 py-1.5 text-xs text-[var(--text-secondary)] focus:outline-none"
              >
                <option value="all">All Request Statuses</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>

          {/* Table Log */}
          {filteredApprovals.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--text-muted)] font-mono">
              No matching credentials found in the ledger.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] font-mono text-[9px] uppercase tracking-wider">
                    <th className="pb-3 font-bold">Student Detail</th>
                    <th className="pb-3 font-bold">Syllabus Path</th>
                    <th className="pb-3 font-bold">Verify Score</th>
                    <th className="pb-3 font-bold">Submitted</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {filteredApprovals.map(item => (
                    <tr key={item.id} className="table-row-hover hover:bg-[var(--bg-inset)]/30 transition">
                      <td className="py-4 pr-3">
                        <div className="font-bold text-[var(--text-primary)]">{item.studentName}</div>
                        <div className="text-[10px] text-[var(--text-muted)] font-mono">{item.studentEmail}</div>
                      </td>
                      <td className="py-4 pr-3 font-semibold text-[var(--text-secondary)]">
                        {item.courseTitle}
                      </td>
                      <td className="py-4 pr-3 font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.score >= 90 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[var(--accent-muted)] text-[var(--accent-hover)]'
                        }`}>
                          {item.score}%
                        </span>
                      </td>
                      <td className="py-4 pr-3 text-[var(--text-muted)] font-mono">
                        {item.completionDate}
                      </td>
                      <td className="py-4 text-right">
                        {item.status === 'approved' ? (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1.5 rounded-full inline-flex items-center gap-1 leading-none select-none">
                            <Check className="w-3.5 h-3.5" /> Certified
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            className="!py-1.5 !px-3 font-mono text-[9px]"
                            onClick={() => approveCertificate(item.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Modal Course Creator */}
        {showCreateModal && (
          <Modal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            title="Publish New Program Track"
            className="max-w-2xl"
          >
            <form onSubmit={handleCreateCourse} className="space-y-6">
              
              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Course Title"
                  placeholder="Advanced AI Integration"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Category Tag
                  </label>
                  <Select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    options={[
                      { value: 'UI/UX Design', label: 'UI/UX Design' },
                      { value: 'Data Analysis', label: 'Data Analysis' },
                      { value: 'Embedded Systems', label: 'Embedded Systems' },
                      { value: 'IoT Basics', label: 'IoT Basics' },
                      { value: 'Graphic Design', label: 'Graphic Design' },
                      { value: 'AI Production', label: 'AI Production' },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Duration Label"
                  placeholder="10 Weeks"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                />
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                    Difficulty Scale
                  </label>
                  <Select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    options={[
                      { value: 'Beginner', label: 'Beginner' },
                      { value: 'Intermediate', label: 'Intermediate' },
                      { value: 'Advanced', label: 'Advanced' },
                    ]}
                  />
                </div>
              </div>

              <Input
                label="Domain Skills (comma separated)"
                placeholder="RAG Pipelines, Vector Databases, Fine Tuning"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Course Overview
                </label>
                <textarea
                  placeholder="Provide a detailed description of course objectives and prerequisites..."
                  value={newOverview}
                  onChange={(e) => setNewOverview(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition"
                />
              </div>

              {/* Syllabus Lesson 1 Setup */}
              <div className="border-t border-[var(--border-subtle)] pt-5 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-hover)]">
                  Initial Syllabus Unit (Lesson 1)
                </h4>

                <Input
                  label="Unit Title"
                  placeholder="Introduction to Large Language Models"
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  required
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Unit Markdown Body
                  </label>
                  <textarea
                    placeholder="### Direct Concept Heading&#10;Write lesson content using standard markdown syntax..."
                    value={newLessonContent}
                    onChange={(e) => setNewLessonContent(e.target.value)}
                    required
                    rows={4}
                    className="w-full bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition font-mono leading-relaxed"
                  />
                </div>

                {/* Lesson 1 Quiz Setup */}
                <div className="border-t border-[var(--border-subtle)]/50 pt-4 space-y-4">
                  <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    Unit Comprehension Question
                  </h5>

                  <Input
                    label="Question Prompt"
                    placeholder="Which optimization objective is minimized during basic pre-training?"
                    value={newQuizQuestion}
                    onChange={(e) => setNewQuizQuestion(e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {newQuizOptions.map((option, idx) => (
                      <Input
                        key={idx}
                        label={`Option ${idx + 1} ${idx === parseInt(newQuizCorrect, 10) ? '(CORRECT)' : ''}`}
                        placeholder={idx === 0 ? 'Cross-entropy loss function' : `Distractor answer ${idx}`}
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        required
                      />
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                      Identify Correct Option Index
                    </label>
                    <Select
                      value={newQuizCorrect}
                      onChange={(e) => setNewQuizCorrect(e.target.value)}
                      options={[
                        { value: '0', label: 'Option 1' },
                        { value: '1', label: 'Option 2' },
                        { value: '2', label: 'Option 3' },
                        { value: '3', label: 'Option 4' },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Publish Path
                </Button>
              </div>

            </form>
          </Modal>
        )}

      </div>
    </DashboardLayout>
  );
}

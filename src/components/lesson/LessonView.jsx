import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CircleHelp,
  CircleCheckBig,
  CircleAlert,
  Flame,
  Sparkles,
  Send,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { renderMarkdown } from '../../utils/markdown';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';

export default function LessonView() {
  const { user, courses, completeLesson } = useAuth();
  const { params, navigate } = useNavigation();
  const { courseId } = params || {};

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-[var(--bg-root)] flex flex-col items-center justify-center p-6 text-center">
        <CircleAlert className="w-12 h-12 text-red-500 mb-3" />
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Course Not Found</h2>
        <Button className="mt-4" onClick={() => navigate('student-dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const currentLesson = course.lessons[activeLessonIdx] || course.lessons[0];
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState('');

  // Mobile tab: 'lesson' | 'chat'
  const [mobileTab, setMobileTab] = useState('lesson');

  // AI Tutor chat state
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Get user's completed lessons for this course
  const courseProgress = user?.lessonProgress?.[course.id] || [];
  const completedCount = courseProgress.length;
  const pct = Math.round((completedCount / course.lessons.length) * 100);

  // Scroll to bottom of chat when messages or typing states change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Reset quiz state and welcome messages when active lesson index shifts
  useEffect(() => {
    setAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizFeedback('');
    setMessages([
      {
        id: `welcome-${currentLesson?.id}`,
        role: 'assistant',
        content: `Welcome to **"${currentLesson?.title}"**! 📚 I can help you understand any concept, walk through examples, or suggest hands-on exercises. What would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeLessonIdx]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    if (!currentLesson || !currentLesson.quiz?.length) return;

    let correctCount = 0;
    currentLesson.quiz.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / currentLesson.quiz.length) * 100);
    setQuizScore(finalScore);
    setQuizSubmitted(true);

    if (finalScore === 100) {
      setQuizFeedback("Outstanding work! You've verified your proficiency. This lesson counts completed.");
      completeLesson(course.id, currentLesson.id, finalScore);
    } else {
      setQuizFeedback("You got some answers incorrect. Review the syllabus slides and try the quiz again to unlock your progress.");
    }
  };

  const handleSendMessage = async (presetText) => {
    const textToSend = presetText || inputText;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!presetText) setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          currentLesson: currentLesson?.title,
          category: course.category
        })
      });

      if (!response.ok) throw new Error('Proxy returned network error');

      const data = await response.json();
      const tutorMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: data.text || 'I was unable to retrieve an AI explanation at this time.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, tutorMessage]);
    } catch (err) {
      console.error('AI Tutor request failure:', err);
      const errorMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: "I can't connect right now — the AI tutor requires a Gemini API key to work. Ask your instructor to configure it, or try rephrasing your question later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const presets = [
    '📝 Summarize this lesson in 3 key takeaways',
    '🧠 Explain the hardest concept with a real-world example',
    '🛠️ Give me a mini project I can try in 30 minutes'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-root)] text-[var(--text-primary)]">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-[var(--bg-surface)]/80 backdrop-blur-xl border-b border-[var(--border-default)] h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between z-40 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('student-dashboard')}
            icon={ArrowLeft}
          >
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <div className="h-4 w-px bg-[var(--border-default)] hidden sm:block" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[9px] font-mono font-bold bg-[var(--accent-muted)] text-[var(--accent-hover)] px-2.5 py-1 rounded-xl border border-[var(--accent)]/10 shrink-0 leading-none hidden xs:inline-flex">
              {course.category}
            </span>
            <span className="text-sm font-bold tracking-tight text-[var(--text-primary)] truncate max-w-[140px] sm:max-w-[240px]">
              {course.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3.5">
          <span className="text-[9px] font-mono font-bold text-[var(--text-tertiary)] hidden md:inline uppercase tracking-widest">COMPLETION:</span>
          <span className="text-[10px] font-mono font-bold text-[var(--accent-hover)] bg-[var(--accent-muted)] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[var(--accent)]/20 shadow-sm">
            {pct}% Done
          </span>
        </div>
      </header>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden flex border-b border-[var(--border-default)] bg-[var(--bg-surface)]/60 backdrop-blur-md shrink-0">
        {[{ id: 'lesson', label: 'Lesson', Icon: BookOpen }, { id: 'chat', label: 'AI Tutor', Icon: MessageSquare }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-mono font-bold uppercase tracking-wider transition border-b-2 cursor-pointer ${
              mobileTab === tab.id
                ? 'text-[var(--accent-hover)] border-[var(--accent)]'
                : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]'
            }`}
          >
            <tab.Icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Classroom Panel Grid */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-0">
        
        {/* Left Core Area: Lessons Navigation, Markdown Content, Quizzes */}
        <div className={`lg:col-span-8 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8 min-h-0 scrollbar-thin ${mobileTab === 'chat' ? 'hidden lg:block' : ''}`}>
          
          {/* Lessons Horizontal Navigation Pills */}
          <div className="border border-[var(--border-default)] p-2 rounded-2xl bg-[var(--bg-inset)]/60 backdrop-blur-md flex items-center gap-2 overflow-x-auto">
            <span className="text-[9px] font-mono font-bold text-[var(--text-tertiary)] uppercase tracking-widest pl-2 select-none shrink-0">
              Syllabus:
            </span>
            {course.lessons.map((lesson, idx) => {
              const isPassed = courseProgress.includes(lesson.id);
              const isActive = idx === activeLessonIdx;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`
                    px-4 py-2.5 text-[10px] font-mono font-bold rounded-xl shrink-0 transition-all duration-300 ease-[var(--ease-spring)] flex items-center gap-2 cursor-pointer border active:scale-95
                    ${isActive
                      ? 'bg-[var(--accent)] border-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]'
                      : 'bg-[var(--bg-surface)]/75 text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                    }
                  `}
                >
                  {isPassed && <CircleCheckBig className="w-3.5 h-3.5 text-emerald-400 fill-emerald-500/10 shrink-0" />}
                  L{idx + 1}: {lesson.title.slice(0, 15)}...
                </button>
              );
            })}
          </div>

          {/* Lesson Content Container */}
          {currentLesson ? (
            <article className="prose max-w-full space-y-6 bg-[var(--bg-surface)] border border-[var(--border-default)] p-6 md:p-8 rounded-3xl relative shadow-lg backdrop-blur-xl animate-[fadeIn_0.4s_ease-out]">
              <div className="pb-4.5 border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-mono font-bold text-[var(--accent-hover)] uppercase tracking-widest block mb-1.5">
                    Lesson {activeLessonIdx + 1}
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)]">
                    {currentLesson.title}
                  </h1>
                </div>
                <span className="font-mono text-[9px] uppercase font-bold text-[var(--text-muted)] bg-[var(--bg-inset)] px-2.5 py-1.5 border border-[var(--border-default)] rounded-xl shrink-0 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-hover)]" /> {currentLesson.duration}
                </span>
              </div>
              <div className="space-y-4 py-2 select-text leading-relaxed">
                {renderMarkdown(currentLesson.content)}
              </div>
            </article>
          ) : (
            <div className="text-center py-12 text-[var(--text-muted)] text-[9px] font-mono uppercase tracking-widest">
              Select a lesson to begin.
            </div>
          )}

          {/* Quiz Segment */}
          {currentLesson && currentLesson.quiz?.length > 0 && (
            <section className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl p-6.5 shadow-lg backdrop-blur-xl animate-[fadeIn_0.4s_ease-out_0.1s_both]">
              <div className="flex items-center gap-3.5 mb-6 border-b border-[var(--border-subtle)] pb-4.5">
                <div className="w-9.5 h-9.5 bg-[var(--bg-inset)] border border-[var(--border-default)] flex items-center justify-center rounded-xl text-[var(--accent-hover)] shrink-0 shadow-sm">
                  <CircleHelp className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] tracking-tight">
                    Verify Comprehension
                  </h3>
                  <p className="text-[8px] text-[var(--text-tertiary)] font-mono uppercase tracking-widest mt-0.5">
                    Score 100% to mark this syllabus lesson as completed.
                  </p>
                </div>
              </div>

              <form onSubmit={handleQuizSubmit} className="space-y-6">
                {currentLesson.quiz.map((q, qIdx) => (
                  <div key={q.id || qIdx} className="space-y-3.5">
                    <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)] leading-relaxed">
                      <span className="text-[var(--accent-hover)] font-mono mr-2">Q{qIdx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = answers[qIdx] === oIdx;
                        const isCorrect = oIdx === q.correctAnswer;
                        const showResult = quizSubmitted;
                        
                        let optionStyle = 'border-[var(--border-default)] bg-[var(--bg-inset)]/60 text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface)]';
                        
                        if (showResult) {
                          if (isCorrect) {
                            optionStyle = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
                          } else if (isSelected) {
                            optionStyle = 'border-red-500/40 bg-red-500/10 text-red-300';
                          } else {
                            optionStyle = 'border-[var(--border-subtle)] bg-[var(--bg-inset)]/20 text-[var(--text-muted)] opacity-60';
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--text-primary)] shadow-sm';
                        }

                        return (
                          <label
                            key={oIdx}
                            className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 ease-[var(--ease-spring)] ${optionStyle} ${quizSubmitted ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.99]'}`}
                          >
                            <input
                              type="radio"
                              name={`question-${qIdx}`}
                              required
                              disabled={quizSubmitted}
                              checked={isSelected}
                              onChange={() => setAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                              className="sr-only"
                            />
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                              showResult && isCorrect ? 'border-emerald-400 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                              showResult && isSelected ? 'border-red-400 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                              isSelected ? 'border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]' : 'border-[var(--text-muted)]'
                            }`}>
                              {(isSelected || (showResult && isCorrect)) && <span className="w-2 h-2 rounded-full bg-[var(--bg-surface)]" />}
                            </span>
                            <span className="text-xs font-semibold leading-relaxed flex-grow">{opt}</span>
                            {showResult && isCorrect && <span className="text-[8px] font-mono font-bold text-emerald-400 uppercase tracking-widest shrink-0 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">correct</span>}
                            {showResult && isSelected && !isCorrect && <span className="text-[8px] font-mono font-bold text-red-400 uppercase tracking-widest shrink-0 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-lg">incorrect</span>}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {quizFeedback && (
                  <div className={`p-4 rounded-2xl flex items-start gap-3.5 border ${
                    quizScore === 100
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300 shadow-sm'
                      : 'bg-amber-500/5 border-amber-500/20 text-amber-300 shadow-sm'
                  }`}>
                    {quizScore === 100
                      ? <CircleCheckBig className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      : <CircleAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider leading-none">
                        {quizScore === 100 ? '🎉 Congratulations! Unit complete.' : `Score: ${quizScore}%`}
                      </p>
                      <p className="text-[var(--text-secondary)] text-[11px] mt-2 leading-relaxed">
                        {quizFeedback}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4.5 border-t border-[var(--border-subtle)] flex items-center justify-between flex-wrap gap-3">
                  <span className="text-[8px] text-[var(--text-muted)] font-mono uppercase tracking-widest">
                    100% correct score required to lock progress
                  </span>
                  <div className="flex items-center gap-2">
                    {quizSubmitted && quizScore < 100 && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => { setAnswers({}); setQuizSubmitted(false); setQuizScore(0); setQuizFeedback(''); }}
                        icon={Flame}
                        size="sm"
                      >
                        Try Again
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={quizSubmitted && quizScore === 100}
                      size="sm"
                    >
                      {quizSubmitted && quizScore === 100 ? 'Passed ✓' : 'Submit Answers'}
                    </Button>
                  </div>
                </div>
              </form>
            </section>
          )}
        </div>

        {/* Right Core Area: AI Study Companion Chat Panel */}
        <div className={`lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--border-default)] bg-[var(--bg-root)]/50 backdrop-blur-xl flex flex-col justify-between overflow-hidden min-h-[480px] lg:h-auto z-10 ${mobileTab === 'lesson' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Tutor Info Topbar */}
          <div className="p-4 bg-[var(--bg-surface)] border-b border-[var(--border-default)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4.5 h-4.5 text-[var(--accent-hover)] animate-pulse" />
              <div>
                <span className="text-xs font-bold uppercase tracking-tight block">AI Companion</span>
                <span className="text-[8px] uppercase font-mono font-bold text-[var(--text-muted)] block mt-0.5">
                  Synchronous Classroom Assistant
                </span>
              </div>
            </div>
            <span className="text-[8px] font-mono bg-[var(--bg-inset)] text-[var(--text-tertiary)] border border-[var(--border-default)] px-2 py-1 rounded uppercase font-bold leading-none select-none">
              Gemini
            </span>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-grow p-4.5 space-y-4 overflow-y-auto flex flex-col min-h-0 scrollbar-thin">
            {messages.map(msg => {
              const isAI = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`chat-message-in flex flex-col max-w-[85%] gap-1 ${
                    isAI ? 'self-start mr-auto' : 'self-end ml-auto'
                  }`}
                >
                  <span className={`text-[8px] font-mono font-bold text-[var(--text-tertiary)] px-1 uppercase ${!isAI && 'text-right'}`}>
                    {isAI ? 'AI Companion' : 'You'}
                  </span>
                  <div
                    className={`
                      p-3 rounded-2xl text-[11px] leading-relaxed transition-all shadow-sm
                      ${isAI
                        ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)]'
                        : 'bg-[var(--accent-muted)] text-[var(--text-primary)] border border-[var(--accent)]/15 shadow-[0_0_12px_rgba(124,58,237,0.06)]'
                      }
                    `}
                  >
                    <div className="whitespace-pre-line prose max-w-none text-inherit select-text leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                  <span className={`text-[8px] text-[var(--text-muted)] px-1 font-mono ${!isAI && 'text-right'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex flex-col max-w-[85%] self-start mr-auto gap-1">
                <span className="text-[8px] font-mono font-bold text-[var(--accent-hover)] animate-pulse pl-1 uppercase tracking-wider">
                  AI is thinking...
                </span>
                <div className="p-3 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-2xl flex items-center gap-1 w-16">
                  <div className="flex gap-1.2 items-center justify-center w-full py-1">
                    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts & Inputs */}
          <div className="p-4 border-t border-[var(--border-default)] bg-[var(--bg-surface)]/40 space-y-3 shrink-0">
            {/* Direct Preset Prompt Pills */}
            <div className="space-y-1.5">
              {presets.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(preset)}
                  className="w-full text-left p-2.5 border border-[var(--border-default)] hover:border-[var(--accent-hover)] bg-[var(--bg-inset)]/60 hover:bg-[var(--bg-surface)] text-[9px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition rounded-xl font-mono leading-snug truncate block cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Manual Message Input Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about this unit..."
                className="flex-grow bg-[var(--bg-inset)] border border-[var(--border-default)] rounded-xl px-3.5 py-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition duration-300"
              />
              <button
                type="submit"
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white p-3 rounded-xl transition duration-300 shrink-0 cursor-pointer shadow-md shadow-[var(--accent-glow)] hover:shadow-[0_0_12px_var(--accent-glow)] flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

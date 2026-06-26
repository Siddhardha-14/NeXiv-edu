import React, { createContext, useContext, useState, useCallback } from 'react';
import { courses as initialCourses, initialApprovals, demoAccounts } from '../data/courses';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(initialCourses);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [activeCourse, setActiveCourse] = useState(null);

  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const isAuthenticated = !!user;
  const role = user?.role || null;

  const login = useCallback((userObj) => {
    if (userObj.role === 'admin') {
      setUser({
        email: userObj.email || 'admin@nexiv.com',
        name: userObj.name || 'Alex Rivera',
        role: 'admin',
        streak: 0,
        progress: {},
        lessonProgress: {},
        certificates: {},
        quizScores: {},
      });
    } else {
      const email = userObj.email || 's.jenkins@example.com';
      const loadedCertificates = { ...userObj.certificates };
      // Sync from approval state
      approvals.forEach(app => {
        if (app.studentEmail.toLowerCase() === email.toLowerCase()) {
          loadedCertificates[app.courseId] = app.status;
        }
      });

      setUser({
        email,
        name: userObj.name || 'Sarah Jenkins',
        role: 'student',
        streak: userObj.streak ?? 12,
        progress: userObj.progress ?? {},
        lessonProgress: userObj.lessonProgress ?? {},
        certificates: loadedCertificates,
        quizScores: userObj.quizScores ?? {},
      });
    }
  }, [approvals]);

  const logout = useCallback(() => {
    setUser(null);
    setActiveCourse(null);
  }, []);

  const enrollCourse = useCallback((courseId) => {
    const courseObj = courses.find(c => c.id === courseId);
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        progress: { ...prev.progress, [courseId]: 0 },
        lessonProgress: { ...prev.lessonProgress, [courseId]: [] },
        certificates: { ...prev.certificates, [courseId]: 'none' },
      };
    });
    showToast(`Successfully enrolled in: ${courseObj?.title || 'Course'}!`, 'success');
  }, [courses, showToast]);

  const completeLesson = useCallback((courseId, lessonId, score) => {
    setUser(prev => {
      if (!prev) return null;
      const course = courses.find(c => c.id === courseId);
      if (!course) return prev;

      const current = prev.lessonProgress[courseId] || [];
      const updated = current.includes(lessonId) ? current : [...current, lessonId];
      const progressPercent = Math.round((updated.length / course.lessons.length) * 100);
      const bestScore = Math.max(prev.quizScores[courseId] || 0, score);

      return {
        ...prev,
        lessonProgress: { ...prev.lessonProgress, [courseId]: updated },
        progress: { ...prev.progress, [courseId]: progressPercent },
        quizScores: { ...prev.quizScores, [courseId]: bestScore },
      };
    });
  }, [courses]);

  const requestCertificate = useCallback((courseId) => {
    if (!user) return null;
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    const currentStatus = user.certificates[courseId];
    if (currentStatus === 'pending' || currentStatus === 'approved') {
      return { alreadyExists: true, status: currentStatus };
    }

    const requestObj = {
      id: 'app-dyn-' + Math.random().toString(36).substring(2, 9),
      studentEmail: user.email,
      studentName: user.name,
      courseId,
      courseTitle: course.title,
      completionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score: user.quizScores[courseId] || 100,
      status: 'pending',
    };

    setApprovals(prev => [requestObj, ...prev]);
    setUser(prev => prev ? {
      ...prev,
      certificates: { ...prev.certificates, [courseId]: 'pending' },
    } : null);

    showToast(`Certificate request submitted for validation: ${course.title}!`, 'info');
    return { success: true };
  }, [user, courses, showToast]);

  const approveCertificate = useCallback((approvalId) => {
    let approvalItem = null;
    setApprovals(prev => prev.map(item => {
      if (item.id === approvalId) {
        approvalItem = item;
        return { ...item, status: 'approved' };
      }
      return item;
    }));

    if (approvalItem) {
      if (user && user.email.toLowerCase() === approvalItem.studentEmail.toLowerCase()) {
        setUser(prev => prev ? {
          ...prev,
          certificates: { ...prev.certificates, [approvalItem.courseId]: 'approved' },
        } : null);
      }
      showToast(`Credentials approved for: ${approvalItem.studentName}!`, 'success');
    }
  }, [user, showToast]);



  const addCourse = useCallback((newCourse) => {
    setCourses(prev => [...prev, newCourse]);
    showToast(`Successfully launched new path: ${newCourse.title}!`, 'success');
  }, [showToast]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      role,
      courses,
      approvals,
      activeCourse,
      setActiveCourse,
      login,
      logout,
      enrollCourse,
      completeLesson,
      requestCertificate,
      approveCertificate,
      addCourse,
      demoAccounts,
      toasts,
      showToast,
      dismissToast,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

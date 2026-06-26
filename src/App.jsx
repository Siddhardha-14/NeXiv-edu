import React from 'react';
import LandingPage from './components/landing/LandingPage';
import AuthPage from './components/auth/AuthPage';
import StudentDashboard from './components/student/StudentDashboard';
import LessonView from './components/lesson/LessonView';
import AdminDashboard from './components/admin/AdminDashboard';
import CertificateModal from './components/certificate/CertificateModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from './components/ui/Toast';

/**
 * MainAppRouter renders the active screen based on NavigationContext.
 * It also holds the global Toast Notification Container.
 */
function MainAppRouter() {
  const { screen } = useNavigation();
  const { toasts, dismissToast } = useAuth();

  return (
    <>
      {screen === 'home' && <LandingPage />}
      {screen === 'auth' && <AuthPage />}
      {screen === 'student-dashboard' && <StudentDashboard />}
      {screen === 'lesson-view' && <LessonView />}
      {screen === 'admin-dashboard' && <AdminDashboard />}
      {screen === 'certificate' && <CertificateModal />}

      {/* Global notification ledger toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/**
 * Root App Shell enclosing context managers.
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationProvider>
          <MainAppRouter />
        </NavigationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

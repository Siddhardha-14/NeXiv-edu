import React, { useState } from 'react';
import { GraduationCap, Shield, Mail, KeyRound, ArrowRight, ArrowLeft, Globe } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Select } from '../ui/Input';
import Card from '../ui/Card';
import ThemeToggle from '../ui/ThemeToggle';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const { navigate, params } = useNavigation();
  const { login, demoAccounts } = useAuth();
  const [role, setRole] = useState(params.role || 'student');
  const [studentEmail, setStudentEmail] = useState('s.jenkins@example.com');
  const [studentPassword, setStudentPassword] = useState('sarah123');
  const [studentName, setStudentName] = useState('Sarah Jenkins');
  const [adminEmail, setAdminEmail] = useState('admin@nexiv.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentEmail) { setErrorMsg('Please provide your email.'); return; }
    setErrorMsg('');
    const account = studentName === 'Sarah Jenkins' ? demoAccounts.sarah : demoAccounts.marcus;
    login({ ...account, email: studentEmail, name: studentName });
    navigate('student-dashboard');
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (!adminEmail) { setErrorMsg('Please provide admin email.'); return; }
    setErrorMsg('');
    login({ ...demoAccounts.admin, email: adminEmail });
    navigate('admin-dashboard');
  };

  const triggerOAuth = (selectedRole) => {
    setErrorMsg('');
    if (selectedRole === 'admin') {
      login(demoAccounts.admin);
      navigate('admin-dashboard');
    } else {
      login(demoAccounts.sarah);
      navigate('student-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-root)] py-12 px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {/* Back + theme toggle */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('home')} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium flex items-center gap-1.5 transition cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <ThemeToggle />
        </div>

        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-mono font-black text-lg shadow-md">N</div>
            <span className="font-bold text-2xl text-[var(--text-primary)] tracking-tight">
              NeXiv<span className="text-[var(--accent)]">.EDU</span>
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">Welcome back. Pick up where you left off.</p>
        </div>

        {/* Auth Card */}
        <Card variant="elevated" padding="p-0" className="overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]">
            {[
              { key: 'student', label: 'Student', icon: GraduationCap },
              { key: 'admin', label: 'Admin', icon: Shield },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => { setRole(tab.key); setErrorMsg(''); }}
                className={`py-3.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
                  role === tab.key
                    ? 'text-[var(--accent)] border-[var(--accent)] bg-[var(--accent-muted)]'
                    : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {errorMsg && (
              <div className="p-3 bg-[var(--error-muted)] text-[var(--error)] border border-[var(--error)]/20 text-xs font-medium rounded-xl mb-5">
                {errorMsg}
              </div>
            )}

            {role === 'student' ? (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <Select label="Demo Account" value={studentName} onChange={(e) => {
                  const val = e.target.value;
                  setStudentName(val);
                  if (val === 'Sarah Jenkins') { setStudentEmail('s.jenkins@example.com'); setStudentPassword('sarah123'); }
                  else { setStudentEmail('m.chen@example.com'); setStudentPassword('marcus123'); }
                }}>
                  <option value="Sarah Jenkins">Sarah Jenkins (Progress Loaded)</option>
                  <option value="Marcus Chen">Marcus Chen (New Student)</option>
                </Select>
                <Input label="Email" type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} icon={Mail} placeholder="student@nexiv.com" />
                <Input label="Password" type="password" required value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} icon={KeyRound} placeholder="••••••••" />
                <Button type="submit" size="lg" className="w-full" iconRight={ArrowRight}>Continue Learning</Button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-default)]" /></div>
                  <span className="relative bg-[var(--bg-card)] px-3 text-[10px] font-mono text-[var(--text-muted)] uppercase">or</span>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => triggerOAuth('student')} icon={Globe}>
                  Sign in with Google
                </Button>
              </form>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <Input label="Admin Email" type="email" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} icon={Mail} placeholder="admin@nexiv.com" />
                <Input label="Password" type="password" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} icon={KeyRound} placeholder="••••••••" />
                <Button type="submit" variant="accent" size="lg" className="w-full" iconRight={ArrowRight}>Sign In</Button>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-default)]" /></div>
                  <span className="relative bg-[var(--bg-card)] px-3 text-[10px] font-mono text-[var(--text-muted)] uppercase">sso</span>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => triggerOAuth('admin')} icon={Shield}>
                  Login via SSO
                </Button>
              </form>
            )}
          </div>

          <div className="bg-[var(--bg-elevated)] border-t border-[var(--border-default)] p-4 flex items-center gap-3">
            <span className="text-[10px] text-[var(--text-muted)] leading-tight">
              {role === 'student'
                ? <>Select <strong className="text-[var(--text-primary)]">Sarah Jenkins</strong> to explore with pre-loaded progress.</>
                : <>Secure admin workspace. All actions are logged.</>
              }
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-[var(--bg-root)] py-12 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.18] hero-orb pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md z-10 relative">
        {/* Back + theme toggle */}
        <div className="flex items-center justify-between mb-8 animate-[fadeIn_0.5s_ease-out]">
          <button onClick={() => navigate('home')} className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition cursor-pointer select-none">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <ThemeToggle />
        </div>

        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center gap-2 animate-[fadeIn_0.5s_ease-out_0.1s_both]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[#22d3ee] flex items-center justify-center text-white font-mono font-black text-lg shadow-lg">N</div>
            <span className="font-extrabold text-2xl text-[var(--text-primary)] tracking-tight">
              NeXiv<span className="text-[var(--accent-hover)]">.EDU</span>
            </span>
          </div>
          <p className="text-xs text-[var(--text-tertiary)] font-mono uppercase tracking-widest mt-1">Welcome back. Pick up where you left off.</p>
        </div>

        {/* Auth Card */}
        <Card variant="elevated" padding="p-0" className="overflow-hidden animate-[fadeIn_0.5s_ease-out_0.2s_both] border-[var(--border-hover)]">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[var(--border-default)] bg-[var(--bg-elevated)]/40">
            {[
              { key: 'student', label: 'Student', icon: GraduationCap },
              { key: 'admin', label: 'Admin', icon: Shield },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => { setRole(tab.key); setErrorMsg(''); }}
                className={`py-4 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer border-b-2 ${
                  role === tab.key
                    ? 'text-[var(--accent-hover)] border-[var(--accent)] bg-[var(--accent-muted)]'
                    : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-7">
            {errorMsg && (
              <div className="p-4 bg-[var(--error-muted)] text-[var(--error)] border border-[var(--error)]/30 text-xs font-semibold rounded-xl mb-5 shadow-sm">
                {errorMsg}
              </div>
            )}

            {role === 'student' ? (
              <form onSubmit={handleStudentSubmit} className="space-y-5">
                <Select label="Demo Profile" value={studentName} onChange={(e) => {
                  const val = e.target.value;
                  setStudentName(val);
                  if (val === 'Sarah Jenkins') { setStudentEmail('s.jenkins@example.com'); setStudentPassword('sarah123'); }
                  else { setStudentEmail('m.chen@example.com'); setStudentPassword('marcus123'); }
                }}>
                  <option value="Sarah Jenkins">Sarah Jenkins (Progress Loaded)</option>
                  <option value="Marcus Chen">Marcus Chen (New Student)</option>
                </Select>
                <Input label="Email Address" type="email" required value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} icon={Mail} placeholder="student@nexiv.com" />
                <Input label="Security Password" type="password" required value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} icon={KeyRound} placeholder="••••••••" />
                <Button type="submit" size="lg" className="w-full shadow-lg" iconRight={ArrowRight}>Continue Learning</Button>

                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-default)]" /></div>
                  <span className="relative bg-[var(--bg-elevated)]/60 px-3.5 py-0.5 rounded-full border border-[var(--border-default)] text-[9px] font-mono text-[var(--text-muted)] uppercase">or</span>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => triggerOAuth('student')} icon={Globe}>
                  Sign in with Google
                </Button>
              </form>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-5">
                <Input label="Admin Email" type="email" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} icon={Mail} placeholder="admin@nexiv.com" />
                <Input label="Security Password" type="password" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} icon={KeyRound} placeholder="••••••••" />
                <Button type="submit" variant="accent" size="lg" className="w-full shadow-lg" iconRight={ArrowRight}>Sign In</Button>

                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-default)]" /></div>
                  <span className="relative bg-[var(--bg-elevated)]/60 px-3.5 py-0.5 rounded-full border border-[var(--border-default)] text-[9px] font-mono text-[var(--text-muted)] uppercase text-[var(--accent-hover)]">sso</span>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => triggerOAuth('admin')} icon={Shield}>
                  Login via SSO Broker
                </Button>
              </form>
            )}
          </div>

          <div className="bg-[var(--bg-elevated)]/50 border-t border-[var(--border-default)] p-4 flex items-center gap-3">
            <span className="text-[10px] text-[var(--text-tertiary)] leading-normal">
              {role === 'student'
                ? <>Use the <strong className="text-[var(--text-primary)]">Sarah Jenkins</strong> profile to load pre-configured classroom progress metrics.</>
                : <>Secure operations portal. All modifications are logged to the console ledger.</>
              }
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

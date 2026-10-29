import React, { useState } from 'react';
import { Activity, ArrowRight, Eye, EyeOff, HeartPulse, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import './auth.css';

const USERS_KEY = 'queuecare_local_users_v1';

async function hashPassword(password) {
  // Hashing is a small improvement for this local demo, not a replacement for server-side auth.
  if (globalThis.crypto?.subtle) {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return `demo-${password}`;
}

function getUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
    setNotice('');
    setPassword('');
    setConfirmPassword('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setBusy(true);
    try {
      const users = getUsers();
      const passwordHash = await hashPassword(password);
      if (mode === 'register') {
        if (!name.trim()) {
          setError('Please enter your full name.');
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
        if (users.some((user) => user.email === normalizedEmail)) {
          setError('An account with this email already exists. Please log in.');
          return;
        }
        const user = { id: `user-${Date.now()}`, name: name.trim(), email: normalizedEmail, passwordHash, createdAt: new Date().toISOString() };
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
        setNotice('Account created. You can now log in.');
        setPassword('');
        setConfirmPassword('');
        setMode('login');
        return;
      }
      const user = users.find((item) => item.email === normalizedEmail && item.passwordHash === passwordHash);
      if (!user) {
        setError('Incorrect email or password. If you are new, create an account first.');
        return;
      }
      const session = { id: user.id, name: user.name, email: user.email, signedInAt: new Date().toISOString() };
      if (remember) {
        localStorage.setItem('queuecare_session_v1', JSON.stringify(session));
        sessionStorage.removeItem('queuecare_session_v1');
      } else {
        sessionStorage.setItem('queuecare_session_v1', JSON.stringify(session));
        localStorage.removeItem('queuecare_session_v1');
      }
      onAuthenticated(session);
    } catch {
      setError('Something went wrong while saving your account. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb-one" />
      <div className="auth-orb auth-orb-two" />
      <div className="auth-layout">
        <section className="auth-welcome">
          <div className="auth-brand"><span className="auth-brand-icon"><Activity size={25} strokeWidth={2.5} /></span><span>QueueCare</span></div>
          <div className="auth-welcome-copy">
            <div className="auth-eyebrow"><HeartPulse size={15} /> SMART PATIENT FLOW MONITOR</div>
            <h1>Better flow.<br /><span>Better care.</span></h1>
            <p>Manage patient queues with a clearer view of every step, from check-in to service.</p>
            <div className="auth-feature-list">
              <div><span className="auth-feature-icon"><Activity size={17} /></span><span><b>Queue at a glance</b><small>See waiting, serving, and completed tickets.</small></span></div>
              <div><span className="auth-feature-icon"><ShieldCheck size={17} /></span><span><b>Protected entry</b><small>Sign in before opening your workspace.</small></span></div>
            </div>
          </div>
          <p className="auth-footer-note">QUEUECARE • DEMO APPLICATION</p>
        </section>

        <section className="auth-card-wrap">
          <div className="auth-card">
            <div className="auth-card-heading">
              <div className="auth-card-symbol"><LockKeyhole size={21} /></div>
              <div><h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2><p>{mode === 'login' ? 'Enter your details to access QueueCare.' : 'Register to get started with QueueCare.'}</p></div>
            </div>
            <div className="auth-tabs" role="tablist" aria-label="Account access">
              <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>Log in</button>
              <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => switchMode('register')}>Register</button>
            </div>
            <form onSubmit={submit} className="auth-form">
              {mode === 'register' && <label className="auth-field"><span>Full name</span><div className="auth-input-wrap"><UserRound size={17} /><input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required /></div></label>}
              <label className="auth-field"><span>Email address</span><div className="auth-input-wrap"><Mail size={17} /><input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></div></label>
              <label className="auth-field"><span>Password</span><div className="auth-input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" minLength={8} required /><button className="auth-eye" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
              {mode === 'register' && <label className="auth-field"><span>Confirm password</span><div className="auth-input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Enter password again" minLength={8} required /></div></label>}
              {mode === 'login' && <label className="auth-remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /><span>Keep me signed in on this browser</span></label>}
              {error && <div className="auth-message auth-error" role="alert">{error}</div>}
              {notice && <div className="auth-message auth-success" role="status">{notice}</div>}
              <button className="auth-submit" type="submit" disabled={busy}>{busy ? 'Please wait…' : mode === 'login' ? 'Log in to QueueCare' : 'Create account'}<ArrowRight size={18} /></button>
            </form>
            <p className="auth-switch-copy">{mode === 'login' ? 'New to QueueCare?' : 'Already have an account?'} <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Log in instead'}</button></p>
            <div className="auth-security-note"><ShieldCheck size={15} /><span>Demo sign-in is stored in this browser only.</span></div>
          </div>
          <p className="auth-legal">Prototype only. Do not use real patient data.</p>
        </section>
      </div>
    </div>
  );
}

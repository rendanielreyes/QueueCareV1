import React, { useEffect, useState } from 'react';
import { LogOut, UserRound } from 'lucide-react';
import { QueueProvider, QueueContext } from './context/QueueContext';
import { Navbar } from './components/common/Navbar';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { QueueManagement } from './pages/staff/QueueManagement';
import { PublicQueueDisplay } from './pages/public/PublicQueueDisplay';
import { AuthScreen } from './components/auth/AuthScreen';
import './styles/global.css';

const SESSION_KEY = 'queuecare_session_v1';

function readSession() {
  try {
    const value = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

const AppContent = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [session, setSession] = useState(() => readSession());
  const { resetDemoData } = React.useContext(QueueContext);

  useEffect(() => {
    // If the saved session is malformed, return to the login screen safely.
    if (!session?.email || !session?.id) {
      localStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [session]);

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
    setCurrentView('dashboard');
  };

  if (!session?.email || !session?.id) {
    return <AuthScreen onAuthenticated={setSession} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} resetDemoData={resetDemoData} />
      <div className="account-strip">
        <div className="account-strip-user"><span className="account-strip-avatar"><UserRound size={15} /></span><span>Signed in as <strong>{session.name || session.email}</strong></span></div>
        <button className="account-strip-logout" onClick={logout}><LogOut size={14} /> Log out</button>
      </div>
      <main style={{ flex: 1 }}>
        {currentView === 'dashboard' && <StaffDashboard />}
        {currentView === 'management' && <QueueManagement />}
        {currentView === 'public' && <PublicQueueDisplay />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <QueueProvider>
      <AppContent />
    </QueueProvider>
  );
}

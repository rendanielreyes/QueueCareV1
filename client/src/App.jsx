import React, { useState } from 'react';
import { QueueProvider, QueueContext } from './context/QueueContext';
import { Navbar } from './components/common/Navbar';
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { QueueManagement } from './pages/staff/QueueManagement';
import { PublicQueueDisplay } from './pages/public/PublicQueueDisplay';
import './styles/global.css';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const { resetDemoData } = React.useContext(QueueContext);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} resetDemoData={resetDemoData} />
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

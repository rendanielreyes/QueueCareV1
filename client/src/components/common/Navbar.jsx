import React from 'react';
import { Activity, LayoutDashboard, SlidersHorizontal, Monitor, RotateCcw } from 'lucide-react';
import { SAFETY_DISCLAIMER } from '../../utils/constants';

export const Navbar = ({ currentView, setCurrentView, resetDemoData }) => {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ background: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '6px 20px', fontSize: '12px', color: '#166534', textAlign: 'center', fontWeight: '500' }}>
        ⚠️ {SAFETY_DISCLAIMER}
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7, #0d9488)', padding: '8px', borderRadius: '10px', color: '#fff', display: 'flex' }}>
            <Activity size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
              QueueCare
            </h1>
            <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '500', margin: 0 }}>
              Smart Patient Flow Monitor
            </p>
          </div>
        </div>

        <nav style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px', gap: '4px' }}>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '7px', fontSize: '13px',
              background: currentView === 'dashboard' ? '#fff' : 'transparent',
              color: currentView === 'dashboard' ? '#0284c7' : '#64748b',
              boxShadow: currentView === 'dashboard' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <LayoutDashboard size={16} /> Staff Dashboard
          </button>
          <button
            onClick={() => setCurrentView('management')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '7px', fontSize: '13px',
              background: currentView === 'management' ? '#fff' : 'transparent',
              color: currentView === 'management' ? '#0284c7' : '#64748b',
              boxShadow: currentView === 'management' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <SlidersHorizontal size={16} /> Queue Management
          </button>
          <button
            onClick={() => setCurrentView('public')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '7px', fontSize: '13px',
              background: currentView === 'public' ? '#fff' : 'transparent',
              color: currentView === 'public' ? '#0d9488' : '#64748b',
              boxShadow: currentView === 'public' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <Monitor size={16} /> Public Display (TV)
          </button>
        </nav>

        <button
          onClick={resetDemoData}
          title="Reset sample data"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', border: '1px solid #cbd5e1', color: '#475569', padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}
        >
          <RotateCcw size={14} /> Reset Data
        </button>
      </div>
    </header>
  );
};

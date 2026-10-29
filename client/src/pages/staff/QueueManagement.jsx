import React, { useState } from 'react';
import { useQueue } from '../../hooks/useQueue';
import { UserPlus, Megaphone, Check, Search } from 'lucide-react';
import { QUEUE_STATUS } from '../../utils/constants';

export const QueueManagement = () => {
  const { patients, departments, registerPatient, callNextPatient, updatePatientStatus } = useQueue();
  const [patientName, setPatientName] = useState('');
  const [selectedDept, setSelectedDept] = useState(departments[0]?.name || 'General Consultation');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    registerPatient({ patientName, departmentName: selectedDept });
    setPatientName('');
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept === 'ALL' || p.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Front-Desk Queue Management</h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Register demo patients, call tickets, and transition statuses</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '8px', borderRadius: '8px' }}><UserPlus size={20} /></div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Register New Demo Patient</h3>
          </div>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Demo Patient Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe (Demo)"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                required
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Assign Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', background: '#fff' }}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.name}>{d.name} (~{d.avgWaitMins}m)</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              style={{ width: '100%', background: '#0284c7', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}
            >
              Generate Unique Ticket Number
            </button>
          </form>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: '#ccfbf1', color: '#0d9488', padding: '8px', borderRadius: '8px' }}><Megaphone size={20} /></div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Call Next Patient</h3>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
            Calling patient triggers sound chime and updates status to In Service.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {departments.map((dept) => {
              const waitingCount = patients.filter(p => p.department === dept.name && p.status === QUEUE_STATUS.WAITING).length;
              return (
                <div key={dept.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{dept.name}</h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Waiting: <strong>{waitingCount}</strong></span>
                  </div>
                  <button
                    onClick={() => callNextPatient(dept.name)}
                    disabled={waitingCount === 0}
                    style={{
                      background: waitingCount > 0 ? '#0d9488' : '#e2e8f0',
                      color: waitingCount > 0 ? '#fff' : '#94a3b8',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: waitingCount > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Call Next ({dept.code})
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Manage Patient Tokens</h3>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', gap: '6px' }}>
              <Search size={16} color="#64748b" />
              <input
                type="text"
                placeholder="Search token or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', fontSize: '13px' }}
              />
            </div>

            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              style={{ background: '#f1f5f9', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', color: '#334155' }}
            >
              <option value="ALL">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Token</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Patient Name</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Department</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Status</th>
                <th style={{ padding: '14px 20px', fontWeight: '700', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: '800', color: '#0284c7' }}>{p.tokenNumber}</td>
                  <td style={{ padding: '14px 20px', fontWeight: '600' }}>{p.patientName}</td>
                  <td style={{ padding: '14px 20px', color: '#475569' }}>{p.department}</td>
                  <td style={{ padding: '14px 20px', fontWeight: '700', fontSize: '12px' }}>{p.status}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      {p.status === QUEUE_STATUS.WAITING && (
                        <button
                          onClick={() => updatePatientStatus(p.id, QUEUE_STATUS.IN_SERVICE)}
                          style={{ background: '#e0f2fe', color: '#0284c7', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}
                        >
                          Start Service
                        </button>
                      )}
                      {p.status === QUEUE_STATUS.IN_SERVICE && (
                        <button
                          onClick={() => updatePatientStatus(p.id, QUEUE_STATUS.COMPLETED)}
                          style={{ background: '#dcfce7', color: '#166534', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}
                        >
                          <Check size={14} style={{ verticalAlign: 'middle' }} /> Complete
                        </button>
                      )}
                      {p.status !== QUEUE_STATUS.COMPLETED && p.status !== QUEUE_STATUS.SKIPPED && (
                        <button
                          onClick={() => updatePatientStatus(p.id, QUEUE_STATUS.SKIPPED)}
                          style={{ background: '#f1f5f9', color: '#64748b', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}
                        >
                          Skip
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

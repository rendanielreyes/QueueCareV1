import React from 'react';
import { useQueue } from '../../hooks/useQueue';
import { Users, Clock, CheckCircle2, UserCheck } from 'lucide-react';
import { QUEUE_STATUS } from '../../utils/constants';

export const StaffDashboard = () => {
  const { patients, totalWaiting, currentlyServing, totalCompleted, avgWaitTime } = useQueue();

  const getStatusBadge = (status) => {
    switch (status) {
      case QUEUE_STATUS.WAITING:
        return <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>Waiting</span>;
      case QUEUE_STATUS.IN_SERVICE:
        return <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>In Service</span>;
      case QUEUE_STATUS.COMPLETED:
        return <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>Completed</span>;
      default:
        return <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>Skipped</span>;
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Staff Overview Dashboard</h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Real-time hospital outpatient flow and status monitoring</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#fef3c7', color: '#b45309', padding: '12px', borderRadius: '10px' }}><Users size={24} /></div>
          <div>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Total Waiting</p>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{totalWaiting}</h3>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '12px', borderRadius: '10px' }}><UserCheck size={24} /></div>
          <div>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Currently Serving</p>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{currentlyServing}</h3>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#dcfce7', color: '#16a34a', padding: '12px', borderRadius: '10px' }}><CheckCircle2 size={24} /></div>
          <div>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Completed Today</p>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{totalCompleted}</h3>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#ccfbf1', color: '#0d9488', padding: '12px', borderRadius: '10px' }}><Clock size={24} /></div>
          <div>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Avg. Est. Wait</p>
            <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>~{avgWaitTime} <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>mins</span></h3>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Outpatient Live Queue List</h3>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Records: {patients.length}</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Token No.</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Patient Name (Staff Only)</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Department</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Arrival</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Est. Wait</th>
                <th style={{ padding: '14px 20px', fontWeight: '700' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 20px', fontWeight: '800', color: '#0284c7' }}>{patient.tokenNumber}</td>
                  <td style={{ padding: '14px 20px', fontWeight: '600', color: '#1e293b' }}>{patient.patientName}</td>
                  <td style={{ padding: '14px 20px', color: '#475569' }}>{patient.department}</td>
                  <td style={{ padding: '14px 20px', color: '#64748b' }}>{patient.arrivalTime}</td>
                  <td style={{ padding: '14px 20px', color: '#64748b' }}>
                    {patient.status === QUEUE_STATUS.WAITING ? `~${patient.estimatedWaitTime} mins` : '—'}
                  </td>
                  <td style={{ padding: '14px 20px' }}>{getStatusBadge(patient.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

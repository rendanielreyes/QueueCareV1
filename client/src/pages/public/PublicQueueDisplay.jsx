import React from 'react';
import { useQueue } from '../../hooks/useQueue';
import { QUEUE_STATUS } from '../../utils/constants';
import { Clock, Radio } from 'lucide-react';

export const PublicQueueDisplay = () => {
  const { patients, departments } = useQueue();
  const servingPatients = patients.filter(p => p.status === QUEUE_STATUS.IN_SERVICE);
  const waitingPatients = patients.filter(p => p.status === QUEUE_STATUS.WAITING);

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', background: '#0f172a', color: '#fff', padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ height: '12px', width: '12px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>NOW SERVING & QUEUE MONITOR</h2>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Outpatient Waiting Status • Strictly Token Based for Patient Privacy
          </p>
        </div>
        <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '10px 18px', borderRadius: '10px', textAlign: 'right' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Audio Paging</p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#38bdf8' }}>Active Chime Enabled</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#38bdf8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={20} color="#38bdf8" /> CURRENTLY CALLED / IN SERVICE
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {departments.map((dept) => {
              const active = servingPatients.find(p => p.department === dept.name);
              return (
                <div
                  key={dept.id}
                  style={{
                    background: active ? '#1e293b' : '#141e33',
                    border: active ? '2px solid #0284c7' : '1px solid #1e293b',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', letterSpacing: '1px' }}>
                      {dept.name}
                    </span>
                    <div style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '4px' }}>
                      Counter / Station {dept.code}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {active ? (
                      <span style={{ fontSize: '52px', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>
                        {active.tokenNumber}
                      </span>
                    ) : (
                      <span style={{ fontSize: '24px', fontWeight: '600', color: '#475569' }}>
                        Standby
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2dd4bf', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="#2dd4bf" /> UP NEXT (ESTIMATED WAIT TIMES)
          </h3>

          <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
            {waitingPatients.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                No patients currently waiting in queue.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#0f172a', color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 20px' }}>Token</th>
                    <th style={{ padding: '14px 20px' }}>Department</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right' }}>Est. Waiting Time</th>
                  </tr>
                </thead>
                <tbody>
                  {waitingPatients.slice(0, 7).map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '16px 20px', fontSize: '20px', fontWeight: '800', color: '#f8fafc' }}>
                        {p.tokenNumber}
                      </td>
                      <td style={{ padding: '16px 20px', color: '#cbd5e1', fontSize: '15px' }}>
                        {p.department}
                      </td>
                      <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: '700', color: '#2dd4bf', fontSize: '15px' }}>
                        ~{p.estimatedWaitTime} mins
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
            *Estimated times are calculated by system workflow. Clinical urgency takes precedence.
          </p>
        </div>
      </div>
    </div>
  );
};

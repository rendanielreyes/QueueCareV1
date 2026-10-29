import React, { createContext, useState, useEffect } from 'react';
import { INITIAL_MOCK_PATIENTS, QUEUE_STATUS, DEPARTMENTS } from '../utils/constants';
import { generateNextToken } from '../utils/formatQueueNumber';
import { getCurrentTimeString } from '../utils/formatDate';

export const QueueContext = createContext();
const STORAGE_KEY = 'queuecare_patients_v1';

export const QueueProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_MOCK_PATIENTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  };

  const registerPatient = ({ patientName, departmentName }) => {
    const dept = DEPARTMENTS.find(d => d.name === departmentName) || DEPARTMENTS[0];
    const newToken = generateNextToken(dept.code, patients);
    
    const waitingInDept = patients.filter(
      p => p.department === dept.name && p.status === QUEUE_STATUS.WAITING
    ).length;

    const newPatient = {
      id: `pat-${Date.now()}`,
      tokenNumber: newToken,
      patientName: patientName.trim() || 'Anonymous Demo Patient',
      department: dept.name,
      deptCode: dept.code,
      arrivalTime: getCurrentTimeString(),
      status: QUEUE_STATUS.WAITING,
      estimatedWaitTime: (waitingInDept + 1) * dept.avgWaitMins
    };

    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  };

  const callNextPatient = (departmentName) => {
    const nextPatient = patients.find(
      p => p.department === departmentName && p.status === QUEUE_STATUS.WAITING
    );
    if (!nextPatient) return null;

    setPatients(prev =>
      prev.map(p =>
        p.id === nextPatient.id
          ? { ...p, status: QUEUE_STATUS.IN_SERVICE, estimatedWaitTime: 0 }
          : p
      )
    );
    playChime();
    return nextPatient;
  };

  const updatePatientStatus = (patientId, newStatus) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id === patientId) {
          if (newStatus === QUEUE_STATUS.IN_SERVICE) playChime();
          return {
            ...p,
            status: newStatus,
            estimatedWaitTime: (newStatus === QUEUE_STATUS.IN_SERVICE || newStatus === QUEUE_STATUS.COMPLETED) ? 0 : p.estimatedWaitTime
          };
        }
        return p;
      })
    );
  };

  const resetDemoData = () => {
    setPatients(INITIAL_MOCK_PATIENTS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const totalWaiting = patients.filter(p => p.status === QUEUE_STATUS.WAITING).length;
  const currentlyServing = patients.filter(p => p.status === QUEUE_STATUS.IN_SERVICE).length;
  const totalCompleted = patients.filter(p => p.status === QUEUE_STATUS.COMPLETED).length;

  const waitingPatients = patients.filter(p => p.status === QUEUE_STATUS.WAITING);
  const avgWaitTime = waitingPatients.length > 0
    ? Math.round(waitingPatients.reduce((acc, curr) => acc + (curr.estimatedWaitTime || 10), 0) / waitingPatients.length)
    : 0;

  return (
    <QueueContext.Provider
      value={{
        patients,
        totalWaiting,
        currentlyServing,
        totalCompleted,
        avgWaitTime,
        registerPatient,
        callNextPatient,
        updatePatientStatus,
        resetDemoData,
        departments: DEPARTMENTS
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

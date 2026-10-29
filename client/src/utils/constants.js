export const DEPARTMENTS = [
  { id: 'gen-consultation', name: 'General Consultation', code: 'GC', avgWaitMins: 15 },
  { id: 'laboratory', name: 'Laboratory', code: 'LAB', avgWaitMins: 10 },
  { id: 'pharmacy', name: 'Pharmacy', code: 'PH', avgWaitMins: 5 }
];

export const QUEUE_STATUS = {
  WAITING: 'WAITING',
  IN_SERVICE: 'IN_SERVICE',
  COMPLETED: 'COMPLETED',
  SKIPPED: 'SKIPPED'
};

export const INITIAL_MOCK_PATIENTS = [
  { id: 'mock-001', tokenNumber: 'GC-101', patientName: 'Maria Santos (Demo)', department: 'General Consultation', deptCode: 'GC', arrivalTime: '08:15 AM', status: QUEUE_STATUS.IN_SERVICE, estimatedWaitTime: 0 },
  { id: 'mock-002', tokenNumber: 'LAB-102', patientName: 'Juan Dela Cruz (Demo)', department: 'Laboratory', deptCode: 'LAB', arrivalTime: '08:25 AM', status: QUEUE_STATUS.IN_SERVICE, estimatedWaitTime: 0 },
  { id: 'mock-003', tokenNumber: 'GC-103', patientName: 'Elena Reyes (Demo)', department: 'General Consultation', deptCode: 'GC', arrivalTime: '08:35 AM', status: QUEUE_STATUS.WAITING, estimatedWaitTime: 15 },
  { id: 'mock-004', tokenNumber: 'PH-104', patientName: 'Carlos Garcia (Demo)', department: 'Pharmacy', deptCode: 'PH', arrivalTime: '08:42 AM', status: QUEUE_STATUS.WAITING, estimatedWaitTime: 5 },
  { id: 'mock-005', tokenNumber: 'LAB-105', patientName: 'Liza Dizon (Demo)', department: 'Laboratory', deptCode: 'LAB', arrivalTime: '08:50 AM', status: QUEUE_STATUS.WAITING, estimatedWaitTime: 10 },
  { id: 'mock-006', tokenNumber: 'GC-099', patientName: 'Robert Tan (Demo)', department: 'General Consultation', deptCode: 'GC', arrivalTime: '07:55 AM', status: QUEUE_STATUS.COMPLETED, estimatedWaitTime: 0 }
];

export const SAFETY_DISCLAIMER =
  "PROTOTYPE ONLY: Uses fictional demo data. Wait times are calculated estimates only. Clinical triage and emergency prioritization remain strictly governed by authorized medical staff.";

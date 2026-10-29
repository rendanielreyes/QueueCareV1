export const generateNextToken = (deptCode, existingTickets = []) => {
  const deptTickets = existingTickets.filter(t => t.deptCode === deptCode);
  if (deptTickets.length === 0) return `${deptCode}-101`;

  const numbers = deptTickets.map(t => {
    const parts = t.tokenNumber.split('-');
    return parts[1] ? parseInt(parts[1], 10) : 100;
  });

  const nextNumber = Math.max(...numbers, 100) + 1;
  return `${deptCode}-${nextNumber}`;
};

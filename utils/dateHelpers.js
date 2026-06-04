export const parseLocaleDate = (str) => {
  // If format is M/D/YYYY or MM/DD/YYYY
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length === 3) {
      const [m, d, y] = parts.map(Number);
      return new Date(y, m - 1, d);
    }
  }

  // Fallback to native parser
  const d = new Date(str);
  return isNaN(d) ? null : d;
};

export const buildDateRange = (start, end) => {
  const arr = [];
  const cur = new Date(start);

  while (cur <= end) {
    arr.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return arr;
};

export const formatHeaderDates = (start, end) => {
  const s = start.toLocaleString('default', { month: 'short', day: '2-digit' });
  const e = end.toLocaleString('default', { month: 'short', day: '2-digit' });
  return `${s} - ${e}`;
};

export const dateKey = (d) => d.toISOString().split('T')[0];

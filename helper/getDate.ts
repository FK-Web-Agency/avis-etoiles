
// Get year from date
export function getYear(date: Date) {
  const newDate = new Date(date);
  const year = newDate.toLocaleString('fr-FR', { year: 'numeric' });

  return Number(year);
}


// Get month from date
export function getMonth(date: Date) {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('fr-FR', { month: 'long' });

  return (month);
}
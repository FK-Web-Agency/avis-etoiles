// Create the createAnalytics function
export default async function createAnalytics() {
  const year = new Date().toLocaleString('fr-FR', { year: 'numeric' });
  const month = new Date().toLocaleString('fr-FR', { month: 'numeric' });
  const months = [];
  for (let i = 0; i <= 12 - Number(month); i++) {
    const currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth() + i);
    const monthName = currentMonth.toLocaleString('fr-FR', { month: 'long' });

    months.push({
      month: monthName,
      visitors: 0,
      google: 0,
      instagram: 0,
      facebook: 0,
    });
  }

  // Create the analytics object
  const analytics = {
    _type: 'analytics',
    year: new Date().toISOString().slice(0, 4),
    months,
  };

  // Return the createAnalytics result
  return analytics;
}

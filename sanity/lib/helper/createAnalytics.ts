// Create the createAnalytics function
export default async function createAnalytics() {
  const year = new Date().toISOString();
  const month = new Date().toISOString().slice(5, 7);
  const months = [];
  for (let i = 0; i <= 12 - Number(month); i++) {
    const currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth() + i);
    const monthName = currentMonth.toISOString()

    months.push({
      month: monthName,
      visitors: 0,
      google: 0,
      instagram: 0,
      facebook: 0,
      tiktok: 0,
    });
  }

  // Create the analytics object
  const analytics = [
    {
      _type: 'analytic',
      year,
      months,
    },
  ];

  // Return the createAnalytics result
  return analytics;
}

export default async function createAnalytics() {
  const currentYear = new Date().getFullYear();
  const months = [];

  for (let i = 0; i < 12; i++) {
    const year = currentYear.toString();
    const month = (i + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const date = new Date(`${year}-${month}-01`);
    const formattedDate = date.toISOString().slice(0, 7); // Format to YYYY-MM
    months.push({
      month: formattedDate,
      visitors: 0,
      google: 0,
      instagram: 0,
      facebook: 0,
      tiktok: 0,
    });
  }

  const analytics = [
    {
      _type: 'analytic',
      year: currentYear.toString(),
      months,
    },
  ];

  console.log(analytics);
  return analytics;
}

createAnalytics();

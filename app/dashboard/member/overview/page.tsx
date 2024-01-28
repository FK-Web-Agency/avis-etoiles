'use client';

import { useList } from '@refinedev/core';
import { PieChart, TotalRevenue } from '@/components/charts';
import { useMemberDashboardStore } from '@/store';

export default function Overview() {
  const { memberIds } = useMemberDashboardStore();

  const { data, isLoading } = useList({
    resource: 'gameAnalytics',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: memberIds?.sanityId,
      },
    ],
  });

  console.log(data);

  const views = data?.data[0]?.views;
  const googleViews = data?.data[0]?.google;
  const facebookInstagramViews = data?.data.reduce((acc, curr) => acc + curr.facebook + curr.instagram, 0);
  const numberWinners = data?.data[0]?.winners?.length;

  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>

      {/* -------------------------- List Pie Charts here -------------------------- */}
      <section className="pie-container">
        <PieChart title="Nombre de visites" value={views} series={[75, 25]} colors={['#00d1b2', '#3273dc']} />
        <PieChart title="Nombre d'avis" value={googleViews} series={[60, 40]} colors={['#275be8', '#c4e8ef']} />
        <PieChart
          title="Nombre d'abonnés"
          value={facebookInstagramViews || 0}
          series={[75, 25]}
          colors={['#475be8', '#e4e8ef']}
        />
        <PieChart title="Gagnants" value={numberWinners || 0} series={[60, 20]} colors={['#475ae8', '#e4b8ef']} />
      </section>

      {/* -------------------------- Total Revenue Charts -------------------------- */}
      <TotalRevenue />
    </>
  );
}

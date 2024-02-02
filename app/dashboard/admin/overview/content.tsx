'use client';

import { PieChart, TotalRevenue } from '@/components/charts';
import { Icons } from '@/components/shared';
/* import { Spinner } from '@/components/shared';
import { useList } from '@refinedev/core'; */

export default function Content() {
  /*   const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_ANALYTICS,
  });

  if (isLoading) return <Spinner />;

  console.log(data); */

  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>

      {/* -------------------------- List Pie Charts here -------------------------- */}
      <section className="pie-container">
        <PieChart title="Revenue Total" value={100} Icon={Icons.Euro} />
        <PieChart title="Abonnés" value={10} Icon={Icons.Subscribe} />
        <PieChart title="Avis recueillis" value={3000} Icon={Icons.Comment} />
        <PieChart title="Cadeaux gagnés" value={700} Icon={Icons.Gift} />
      </section>

      {/* -------------------------- Total Revenue Charts -------------------------- */}
      <TotalRevenue />
    </>
  );
}

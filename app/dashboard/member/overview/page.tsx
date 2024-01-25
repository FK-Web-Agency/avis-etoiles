import { PieChart, TotalRevenue } from '@/components/charts';

export default function Overview() {
  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>

      {/* -------------------------- List Pie Charts here -------------------------- */}
      <section className="pie-container">
        <PieChart title="Nombre de visites" value={100} series={[75, 25]} colors={['#00d1b2', '#3273dc']} />
        <PieChart title="Nombre d'avis" value={10} series={[60, 40]} colors={['#275be8', '#c4e8ef']} />
        <PieChart title="Nombre d'abonnés" value={3000} series={[75, 25]} colors={['#475be8', '#e4e8ef']} />
        <PieChart title="Gagnants" value={700} series={[60, 20]} colors={['#475ae8', '#e4b8ef']} />
      </section>

      {/* -------------------------- Total Revenue Charts -------------------------- */}
      <TotalRevenue />
    </>
  );
}

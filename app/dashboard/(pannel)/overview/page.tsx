import { PieChart } from '@/components/charts';

export default function Overview() {
  return (
    <>
      <h1 className="h4-medium text-white">Overview</h1>

      {/* -------------------------- List Pie Charts here -------------------------- */}
      <section className="pie-container">
        <PieChart title="Revenue Total" value={100} series={[75, 25]} colors={['#00d1b2', '#3273dc']} />
        <PieChart title="Abonnés" value={10} series={[60, 40]} colors={['#275be8', '#c4e8ef']} />
        <PieChart title="Avis recueillis" value={3000} series={[75, 25]} colors={['#475be8', '#e4e8ef']} />
        <PieChart title="Cadeaux gagnés" value={700} series={[60, 20]} colors={['#475ae8', '#e4b8ef']} />
      </section>
    </>
  );
}

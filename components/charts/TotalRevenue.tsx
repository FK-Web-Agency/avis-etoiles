'use client';

import ChartBar from './ChartBar';

import { Icons } from '../shared';
import { useList } from '@refinedev/core';

export default function TotalRevenue() {
  const { data } = useList({
    resource: 'orders',
  });

  const orders = data?.data;
  // Fonction pour calculer les totaux par jour pour un mois donné
  function calculateMonthlyTotals(year: number, month: number) {
    const filteredOrders = orders?.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getFullYear() === year && orderDate.getMonth() === month;
    });

    const dailyTotals = filteredOrders?.reduce((acc, order) => {
      const day = new Date(order.createdAt).getDate();
      acc[day] = ((acc[day] || 0) + order.totalAmount) / 100;
      return acc;
    }, {});

    if (!dailyTotals) return [];

    return Object.values(dailyTotals);
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Janvier = 0, Février = 1, etc.
  const lastMonth = currentMonth - 1;

  // Calculer les totaux pour le mois en cours
  const runningMonthData = calculateMonthlyTotals(currentYear, currentMonth);

  // Calculer les totaux pour le mois dernier
  // Gérer le cas de janvier (mois dernier = décembre de l'année précédente)
  const lastMonthYear = lastMonth < 0 ? currentYear - 1 : currentYear;
  const lastMonthIndex = lastMonth < 0 ? 11 : lastMonth; // Décembre = 11 si le mois dernier est janvier
  const lastMonthData = calculateMonthlyTotals(lastMonthYear, lastMonthIndex);

  // Créer le tableau d'objet avec les données pour le mois en cours et le mois dernier
  const TotalRevenueSeries = [
    {
      name: 'Last Month',
      data: lastMonthData,
    },
    {
      name: 'Running Month',
      data: runningMonthData,
    },
  ];

  const totalYearSum = TotalRevenueSeries.reduce((sum, series) => {
    const seriesSum = series.data.reduce((seriesSum, amount) => seriesSum + amount, 0);
    return sum + seriesSum;
  }, 0);

  const totalRunningMonthSum = runningMonthData?.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalLastMonthSum = lastMonthData?.reduce((sum, order) => sum + order.totalAmount, 0);

  const averageChange = totalLastMonthSum ? (totalRunningMonthSum - totalLastMonthSum) / totalLastMonthSum : 0;
  const changePercentage = averageChange * 100;

  return (
    <section className="bg-slate-100 flex-1 flex flex-col rounded p-4 mt-8" id="chart">
      <div>
        <h2 className="p-regular-18">Revenue Total</h2>

        <div className="my-2 flex gap-4 flex-wrap">
          <h5 className="h5-bold">{totalYearSum!} €</h5>

          <div className="flex items-center gap-1">
            {changePercentage <= 0 ? (
              <Icons.ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <Icons.ArrowDown className="w-4 h-4 text-red-500" />
            )}

            <div className="flex flex-col">
              <span className="text-green-500 p-semibold-14">{changePercentage.toFixed(1)}%</span>
              <span className="p-medium-12">Depuis le dernier mois</span>
            </div>
          </div>
        </div>
      </div>

      <ChartBar TotalRevenueSeries={TotalRevenueSeries} />
    </section>
  );
}

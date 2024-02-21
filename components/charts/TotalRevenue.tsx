'use client';

import ChartBar from './ChartBar';

import { Icons } from '../shared';
import { useList } from '@refinedev/core';

export default function TotalRevenue() {
  const { data } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_ORDERS!,
  });

  const orders = data?.data;

  console.log(orders);

  // Fonction pour calculer les totaux par jour pour un mois donné
  function calculateMonthlyTotals(year: number, month: number) {
    const filteredOrders = orders?.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate.getFullYear() === year && orderDate.getMonth() === month;
    });

    console.log(filteredOrders);

    const totalsByMonth: any = {};

    filteredOrders?.forEach((order) => {
      // Extraire l'année et le mois de la date de création
      const month = new Date(order.createdAt).toISOString().slice(0, 7);

      // Ajouter le prix à la somme totale pour le mois correspondant
      if (!totalsByMonth[month]) {
        totalsByMonth[month] = order.price / 100;
      } else {
        totalsByMonth[month] += order.price / 100;
      }
    });

    return Object.values(totalsByMonth);
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

  if (currentMonth > 0) {
    const numberOfMonths = (currentMonth + 12 - 0) % 12;

    for (let i = 0; i < numberOfMonths; i++) {
      runningMonthData.unshift(0);
      lastMonthData.unshift(0);
    }
  }

  // Créer le tableau d'objet avec les données pour le mois en cours et le mois dernier
  const TotalRevenueSeries = [
    {
      name: 'Mois dernier',
      data: lastMonthData,
    },
    {
      name: 'Mois en cours',
      data: runningMonthData,
    },
  ];

  console.log(currentMonth);

  const totalYearSum = TotalRevenueSeries.reduce((sum, series) => {
    const seriesSum: any = series.data.reduce((seriesSum: any, amount: any) => seriesSum + amount, 0);
    return sum + seriesSum;
  }, 0);

  const totalRunningMonthSum: any = runningMonthData?.reduce((sum, order: any) => sum + order.price, 0);
  const totalLastMonthSum: any = lastMonthData?.reduce((sum, order: any) => sum + order.price, 0);

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

      <ChartBar TotalRevenueSeries={TotalRevenueSeries as any} />
    </section>
  );
}

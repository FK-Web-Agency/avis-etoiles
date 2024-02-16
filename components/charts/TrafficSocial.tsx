'use client';
import React from 'react';
import Chart from 'react-apexcharts';
import { getYear } from 'date-fns';
import { ApexOptions } from 'apexcharts';
import { IAnalyticItem } from '@/interfaces/analytic';

const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#475BE8', '#ee961a', '#CFC8FF', '#1a1a19'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'aout', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yaxis: {
    title: {
      text: 'Interactions',
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return ` ${val}`;
      },
    },
  },
};

export default function TrafficSocial({ analytics }: any) {
  const currentYear = getYear(new Date());
  const currentAnalytics = analytics?.find((item: IAnalyticItem) => getYear(new Date(item.year)) === currentYear);

  // Initialiser un objet pour accumuler les visites par mois pour chaque plateforme
  const monthlyVisits = {
    google: Array(12).fill(0),
    instagram: Array(12).fill(0),
    facebook: Array(12).fill(0),
    tiktok: Array(12).fill(0),
  };

  // Remplir monthlyVisits avec les données de currentAnalytics
  currentAnalytics?.months.forEach((month: any) => {
    const monthIndex = new Date(month.month).getMonth(); // Obtenir l'index du mois (0-11)
    monthlyVisits.facebook[monthIndex] = month.facebook;
    monthlyVisits.google[monthIndex] = month.google;
    monthlyVisits.instagram[monthIndex] = month.instagram;
  });

  // Construire les séries pour ApexCharts
  const series = Object.keys(monthlyVisits).map((platform: any) => ({
    name: platform,
    // @ts-ignore
    data: monthlyVisits[platform],
  }));

  console.log(series);

  return (
    <section className='bg-slate-50 mt-8 rounded'>
      <Chart options={TotalRevenueOptions} series={series} type="bar" height={350} />
    </section>
  );
}

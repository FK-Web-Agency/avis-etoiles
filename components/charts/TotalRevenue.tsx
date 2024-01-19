'use client';

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useWindowSize } from '@uidotdev/usehooks';

import { Icons } from '../shared';

const TotalRevenueSeries = [
  {
    name: 'Last Month',
    data: [183, 124, 115, 85, 143, 143, 96],
  },
  {
    name: 'Running Month',
    data: [95, 84, 72, 44, 108, 108, 47],
  },
];

const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#475BE8', '#CFC8FF'],
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
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)',
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
        return `$ ${val} thousands`;
      },
    },
  },
};

export default function TotalRevenue() {
  const size: any = useWindowSize();

  return (
    <section className="bg-slate-100 flex-1 flex flex-col rounded p-4 mt-8" id="chart">
      <div>
        <h2 className="p-regular-18">Revenue Total</h2>

        <div className="my-2 flex gap-4 flex-wrap">
          <h5 className="h5-bold">100€</h5>

          <div className="flex items-center gap-1">
            <Icons.ArrowUp className="w-4 h-4 text-green-500" />

            <div className="flex flex-col">
              <span className="text-green-500 p-semibold-14">0.8%</span>
              <span className="p-medium-12">Depuis le dernier mois</span>
            </div>
          </div>
        </div>
      </div>

      <ReactApexChart
        type="bar"
        height={(size?.width < 1186 && size?.width > 1018) ? 310 : (size?.width < 920) ? 310 : 410}
        series={TotalRevenueSeries}
        options={TotalRevenueOptions}
      />
    </section>
  );
}

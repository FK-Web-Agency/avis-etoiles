"use client"

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useWindowSize } from '@uidotdev/usehooks';

import { Icons } from '../shared';
import { IAnalyticItem, IMonth } from '@/interfaces/analytic';
import { classNames } from '@/helper';

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

export default function KPIGame({ analytics }: any) {
  const size: any = useWindowSize();

  const months = analytics?.flatMap((item: IAnalyticItem) => item.months);

  const monthlyVisits = months?.map((month: IMonth | null) => month?.visitors);

  const sumByMonth = months?.map((month: IMonth | null) => {
    const calc = month?.facebook! + month?.google! + month?.instagram!;

    return calc;
  });

  while (monthlyVisits?.length < 12) {
    monthlyVisits.push(0);
  }

  while (sumByMonth?.length < 12) {
    sumByMonth.push(0);
  }

  const TotalRevenueSeries = [
    {
      name: 'Visiteurs',
      data: monthlyVisits,
    },
    {
      name: 'Taux de conversion',
      data: sumByMonth,
    },
  ];

  const currentMonth = Number(new Date(Date.now()).toLocaleString('fr-FR', { month: 'numeric' })) - 1;
  const previousMonth = currentMonth - 1;

  let currentConversionRate = 0;
  let previousConversionRate = 0;

  if (sumByMonth && sumByMonth[currentMonth] && monthlyVisits && monthlyVisits[currentMonth]) {
    currentConversionRate = sumByMonth[currentMonth] / monthlyVisits[currentMonth];
  }

  if (sumByMonth && sumByMonth[previousMonth] && monthlyVisits && monthlyVisits[previousMonth]) {
    previousConversionRate = sumByMonth[previousMonth] / monthlyVisits[previousMonth];
  }

  const conversionRateDifference = previousConversionRate
    ? ((currentConversionRate - previousConversionRate) / previousConversionRate) * 100
    : 0;

  return (
    <section className="bg-slate-100 flex-1 flex flex-col rounded p-4 mt-8" id="chart-kpi">
      <div>
        <h2 className="p-regular-18">Taux de conversion</h2>

        <div className="my-2 flex gap-4 flex-wrap">
          <h5 className="h5-bold">
            <span className="block text-xs font-semibold capitalize">
              {new Date(Date.now()).toLocaleString('fr-FR', { month: 'long' })}
            </span>
            {(currentConversionRate * 100).toFixed(2)}%
          </h5>
          {previousConversionRate ? (
            <div className="flex items-center gap-1">
              {currentConversionRate < 0 ? (
                <Icons.ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <Icons.ArrowDown className="w-4 h-4 text-red-500" />
              )}

              <div className="flex flex-col">
                <span
                  className={classNames(
                    ' p-semibold-14',
                    currentConversionRate < 0 ? 'text-green-500' : 'text-red-500'
                  )}>
                  {conversionRateDifference.toFixed(2)}%
                </span>
                <span className="p-medium-12">Depuis le dernier mois</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {TotalRevenueSeries && (
        <ReactApexChart
          type="bar"
          height={size?.width < 1186 && size?.width > 1018 ? 310 : size?.width < 920 ? 310 : 410}
          series={TotalRevenueSeries}
          options={TotalRevenueOptions}
        />
      )}
    </section>
  );
}

'use client';

import { BaseRecord, useList } from '@refinedev/core';
import { useWindowSize } from '@uidotdev/usehooks';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import ApexCharts from 'react-apexcharts';

/* const TotalRevenueSeries = [
  {
    name: 'Last Month',
    data: [183, 124, 115, 85, 143, 143, 96],
  },
  {
    name: 'Running Month',
    data: [95, 84, 72, 44, 108, 108, 47],
  },
]; */

const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
    id: 'apexchart-example',
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
    categories: ['Jan', 'Fev', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  yaxis: {
    title: {
      text: '€',
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
        return ` ${val} €`;
      },
    },
  },
};

export default function ExampleChart({
  TotalRevenueSeries,
}: {
  TotalRevenueSeries: { name: string; data: number[] }[];
}) {
  const [_window, set_window] = useState<null | (Window & typeof globalThis)>(null);
  const size: any = useWindowSize();

  useEffect(() => {
    if (window) {
      set_window(window);
    }
  }, []);

  if (!_window) return null;

  return (
    <>
      <ApexCharts
        type="bar"
        height={size?.width < 1186 && size?.width > 1018 ? 310 : size?.width < 920 ? 310 : 410}
        series={TotalRevenueSeries}
        options={TotalRevenueOptions}
      />
    </>
  );
}

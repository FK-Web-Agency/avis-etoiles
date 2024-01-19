"use client"

import ReactApexChart from "react-apexcharts";
import { z } from "zod";

const PieChartSchema = z.object({
  title: z.string(),
  value: z.number(),
  series: z.array(z.number()),
  colors: z.array(z.string()),
});

type PieChartProps = z.infer<typeof PieChartSchema>;


export default function PieChart({ title, value, series, colors }:PieChartProps) {
  return (
    <div className="bg-slate-100 flex justify-between items-center gap-2 pl-3 py-2 rounded min-h-28 w-full">
      <div className="flex flex-col">
        <h4 className="p-regular-14 text-gray-600">{title}</h4>
        <p className="p-bold-24 text-gray-900">{value}</p>
      </div>

      <ReactApexChart
      options={{
        chart: {type: 'donut'},
        colors,
        legend: {show: false},
        dataLabels: {enabled: false},
      }}
      series={series}
      type="donut"
      width={"120px"}
      />
    </div>
  );
}

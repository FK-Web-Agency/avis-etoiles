'use client';

import { z } from 'zod';

const PieChartSchema = z.object({
  title: z.string(),
  value: z.number(),
  Icon: z.any(),
});

type PieChartProps = z.infer<typeof PieChartSchema>;

export default function PieChart({ title, value, Icon }: PieChartProps) {
  return (
    <div className="bg-slate-100 flex justify-between items-center gap-2 p-2 rounded min-h-28 w-full shadow-lg">
      <div className="flex flex-col">
        <h4 className="p-regular-14 text-gray-600">{title}</h4>
        <p className="p-bold-24 text-gray-900">{value}</p>
      </div>
      {Icon }
    </div>
  );
}

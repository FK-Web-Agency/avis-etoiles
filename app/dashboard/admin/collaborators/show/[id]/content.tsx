'use client';

import { useList } from '@refinedev/core';
import { Spinner } from '@/components/shared';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

export default function Content({ id }: { id: string }) {
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_ORDERS,
    filters: [
      {
        field: 'seller._ref',
        operator: 'eq',
        value: id,
      },
    ],
  });

  if (isLoading) return <Spinner />;

  const orders = data?.data;
  console.log(orders);

  return (
    <div>
      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead>N° commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Intervale</TableHead>
            <TableHead>Crée le</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow className="border-gray-600">
              <TableCell className="font-medium">{order?.stripeId}</TableCell>

              <TableCell className="font-medium">
                <div className="flex-center text-slate-50">{order?.buyer}</div>
              </TableCell>

              <TableCell >
                <div className="flex-center text-slate-50">{order?.price}</div>
              </TableCell>

              <TableCell >
                <div className="flex-center text-slate-50">{order?.price}</div>
              </TableCell>

              <TableCell >
                <div className="flex-center text-slate-50">{order?.createdAt}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

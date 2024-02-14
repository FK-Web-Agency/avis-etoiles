'use client';

import { useGo, useList, useMany } from '@refinedev/core';
import { Spinner } from '@/components/shared';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { formatDate } from '@/helper';

export default function Content({ id }: { id: string }) {
  const go = useGo();
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

  const buyerIds = data?.data?.map((order) => order.buyer._ref) || [];

  const { data: dataBuyers } = useMany({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    ids: buyerIds,
  });

  if (isLoading) return <Spinner />;

  const orders = data?.data;

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
          {orders?.map((order) => {
            const buyer = dataBuyers?.data?.find((buyer) => buyer._id === order.buyer._ref);
            return (
              <TableRow className="border-gray-600">
                <TableCell className="font-medium text-white">{order?.stripeId.substring(0, 12) + '...'}</TableCell>

                <TableCell className="font-medium">
                  <div className="text-slate-50">
                    <Button
                      variant={'ghost'}
                      className='hover:underline hover:bg-transparent'
                      onClick={() =>
                        go({
                          to: {
                            resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
                            action: 'show',
                            id: order.buyer._ref,
                          },
                        })
                      }>
                      {buyer?.firstName} {buyer?.lastName}
                      <br />
                      {buyer?.companyName}
                    </Button>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex-center text-slate-50">{order?.price / 100} €</div>
                </TableCell>

                <TableCell>
                  <div className=" text-slate-50">{order?.frequency === 'month' ? 'Mois' : 'Année'}</div>
                </TableCell>

                <TableCell>
                  <div className=" text-slate-50">{formatDate(order?.createdAt)}</div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

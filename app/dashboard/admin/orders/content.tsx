'use client';

import { useState } from 'react';
import { useList } from '@refinedev/core';
import { Icons, Spinner } from '@/components/shared';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import Link from 'next/link';
import { formatDate } from '@/helper';

export default function Content() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_ORDERS!,
    pagination: {
      pageSize: 10,
      current: currentPage,
    },
  });

  const { data: collaborators } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!,
  });

  const { data: subscribers } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
  });

  if (isLoading) return <Spinner />;

  const orders = data?.data;
  const collaboratorsList = collaborators?.data;
  const subscribersList = subscribers?.data;
  console.log(orders);

  return (
    <>
      <h1 className="h4-medium text-white">Les Ventes</h1>

      <Table className="mt-8">
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead className="w-32">N°Commande</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Abonné</TableHead>
            <TableHead>Vendu par</TableHead>
            <TableHead>Date de souscription </TableHead>
            <TableHead className="w-10 sr-only">télécharger</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: any) => {
            const seller = collaboratorsList?.find((collaborator: any) => collaborator._id === order.seller._ref);

            const buyer = subscribersList?.find((subscriber: any) => subscriber._id === order.buyer._ref);
            return (
              <TableRow className="text-white" key={order?._id}>
                <TableCell>{order?.stripeId.substring(0, 12)}</TableCell>
                <TableCell>
                  {order?.price / 100}€/{order?.frequency === 'Month' ? 'mois' : 'an'}
                </TableCell>
                <TableCell>
                  {buyer?.firstName} {buyer?.lastName}
                  <em className="block font-bold">{buyer?.companyName} </em>
                </TableCell>
                <TableCell>
                  {seller?.firstName} {seller?.lastName}
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <Link href={order?.invoice?.url} target="_blank">
                    <Icons.Eye className="h-6 w-6" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

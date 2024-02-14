'use client';

import { useGo, useList, useMany, useOne } from '@refinedev/core';
import { Spinner } from '@/components/shared';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { formatDate } from '@/helper';
import Link from 'next/link';

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

  const { data: dataCollaborator } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!,
    id,
  });

  if (isLoading) return <Spinner />;

  const orders = data?.data;
  const collaborator = dataCollaborator?.data;

  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {collaborator?.firstName} {collaborator?.lastName}{' '}
          </CardTitle>
          <CardDescription>Information de contact</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <span className="font-medium">Email:</span>{' '}
              <Link className='hover:underline' href={`mailto:${collaborator?.email}`}>{collaborator?.email}</Link>
            </li>
            <li>
              <span className="font-medium">Téléphone:</span>{' '}
              <Link className='hover:underline' href={`tel:${collaborator?.phone}`}>{collaborator?.phone}</Link>
            </li>
            <li>
              <span className="font-medium">Role:</span> {collaborator?.role}
            </li>
          </ul>
        </CardContent>
      </Card>

      <Table>
        <TableHeader className="bg-background">
          <TableRow>
            <TableHead>N° commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Fréquence</TableHead>
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
                      className="hover:underline hover:bg-transparent"
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

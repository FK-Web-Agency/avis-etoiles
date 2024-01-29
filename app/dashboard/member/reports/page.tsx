'use client';

import { useList } from '@refinedev/core';
import { useMemberDashboardStore } from '@/store';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { classNames } from '@/helper';
import { Icons } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';

export default function Reports() {
  const { memberIds } = useMemberDashboardStore();

  const { data, isLoading } = useList({
    resource: 'gameConfig',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: memberIds?.sanityId,
      },
    ],
  });

  const reports = data?.data[0].winners;

  return (
    <div>
      {isLoading ? (
        <TableSkeleton />
      ) : reports?.length > 0 ? (
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Nom et Prénom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-28 hidden sm:table-cell">Téléhpone</TableHead>
              <TableHead className="text-right">Ville</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((user: any) => (
              <TableRow className="border-gray-600">
                <TableCell className="text-right">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-right">{user.email}</TableCell>
                <TableCell className="text-right">{user.phone}</TableCell>
                <TableCell className="text-right">{user.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex-center flex-col">
          <Icons.Disc className="w-16 h-16 text-gray-600" />
          <p className="text-gray-600">Aucun donnée</p>
        </div>
      )}
    </div>
  );
}

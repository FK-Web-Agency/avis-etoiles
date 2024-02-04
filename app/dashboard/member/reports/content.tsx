'use client';

import { useState } from 'react';
import { useList } from '@refinedev/core';
import ExcelJS from 'exceljs';
import { useDashboardStore } from '@/store';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { Icons } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';

export default function Content() {
  const [currentPagination, setCurrentPagination] = useState(1);
  const { userIds } = useDashboardStore();

  const { data, isLoading } = useList({
    resource: 'gameWinners',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: userIds?.sanityId,
      },
    ],
    pagination: {
      pageSize: 20,
      current: currentPagination,
    },
  });


  const reports = data?.data[0]?.winners;

  const handleDownloadFile = function () {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 80;

    sheet.columns = [
      { header: 'Nom et Prénom', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Téléphone', key: 'phone', width: 25 },
      { header: 'Ville', key: 'city' },
    ];

    for (const item of reports) {
      sheet.addRow({
        name: `${item.winnerFirstName} ${item.winnerLastName}`,
        email: item.winnerEmail,
        phone: item.winnerPhone,
        city: item.winnerZipAddress,
      });
    }

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';
      a.click();
    });
  };
  return (
    <div>
      {isLoading ? (
        <TableSkeleton />
      ) : reports?.length > 0 ? (
        <>
          <div className="flex flex-col gap-2 items-start mb-8">
            <p className="p-14-regular">
              Vous voulez faire du mailing vous pouvez télécharger le fichier en xlsx en cliquant sur le bouton
              ci-dessous
            </p>
            <Button variant={'gradient'} onClick={handleDownloadFile}>
              Télécharger
            </Button>
          </div>

          <Table>
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Nom et Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Téléhpone</TableHead>
                <TableHead>Ville</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((user: any) => (
                <TableRow className="border-gray-600 text-slate-100">
                  <TableCell>
                    {user.winnerFirstName} {user.winnerLastName}
                  </TableCell>
                  <TableCell>{user.winnerEmail}</TableCell>
                  <TableCell className="hidden sm:table-cell">{user.winnerPhone}</TableCell>
                  <TableCell>{user.winnerZipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data?.total! > 20 && (
            <Pagination className='mt-8'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => setCurrentPagination(currentPagination + 1)} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" onClick={() => setCurrentPagination(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => setCurrentPagination(currentPagination - 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="flex-center flex-col">
          <Icons.Disc className="w-16 h-16 text-gray-600" />
          <p className="text-gray-600">Aucun donnée</p>
        </div>
      )}
    </div>
  );
}

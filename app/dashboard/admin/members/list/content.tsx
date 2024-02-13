'use client';

import { useList, useGo } from '@refinedev/core';

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
import { classNames } from '@/helper';
import { DeleteMemberButton, Icons } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';
import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { useState } from 'react';

// Fonction pour calculer les pages à afficher
function calculatePagesToShow(current: number, max: number) {
  let start = Math.max(current - 2, 1);
  let end = Math.min(start + 4, max);

  // Ajuster le début si on est proche de la fin
  if (end === max) {
    start = Math.max(end - 4, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Content() {
  const [currentPage, setCurrentPage] = useState(1);

  const go = useGo();
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    pagination: {
      pageSize: 10,
      current: currentPage,
    },
  });

  const members = data?.data || [];
  console.log(data);

  const maxPage = Math.ceil(data?.total! / 10);

  const pagesToShow = calculatePagesToShow(currentPage, maxPage);

  const handleNextPage = () => setCurrentPage(Math.min(currentPage + 1, maxPage));
  const handlePrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1));

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="h4-medium text-white">Tous les Members</h1>

        <Button
          onClick={() => go({ to: { resource: 'members', action: 'create' } })}
          variant={'secondary'}
          className="rounded">
          <Icons.AddMember className="w-4 h-4" />
          <span className="ml-2">Ajouter Membre</span>
        </Button>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : members?.length > 0 ? (
        <div>
          <Table>
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="w-28 hidden sm:table-cell">Expiration</TableHead>
                <TableHead className="text-right sr-only">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((user) => (
                <TableRow className="border-gray-600" key={user?.email}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img className="h-11 w-11 rounded-full" src={user.photo} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-100">
                          {user.firstName} {user.lastName}{' '}
                        </div>
                        <div className="font-medium text-gray-100 p-regular-12">{user.companyName} </div>
                        <div className="mt-1 text-gray-500 flex items-center gap-2">
                          <Link href={`mailto:${user?.email}`}>{user.email}</Link>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <div className={classNames('flex-none rounded-full p-1 bg-current')}>
                        <div
                          className={classNames(
                            user?.subscription?.status ? 'bg-green-600' : 'bg-red-600',
                            'h-1.5 w-1.5 rounded-full '
                          )}
                        />
                      </div>
                      <div className="hidden text-white sm:block">
                        {user?.subscription?.status ? (
                          <span>Actif</span>
                        ) : (
                          <span className="text-gray-500">Inactif</span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <p className="text-white ">
                      {user?.subscription?.expirationDate && user?.subscription?.status ? (
                        formatDistance(new Date(user?.subscription?.expirationDate), new Date(), {
                          addSuffix: true,
                          locale: fr,
                        })
                      ) : (
                        <span className="text-gray-500">Aucune date d'expiration</span>
                      )}
                    </p>
                  </TableCell>
                  <TableCell className="text-right ">
                    <div className="flex justify-center items-center gap-5">
                      <Button
                        onClick={() =>
                          go({
                            to: {
                              resource: 'members',
                              action: 'edit',
                              id: user?._id,
                            },
                            type: 'push',
                          })
                        }
                        variant={'ghost'}
                        size={'sm'}
                        className="border-2 border-gray-100 text-gray-100 hover:text-gray-900">
                        <Icons.Edit className="w-4 h-4" />
                      </Button>
                      <DeleteMemberButton user={user} id={user?._id}>
                        <>
                          <Icons.Delete className="w-4 h-4" />
                        </>
                      </DeleteMemberButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {maxPage > 1 && (
            <Pagination className="mt-8">
              <PaginationContent className="text-slate-50">
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={handlePrevPage} />
                </PaginationItem>
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={() => setCurrentPage(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}
                {pagesToShow.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink href="#" isActive={page === currentPage} onClick={() => setCurrentPage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {currentPage < maxPage - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={() => setCurrentPage(maxPage)}>
                        {maxPage}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem hidden={currentPage === maxPage}>
                  <PaginationNext href="#" onClick={handleNextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <div className="flex-center flex-col">
          <Icons.Disc className="w-16 h-16 text-gray-600" />
          <p className="text-gray-600">Aucun membre</p>
        </div>
      )}
    </>
  );
}

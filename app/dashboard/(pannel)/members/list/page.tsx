'use client';

import { useList, useGo } from '@refinedev/core';

import { Button, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { classNames } from '@/helper';
import { Icons } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';

export default function page() {
  const go = useGo();
  const { data, isLoading } = useList({
    resource: 'users',
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <Table>
      <TableHeader className="bg-background">
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-28">Expiration</TableHead>
          <TableHead className="text-right sr-only">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.data.map((user) => (
          <TableRow className="border-gray-600">
            <TableCell className="font-medium">
              <div className="flex items-center">
                <div className="h-11 w-11 flex-shrink-0">
                  <img className="h-11 w-11 rounded-full" src={user.logo} alt="" />
                </div>
                <div className="ml-4">
                  <div className="font-medium text-gray-100">{user.firstName}</div>
                  <div className="mt-1 text-gray-500">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
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
                  {user?.subscription?.status ? <span>Actif</span> : <span className="text-gray-500">Inactif</span>}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="text-white">
                {user?.subscription?.expirationDate ? (
                  user?.subscription?.expirationDate
                ) : (
                  <span className="text-gray-500">Aucune date d'expiration</span>
                )}
              </p>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-center items-center gap-5">
                <Button
                  onClick={() =>
                    go({
                      to: {
                        resource: 'members',
                        action: 'edit',
                        id: user?._id,
                      },
                    })
                  }
                  variant={'ghost'}
                  size={'sm'}
                  className="rounded border-2 border-gray-100 px-2 text-gray-100 hover:text-gray-900">
                  <Icons.Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant={'destructive'}
                  size={'sm'}
                  className="rounded border-2 border-gray-100 px-2 text-gray-100">
                  <Icons.Delete className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

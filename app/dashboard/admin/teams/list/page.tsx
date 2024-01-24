'use client';

import Link from 'next/link';
import { useList, useGo } from '@refinedev/core';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DeleteMemberButton, Icons, ToggleRoleMemberButton } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';
import { classNames } from '@/helper';

export default function TeamsList() {
  const go = useGo();
  const { data, isLoading } = useList({
    resource: 'users',
    filters: [
      {
        field: 'role',
        operator: 'eq',
        value: 'admin',
      },
    ],
  });

  const teams = data?.data || [];

  return (
    <section>
      <>
        <div className="flex justify-between items-center mb-8">
          <h1 className="h4-medium text-white">Toutes équipes</h1>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : teams?.length > 0 ? (
          <Table>
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead className="text-right sr-only">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((user) => (
                <TableRow className="border-gray-600">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img className="h-11 w-11 rounded-full" src={user.photo} alt={user?.name} />
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

                  <TableCell className="text-right">
                    <div className="flex justify-center items-center gap-5">
                      <ToggleRoleMemberButton user={user}>
                        <Icons.Group
                          className={classNames(
                            user?.role === 'member' ? 'text-gray-100' : 'text-green-500',
                            'transition-colors duration-200 w-4 h-4'
                          )}
                        />
                      </ToggleRoleMemberButton>

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
                        className="rounded border-2 border-gray-100 px-2 text-gray-100 hover:text-gray-900">
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
        ) : (
          <div className="flex-center flex-col">
            <Icons.Disc className="w-16 h-16 text-gray-400" />
            <p className="text-gray-400">Aucun membre</p>
          </div>
        )}
      </>
    </section>
  );
}

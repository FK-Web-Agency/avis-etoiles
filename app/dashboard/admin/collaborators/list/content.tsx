'use client';

import Link from 'next/link';
import { useList, useGo } from '@refinedev/core';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DeleteCollaboratorButton, DeleteMemberButton, Icons, ToggleRoleMemberButton } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';
import { classNames } from '@/helper';

export default function Content() {
  const go = useGo();
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!,
    filters: [
      {
        field: 'disabled',
        operator: 'eq',
        value: 'false',
      },
    ],
  });

  const { data: ordersData } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_ORDERS,
  });

  const teams = data?.data || [];
  const orders = ordersData?.data || [];

  return (
    <section>
      <>
        <div className="flex justify-between items-center mb-8 gap-2 flex-wrap">
          <h1 className="h4-medium text-white">Tous les collaborateurs</h1>

          <Button
            onClick={() => go({ to: { resource: 'collaborators', action: 'create' } })}
            variant={'secondary'}
            className="rounded">
            <Icons.AddMember className="w-4 h-4" />
            <span className="ml-2">Ajouter collaborateur</span>
          </Button>
        </div>
        {isLoading ? (
          <TableSkeleton />
        ) : teams?.length > 0 ? (
          <Table>
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Nbre de ventes</TableHead>
                <TableHead className="text-right sr-only">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((user) => {
                const numOrders = orders.filter((order) => {
                  // console.log(order);

                  return order?.seller?._ref === user._id;
                });

                return (
                  <TableRow className="border-gray-600">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src={
                              'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yYjZTVHdMZTdLN1RZT1pRSUJqbm41MVpIUjgiLCJyaWQiOiJ1c2VyXzJjRG9WNlpRdzFvd29XNVRjTnZqQWw1RUJEZCIsImluaXRpYWxzIjoiSkQifQ'
                            }
                            alt={user?.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-100">
                            {user.firstName} {user.lastName}{' '}
                          </div>
                          <div className="mt-1 text-gray-500 flex items-center gap-2">
                            <Link href={`mailto:${user?.email}`}>{user.email}</Link>
                          </div>
                          <div className="font-medium text-primary p-regular-12">{user.role}</div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">
                      <div className="flex-center text-slate-50">{numOrders.length}</div>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-center items-center gap-5">
                        <Button
                          onClick={() =>
                            go({
                              to: {
                                resource: 'collaborators',
                                action: 'show',
                                id: user?._id,
                              },
                              type: 'push',
                            })
                          }
                          variant={'ghost'}
                          size={'sm'}
                          className="rounded border-2 border-gray-100 text-gray-100 hover:text-gray-900 px-4 py-2">
                          <Icons.Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          onClick={() =>
                            go({
                              to: {
                                resource: 'collaborators',
                                action: 'edit',
                                id: user?._id,
                              },
                              type: 'push',
                            })
                          }
                          variant={'ghost'}
                          size={'sm'}
                          className="rounded border-2 border-gray-100 text-gray-100 hover:text-gray-900 px-4 py-2">
                          <Icons.Edit className="w-4 h-4" />
                        </Button>
                        <DeleteCollaboratorButton user={user} id={user?._id}>
                          <>
                            <Icons.Delete className="w-4 h-4" />
                          </>
                        </DeleteCollaboratorButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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

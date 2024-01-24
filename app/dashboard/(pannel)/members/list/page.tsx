'use client';

import { useList, useGo } from '@refinedev/core';

import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { classNames } from '@/helper';
import { DeleteMemberButton, Icons, ToggleRoleMemberButton } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';
import Link from 'next/link';

export default function page() {
  const go = useGo();
  const { data, isLoading } = useList({
    resource: 'users',
  });

  const members = data?.data || [];

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
        <Table>
          <TableHeader className="bg-background">
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-28 hidden sm:table-cell">Expiration</TableHead>
              <TableHead className="text-right sr-only">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((user) => (
              <TableRow className="border-gray-600">
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
                <TableCell className=" ">
                  <p className="text-white ">
                    {user?.subscription?.expirationDate ? (
                      user?.subscription?.expirationDate
                    ) : (
                      <span className="text-gray-500">Aucune date d'expiration</span>
                    )}
                  </p>
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
          <Icons.Disc className="w-16 h-16 text-gray-600" />
          <p className="text-gray-600">Aucun membre</p>
        </div>
      )}
    </>
  );
}

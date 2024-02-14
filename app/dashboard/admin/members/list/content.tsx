'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useList, useGo } from '@refinedev/core';
import Stripe from 'stripe';

import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { classNames } from '@/helper';
import { DeleteMemberButton, Icons } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';
import { PaginationTable } from '@/components/dashboard';
import { getAllSubscribers, getSession } from '@/lib/actions/stripe.actions';
import { client } from '@/sanity/lib';

export default function Content() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allSubscribers, setAllSubscribers] = useState<Stripe.Subscription[] | null>(null);
  const [session, setSession] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const go = useGo();

  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    filters: [
      {
        field: 'disabled',
        operator: 'eq',
        value: 'false',
      },
    ],
    pagination: {
      pageSize: 10,
      current: currentPage,
    },
  });

  const members = data?.data || [];

  const maxPage = Math.ceil(data?.total! / 10);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const subscribers = await getAllSubscribers();
      setAllSubscribers(subscribers);
    };

    fetchSubscribers();
  }, [members]);

  const handleNextPage = () => setCurrentPage(Math.min(currentPage + 1, maxPage));
  const handlePrevPage = () => setCurrentPage(Math.max(currentPage - 1, 1));

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="h4-medium text-white">Tous les Abonnés</h1>

        <Button
          onClick={() => go({ to: { resource: 'members', action: 'create' } })}
          variant={'secondary'}
          className="rounded">
          <Icons.AddMember className="w-4 h-4" />
          <span className="ml-2">Ajouter Abonné</span>
        </Button>
      </div>
      {isLoading || !allSubscribers ? (
        <TableSkeleton />
      ) : members?.length > 0 ? (
        <div>
          <Table>
            <TableHeader className="bg-background">
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="w-28 hidden sm:table-cell">Souscrit par</TableHead>
                <TableHead className="text-right sr-only">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((user) => {
                const userSubscription = allSubscribers?.find((subscriber) => {
                  const buyer = JSON.parse(subscriber.metadata.buyer);

                  return buyer._ref === user._id;
                });

                getSession({ subscriberId: user?._id }).then((res) => {
                  setSession(res);
                });

                const sellerSubscription = userSubscription && JSON.parse(userSubscription?.metadata?.seller!);

                const subscriptionIsActive = userSubscription?.status === 'active';

                const unPaid = session?.payment_status === 'unpaid';

                const sessionSeller = session && JSON.parse(session?.metadata?.seller);

                console.log(sellerSubscription?._ref || sessionSeller?._ref);

                client
                  .fetch(
                    `*[_type == "${process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS}" && _id == "${
                      sellerSubscription?._ref || sessionSeller?._ref
                    }"]`
                  )
                  .then((res) => {
                    if (seller) return;
                    setSeller(res[0]);
                  });

                return (
                  <TableRow className="border-gray-600" key={user?.email}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.companyName}`}
                            alt="avatar"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-100">
                            {user.firstName} {user.lastName}
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
                              subscriptionIsActive ? 'bg-green-600' : 'bg-red-600',
                              'h-1.5 w-1.5 rounded-full '
                            )}
                          />
                        </div>
                        <div className="hidden text-white sm:block">
                          {subscriptionIsActive ? (
                            <span>Actif</span>
                          ) : (
                            <span className="text-gray-500">{unPaid ? 'Paiement en attente' : 'Inactif'} </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          go({
                            to: {
                              resource: 'collaborators',
                              action: 'show',
                              id: seller?._id,
                            },
                            type: 'push',
                          })
                        }
                        className="text-white text-left hover:underline hover:bg-transparent">
                        {seller?.firstName} {seller?.lastName}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right ">
                      <div className="flex justify-center items-center gap-5">
                        <Button
                          onClick={() =>
                            go({
                              to: {
                                resource: 'members',
                                action: 'show',
                                id: user?._id,
                              },
                              type: 'push',
                            })
                          }
                          variant={'ghost'}
                          size={'sm'}
                          className="border-2 border-gray-100 text-gray-100 hover:text-gray-900">
                          <Icons.Eye className="w-4 h-4" />
                        </Button>
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
                );
              })}
            </TableBody>
          </Table>

          <PaginationTable {...{ currentPage, maxPage, setCurrentPage, handleNextPage, handlePrevPage }} />
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

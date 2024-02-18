'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useList, useGo } from '@refinedev/core';
import Stripe from 'stripe';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { classNames } from '@/helper';
import { DeleteMemberButton, Icons } from '@/components/shared';
import { TableSkeleton } from '@/components/skeleton';
import { PaginationTable } from '@/components/dashboard';
import { getAllSubscribers, getSession } from '@/lib/actions/stripe.actions';

export default function Content() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [unpaidNumber, setUnpaidNumber] = useState(0);
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

  const { data: collaboratorsData, isLoading: collaboratorsLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!,
  });

  const members = data?.data || [];
  const collaborators = collaboratorsData?.data || [];

  const maxPage = Math.ceil(data?.total! / 10);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const subscribers = await getAllSubscribers();

      for (const member of members) {
        subscribers?.find(async (subscriber) => {
          console.log('subscriber', subscriber);

          // @ts-ignore
          const session = await getSession({
            subscriberId: member.email === 'texierremy@gilles.com' ? 'texierremy@gilles.com' : member._id,
          });
          const sellerSession = session?.metadata?.seller ? JSON.parse(session.metadata.seller) : null;

          const buyer = subscriber?.metadata?.buyer ? JSON.parse(subscriber.metadata.buyer) : null;



          if (buyer?._ref === member._id) {
            const sellerStripe = subscriber?.metadata?.seller ? JSON.parse(subscriber.metadata.seller) : null;

            const seller = collaborators.find((collaborator) => collaborator._id === sellerStripe?._ref);

            member.seller = seller;
            member.subscription.status = subscriber.status;
            member.subscription.id = subscriber.id;
            member.subscription.unpaid = subscriber.status !== 'active';

            if (subscriber.status !== 'active') setUnpaidNumber(unpaidNumber + 1);
            // console.log('Found member', member);
          } else {
            //console.log('Not found member', member);
            const seller = collaborators.find((collaborator) => collaborator._id === sellerSession?._ref);

            member.seller = seller || { firstName: 'Avis', lastName: 'Étoiles' };
            member.subscription.status = 'inactive';
            member.subscription.unpaid = true;

            setUnpaidNumber(unpaidNumber + 1);
          }
        });
      }
    };
    if (!isLoading && !collaboratorsLoading) {
      fetchSubscribers().then(() => setLoading(false));
    }
  }, [members, collaborators]);


  console.log('members', members);
  

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
      {isLoading || collaboratorsLoading || loading ? (
        <TableSkeleton />
      ) : members?.length > 0 ? (
        <div>
          <div className={classNames(unpaidNumber ? '' : 'hidden')}>
            <h3 className="p-medium-20 text-red-600 mb-4">Abonnement(s) Impayé(s)</h3>
            <Carousel className="w-3/4 sm:w-96 ml-10 mb-8">
              <CarouselContent>
                {members.map((user) => {
                  if (!user.subscription.unpaid) return;

                  if (unpaidNumber)
                    return (
                      <CarouselItem key={user?.email}>
                        <Card>
                          <CardHeader>
                            <CardTitle>
                              {user.firstName} {user.lastName}
                            </CardTitle>
                            <CardDescription>{user.companyName}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p>Contacter</p>

                            <ul>
                              <li className="flex items-center gap-2">
                                <Icons.Phone className="w-4 h-4" />
                                <Link className="hover:underline" href={`tel:${user?.phone}`}>
                                  {user.phone}
                                </Link>
                              </li>

                              <li className="flex items-center gap-2">
                                <Icons.Envelope className="w-4 h-4" />
                                <Link className="hover:underline" href={`mailto:${user?.email}`}>
                                  {user.email}
                                </Link>
                              </li>
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <ul>
                              <li>
                                {' '}
                                <span className="font-bold">Status</span> :{' '}
                                {user.subscription.unpaid ? 'Paiement en attente' : 'Inactif'}
                              </li>
                              <li>
                                {' '}
                                <span className="font-bold">Vendu par</span> : {user.seller?.firstName}{' '}
                                {user.seller?.lastName}
                              </li>
                            </ul>
                            <p></p>
                            <p></p>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

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
                console.log(user.subscription.status);

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
                              user.subscription.status === 'active' ? 'bg-green-600' : 'bg-red-600',
                              'h-1.5 w-1.5 rounded-full '
                            )}
                          />
                        </div>
                        <div className="hidden text-white sm:block">
                          {user.subscription.status == 'active' ? (
                            <span>Actif</span>
                          ) : (
                            <span className="text-gray-500">
                              {user.subscription.unpaid ? 'Paiement en attente' : 'Inactif'}{' '}
                            </span>
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
                              id: user?.seller?._id,
                            },
                            type: 'push',
                          })
                        }
                        className="text-white text-left hover:underline hover:bg-transparent">
                        {user?.seller?.firstName} {user?.seller?.lastName}
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

'use client';

import { Spinner } from '@/components/shared';
import { Button } from '@/components/ui';
import { formatDate, formatToISOString } from '@/helper';
import { useDashboardStore } from '@/store';
import { useOne } from '@refinedev/core';
import Link from 'next/link';
import React from 'react';

export default function Content() {
  const { userIds } = useDashboardStore();

  const { data, isLoading } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    id: userIds?.sanityId,
  });

  if (isLoading) return <Spinner />;

  const subscription = data?.data?.subscription;

  console.log('====================================');
  console.log('subscription', data);
  console.log('====================================');
  return (
    <div>
      <div className="bg-muted p-4 rounded-xl mb-10">
        <h2 className="text-lg  font-semibold">Abonnement Actuel</h2>

        <div className="flex justify-between mt-4">
          <div>
            <h3 className=" text-sm">Plan</h3>
            <p className=" text-sm">{subscription?.plan}</p>
          </div>

          <div>
            <h3 className=" text-sm">Prix</h3>
            <p className=" text-sm">
              {subscription?.price}€/ {subscription?.recurring}
            </p>
          </div>

          <div>
            <h3 className=" text-sm">Début</h3>
            <p className=" text-sm">{formatDate((subscription?.startDate))}</p>
          </div>
        </div>
      </div>

      <Button asChild>
        <Link
        target='_blank'
        href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_HANDLE_SUBSCRIPTION!}>
          Gerer mon abonnement
        </Link>
      </Button>
    </div>
  );
}

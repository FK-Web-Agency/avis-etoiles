'use client';

import { useOne } from '@refinedev/core';
import Link from 'next/link';

export default function BannerUnpaid({ sanityId }: { sanityId: string }) {
  const { data, isLoading } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS,
    id: sanityId,
  });

  if (isLoading) return null;

  const subscriber = data?.data;
  const url = 'https://billing.stripe.com/p/login/test_fZe17G2VSdtL7bG3cc';

  return (
    <>
      {subscriber && subscriber?.subscription?.status !== 'active' && (
        <div className="flex flex-col justify-center items-center gap-x-6 bg-red-600 px-6 py-2.5 sm:px-3.5">
          <strong className="font-semibold block text-center text-white">Abonnement impayé</strong>
          <p className="text-sm text-center leading-6 text-white">
            Pour bénéficier de vos avantages, veuillez procéder au paiement de votre abonnement en{' '}
            <Link href={url} className="underline font-bold " target="_blank">
              cliquant ici&nbsp;
            </Link>
            <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      )}
    </>
  );
}

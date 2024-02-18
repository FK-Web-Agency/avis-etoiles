'use client';

import { getSession } from '@/lib/actions/stripe.actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BannerUnpaid({ sanityId }: { sanityId: string }) {
  const [subscriber, setSubscriber] = useState<any>(null);
  const [unpaid, setUnpaid] = useState(true);

  useEffect(() => {
    const fetchSubscriber = async () => {
      const subscriber = await getSession({ subscriberId: sanityId });

      if (!subscriber) {
        return setUnpaid(false);
      }

      if (subscriber?.payment_status === 'unpaid' && subscriber?.status === 'open') {
        return setSubscriber(subscriber);
      }

      if (subscriber?.payment_status === 'paid') {
        return setUnpaid(false);
      }
    };

    fetchSubscriber();
  }, [sanityId]);

  const url = subscriber?.url || 'https://billing.stripe.com/p/login/test_fZe17G2VSdtL7bG3cc';

  return (
    <>
      {subscriber && unpaid && (
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

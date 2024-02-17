import React from 'react';
import Link from 'next/link';

import Icons from './Icons';
import { client, queries } from '@/sanity/lib';
import InformationFooter from './InformationFooter';
import { sanityFetch } from '@/sanity/lib/client';

export default async function Footer() {
  const { address, email, phone, legalNotice, termsAndConditions, termsOfUse, privacyPolicy } =
    await sanityFetch<any>({query: queries.GET_GENERAL});

  const informations = [legalNotice, termsAndConditions, termsOfUse, privacyPolicy];

  return (
    <footer className="p-4 mt-10 sm:p-6 wrapper">
      <div className="wrapper">
        <div className="md:flex gap-5 md:justify-between">
          <div className="mb-6 md:mb-0">
            <Icons.Logo />
          </div>


          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 ">
            {/* ------------------------------- Ressources ------------------------------- */}
            <div>
              <h5 className="mb-6 text-sm font-semibold text-yellow-300 uppercase">Resources</h5>
              <ul className="text-gray-400  flex flex-col gap-4">
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Espace membre
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:underline">
                    Comment ça marche ?
                  </Link>
                </li>
                <li>
                  <Link href="/prices" className="hover:underline">
                    Tarif
                  </Link>
                </li>
                <li>Demander une démo</li>
              </ul>
            </div>

            {/* --------------------------------- Contact -------------------------------- */}
            <div>
              <h5 className="mb-6 text-sm font-semibold text-yellow-300 uppercase">Contact</h5>
              <address>
                <ul className="text-gray-400 flex flex-col gap-4">
                  <li className="flex gap-4">
                    <Icons.BuildingOffice className="h-7 w-6 text-gray-400" aria-hidden="true" />
                      <p className="hover:underline ">
                        {address?.street}
                        <br />
                        {address?.zipCode}, {address?.city} {address?.country}
                        <br />
                      </p>
                  </li>
                  <li className="flex items-center gap-4">
                    <Icons.Envelope className="h-7 w-6 text-gray-400" aria-hidden="true" />
                    <Link href={`mailto:${email}`} className="hover:underline">
                      {email}
                    </Link>
                  </li>
                  <li className="flex items-center gap-4">
                    <Icons.Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                    <Link href={`tel:${phone}`} className="hover:underline">
                      {phone}
                    </Link>
                  </li>
                </ul>
              </address>
            </div>

            {/* ------------------------------ Mention Legal ----------------------------- */}
            <div>
              <h5 className="mb-6 text-sm font-semibold text-yellow-300 uppercase">Légal</h5>
              <ul className="text-gray-400 flex flex-col gap-4 ">
                <InformationFooter {...{ informations }} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

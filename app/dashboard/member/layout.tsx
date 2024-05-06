'use client';

import React, { PropsWithChildren } from 'react';
import { useUser } from '@clerk/nextjs';
import { useList } from '@refinedev/core';
import { Icons, Onboarding, Sidebar } from '@/components/shared';
import { Toaster } from '@/components/ui';
import '../../styles/globals.css';
import { BannerUnpaid } from '@/components/dashboard';

export default function layout({ children }: PropsWithChildren) {
  const { user } = useUser();
  const id = user?.publicMetadata.userId;

  const { data, isLoading } = useList({
    resource: 'gameConfig',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: id,
      },
    ],
  });


  console.log(data);
  

  /* 
  1) Changer le mot de passe
  2) Config du jeu
    * Ajouter le logo de l'entreprise
    * Choissir son arriere plan
    * Choisir les couleurs
    * Choisir les cadeaux
    * Choisir les actions
    * définir les règles du jeu (nombre de points, nombre de cadeaux, nombre de gagnants)
  */

  if (isLoading)
    return (
      <div className="h-screen flex-center">
        <Icons.Spinner className="w-8 h-8 animate-spin" />
      </div>
    );

  if (data?.total === 0 && !isLoading) {
    console.log('====================================');
    console.log("No data");
    console.log('====================================');
    return (
      <html lang="fr" className="min-h-screen">
        <head>
          <title>Avis - Onboarding</title>
          {/*  <script
      defer
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=initMap`}></script> */}
        </head>

        <body className=" background-body">
          <BannerUnpaid sanityId={id as string} />

          <Onboarding user={user} />

          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="fr" className="min-h-screen">
      <head>
        <title>Avis - Overview</title>
        {/*  <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=initMap`}></script> */}
      </head>

      <body className=" background-body">
        <BannerUnpaid sanityId={id as string} />
        {<Sidebar>{children}</Sidebar>}

        <Toaster />
      </body>
    </html>
  );
}

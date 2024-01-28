'use client';

import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import { useList } from '@refinedev/core';
import { Onboarding, Sidebar } from '@/components/shared';
import { Toaster } from '@/components/ui';
import { useMemberDashboardStore, useOnboardingStore } from '@/store';
import '../../styles/globals.css';

export default function layout({ children }: PropsWithChildren) {
  const { user } = useUser();
  const { setMemberIds } = useMemberDashboardStore();

  const { data, isLoading } = useList({
    resource: 'gameConfig',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: user?.publicMetadata.userId,
      },
    ],
  });

  const { setUserIds } = useOnboardingStore();

  const public_metadata = user?.publicMetadata;

  useEffect(() => {
    const ids = { clerkId: user?.id as string, sanityId: public_metadata?.userId as string };

    setUserIds(ids);
    setMemberIds(ids);
  }, [user]);

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

  if (isLoading) return <div>Chargement...</div>;

  if (data?.total === 0) {
    setTimeout(() => {
      return (
        <html lang="fr" className="min-h-screen">
          <head>
            <title>Avis - Onboarding</title>
            {/*  <script
      defer
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=initMap`}></script> */}
          </head>

          <body className=" background-body">
            <Onboarding user={user} />

            <Toaster />
          </body>
        </html>
      );
    }, 500);
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
        {<Sidebar>{children}</Sidebar>}

        <Toaster />
      </body>
    </html>
  );
}

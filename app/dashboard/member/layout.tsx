'use client';

import { useUser } from '@clerk/nextjs';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import '../../styles/globals.css';
import { Onboarding, Sidebar } from '@/components/shared';
import { Toaster } from '@/components/ui';
import { useOnboardingStore } from '@/store';

export default function layout({ children }: PropsWithChildren) {
  const { user } = useUser();
  const { setUserIds } = useOnboardingStore();

  const public_metadata = user?.publicMetadata;

  useEffect(() => {
    setUserIds({ clerkId: user?.id, sanityId: public_metadata?.userId as string });
  }, []);
  const libraries = useMemo(() => ['places'], []);


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


  return (
    <html lang="fr" className="min-h-screen">
      <head>
        <title>Avis - Onboarding</title>
        {/*  <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places&callback=initMap`}></script> */}
      </head>

      <body className=" background-body">
        {user?.lastSignInAt ? <Onboarding user={user} /> : <Sidebar>{children}</Sidebar>}

        <Toaster />
      </body>
    </html>
  );
}

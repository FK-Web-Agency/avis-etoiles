'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';
import dataProvider from 'refine-sanity';
import { detectIncognito } from 'detectincognitojs';
import { useLocalStorage, useWindowSize } from '@uidotdev/usehooks';

import { client } from '@/sanity/lib';
import { useGameStore } from '@/store';
import '../styles/globals.css';
import { Icons } from '@/components/shared';
import { UserHistoryProps } from '@/store/game.store';
import { Toaster } from '@/components/ui';

// Incognito Content
function IncognitoContent() {
  return (
    <main className="wrapper ">
      <h1 className="h1-bold text-red-700">Navigation Privée</h1>
      <p className="p-semibold-16 mt-10">
        Nous avons détecté que vous utilisez actuellement le mode de navigation privée. Malheureusement, notre site Web
        n'est pas entièrement fonctionnel dans ce mode pour des raisons de performance et de sécurité. <br />
        <br /> Pour profiter pleinement de toutes les fonctionnalités de notre site, nous vous recommandons de
        désactiver le mode de navigation privée ou de visiter notre site dans une fenêtre de navigateur standard. <br />
        <br /> Nous nous excusons pour tout désagrément que cela pourrait causer et vous remercions de votre
        compréhension.
      </p>
    </main>
  );
}

// User can not play
function UserCanNotPlay() {
  return (
    <main className="background-body min-h-screen">
      <div className="wrapper">
        <h1 className="h1-bold text-red-700 mb-8">🕒 Attendez un peu !</h1>
        <p className="p-semibold-16">
          Nous sommes ravis de voir votre enthousiasme, mais il semble que vous ayez accédé à cette fonctionnalité très
          récemment.
          <br />
          <br />
          Pour assurer une expérience équilibrée pour tous nos utilisateurs, nous avons mis en place une période
          d'attente de 24 heures.
        </p>
      </div>
    </main>
  );
}

// User use large device
function LargeDeviceContent() {
  return (
    <main className=" background-body min-h-screen">
      <div className="wrapper">
        <h1 className="h1-bold text-red-700">Grand écran</h1>
        <p className="p-semibold-16">
          Optimisée pour les smartphones, notre page offre une expérience utilisateur exceptionnelle sur tous les
          appareils mobiles et tablette.
        </p>
      </div>
    </main>
  );
}

// Main content
function MainContent({ children }: PropsWithChildren) {
  return (
    <Refine
      // @ts-ignore
      dataProvider={dataProvider(client)}
      routerProvider={routerProvider}
      resources={[]}
      options={{
        liveMode: 'auto',
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        projectId: 'eT5PSC-Goadjp-dYfdbS',
      }}>
      {children}
    </Refine>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [userHistory, saveUserHistory] = useLocalStorage<UserHistoryProps | undefined>(
    process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY!,
    undefined
  );
  const size = useWindowSize();
  const { canPlay, setCanPlay, setCurrentAction, setUserLocalStorage } = useGameStore();

  useEffect(() => {
    // Verify the user don't use private navigation
    // if so, send a error message
    detectIncognito().then((isIncognito) => {
      setIsPrivateMode(isIncognito.isPrivate);
    });

    // Verify the user didn't play the game today
    // if so, send a error message

    console.log(userHistory);

    if (userHistory?.lastGamePlayed) {
      const today = new Date();
      // Verify the last date played is not today
      const todayFormat = today.toLocaleString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' });
      const lastGamePlayedFormat = new Date(userHistory?.lastGamePlayed).toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });

      todayFormat === lastGamePlayedFormat ? setCanPlay(false) : setCanPlay(true);
    }

    // Verify the action the user has to do
    if (userHistory?.actions) {
      const actions = userHistory?.actions;
      if (actions.includes('google')) setCurrentAction({ title: 'instagram', Icon: Icons.Instagram });
      if (actions.includes('instagram')) setCurrentAction({ title: 'facebook', Icon: Icons.Facebook });
    } else setCurrentAction({ title: 'google', Icon: Icons.Google });

    setUserLocalStorage(userHistory, saveUserHistory);
  }, []);

  // Verify if the user is on a small device
  // If user do not use a small device, we don't show the game
  useEffect(() => {
    setIsSmallDevice(size.width ? size.width <= 768 : false);
  }, [size]);

  if (isPrivateMode)
    return (
      <html lang="fr">
        <body className="min-h-screen background-body">
          <IncognitoContent />
      
        </body>
      </html>
    );

  return (
    <html lang="fr">
      <body className="min-h-screen overflow-y-auto">
        {!isSmallDevice ? <LargeDeviceContent /> : null}
        {!canPlay && isSmallDevice ? <UserCanNotPlay /> : null}
        {canPlay && isSmallDevice ? <MainContent children={children} /> : null}
        <Toaster />
      </body>
    </html>
  );
}

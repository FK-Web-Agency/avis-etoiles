'use client';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';

import dataProvider from 'refine-sanity';
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';

import { client } from '@/sanity/lib';
import { useEffect } from 'react';
import { RefineProvider } from '@/components/shared';

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="fr">
      <body>
        <ClerkProvider localization={frFR}>
          <DevtoolsProvider>
            <RefineProvider>
              {children}
            </RefineProvider>
          </DevtoolsProvider>
          <DevtoolsPanel />
        </ClerkProvider>
      </body>
    </html>
  );
}

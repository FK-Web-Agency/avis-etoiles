'use client';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';
import dataProvider from 'refine-sanity';
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';

import { client } from '@/sanity/lib';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body >
        <ClerkProvider localization={frFR}>
          <Refine
            // @ts-ignore
            dataProvider={dataProvider(client)}
            routerProvider={routerProvider}
            resources={[
              {
                name: 'overview',
                list: '/dashboard/overview',
                show: '/posts/show/:id',
              },
              {
                name: 'categories',
                list: '/categories',
                show: '/categories/show/:id',
              },
            ]}>
           {children}
          </Refine>
        </ClerkProvider>
      </body>
    </html>
  );
}

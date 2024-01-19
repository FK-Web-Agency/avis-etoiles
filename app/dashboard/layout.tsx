'use client';

import { Refine } from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router/app';
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';

import dataProvider from 'refine-sanity';
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';

import { client } from '@/sanity/lib';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ClerkProvider localization={frFR}>
          <DevtoolsProvider>
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
                  name: 'members',
                  list: '/dashboard/members',
                  create: '/dashboard/members/create',
                  show: '/dashboard/members/:id',
                },
              ]}
              options={{
                projectId: 'eT5PSC-Goadjp-dYfdbS',
              }}>
              {children}
            </Refine>
          </DevtoolsProvider>
          <DevtoolsPanel />
        </ClerkProvider>
      </body>
    </html>
  );
}

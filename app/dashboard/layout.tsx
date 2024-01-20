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
                  show: '/dashboard/overview',
                },
                {
                  name: 'members',
                  list: '/dashboard/members/list',
                  show: '/dashboard/members/show/:id',
                  create: '/dashboard/members/create',
                  edit: '/dashboard/members/edit/:id',
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                liveMode: 'auto',
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
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

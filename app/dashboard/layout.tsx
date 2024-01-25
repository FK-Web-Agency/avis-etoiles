'use client';


import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools';

import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';


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

'use client';

import { PropsWithChildren, useEffect } from 'react';
import '../../styles/globals.css';
import { Sidebar } from '@/components/shared';
import { Toaster } from '@/components/ui';
import { useDashboardStore } from '@/store';
import { redirect } from 'next/navigation';

export default function layout({ children }: PropsWithChildren) {
  const { role } = useDashboardStore();

  useEffect(() => {
    if (role === 'member') redirect('/dashboard/member/overview');
    if (role === 'null') redirect('/login');
  }, [role]);

  return (
    <html lang="fr" className="min-h-screen">
      <head>
        <title>Avis Étoiles - Dashboard</title>
        <meta
          name="description"
          content="Avis Étoiles - Obtenez des avis et des évaluations sur les produits et services. Trouvez les meilleures recommandations et prenez des décisions éclairées."
        />
      </head>
      <body className=" background-body">
        <Sidebar>{children}</Sidebar>

        <Toaster />
      </body>
    </html>
  );
}

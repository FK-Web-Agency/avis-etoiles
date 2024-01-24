import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import '../../styles/globals.css';
import { Sidebar } from '@/components/shared';
import { Toaster } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Avis Étoiles - Dashboard',
  description:
    'Avis Étoiles - Obtenez des avis et des évaluations sur les produits et services. Trouvez les meilleures recommandations et prenez des décisions éclairées.',
};

export default function layout({ children }: PropsWithChildren) {
  return (
    <html lang="fr" className="min-h-screen">
      <body className=" background-body">
        <Sidebar>{children}</Sidebar>

        <Toaster />
      </body>
    </html>
  );
}
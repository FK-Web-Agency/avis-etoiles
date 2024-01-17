import type { Metadata } from 'next';
import '../styles/globals.css';
import { CookieConsent, Footer, Header } from '@/components/shared';
import { Toaster } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Avis Étoiles',
  description:
    'Avis Étoiles - Obtenez des avis et des évaluations sur les produits et services. Trouvez les meilleures recommandations et prenez des décisions éclairées.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={` dark`}>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <Toaster />
      </body>
    </html>
  );
}

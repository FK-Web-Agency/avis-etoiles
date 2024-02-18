import type { Metadata } from 'next';
import { CookieConsent, Footer, Header, RefineProvider } from '@/components/shared';
import { Toaster } from '@/components/ui';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Avis Étoiles',
  description:
    'Avis Étoiles - Obtenez des avis et des évaluations sur les produits et services. Trouvez les meilleures recommandations et prenez des décisions éclairées.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎁</text></svg>"
        />
      </head>
      <body className={` dark`}>
        <RefineProvider>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
          <Toaster />
        </RefineProvider>
      </body>
    </html>
  );
}

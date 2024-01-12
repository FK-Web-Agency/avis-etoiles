import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/shared';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Avis Étoiles',
  description:
    'Avis Étoiles - Obtenez des avis et des évaluations sur les produits et services. Trouvez les meilleures recommandations et prenez des décisions éclairées.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` dark`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

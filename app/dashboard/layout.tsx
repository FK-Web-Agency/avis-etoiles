import { RefineProvider } from '@/components/shared';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <RefineProvider>{children}</RefineProvider>
      </body>
    </html>
  );
}

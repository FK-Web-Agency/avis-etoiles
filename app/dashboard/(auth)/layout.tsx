import { PropsWithChildren } from "react";
import { Metadata } from "next";
import '../../styles/globals.css'


export const metadata: Metadata = {
  title: 'Avis Étoiles - Connexion',
  description:
    'Avis Étoiles - Obtenez des avis et des évaluations sur les produits et services. Trouvez les meilleures recommandations et prenez des décisions éclairées.',
};



export default function layout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
        <body className="flex-center min-h-screen w-full background-body">
            {children}
        </body>
    </html>
  )
}

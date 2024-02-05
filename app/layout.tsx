import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import { PropsWithChildren } from 'react';
import './styles/globals.css';


export default function layout({ children }: PropsWithChildren) {
  return <html lang="fr">
  <head>
  </head>
  <body className={` dark`}>

    <head>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎁</text></svg>"/>
    </head>
  <ClerkProvider localization={frFR}>{children}</ClerkProvider>;

  </body>
</html>
  
  
  
}

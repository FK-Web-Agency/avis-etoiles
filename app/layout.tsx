import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import { PropsWithChildren } from 'react';
import './styles/globals.css';


export default function layout({ children }: PropsWithChildren) {
  return <ClerkProvider localization={frFR}>{children}</ClerkProvider>;
}

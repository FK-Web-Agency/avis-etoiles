import { Icons } from '@/components/shared';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex-center min-h-screen w-full background-body gap-4 flex-col">
      <Icons.Logo />

      <h4>
        Cette page est réservé aux membres uniquement, si vous n'êtes pas encore
        membre vous pouvez nous rejoindre des maintenant en cliquant sur ce{' '}
        <Link href="/prix">lien</Link>
      </h4>
      <SignIn
        appearance={{
          variables: {
            colorPrimary: 'hsl(47.9, 95.8% ,53.1%)',
          },
          elements: {
            footer: 'hidden',
          },
        }}
        afterSignInUrl={'/dashboard'}
      />
    </div>
  );
}

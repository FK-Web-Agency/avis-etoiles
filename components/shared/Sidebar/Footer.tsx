'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';
import Icons from '../Icons';
import { useClerk } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Footer() {
  const { signOut } = useClerk();

  return (
    <div className="flex flex-col gap-4">
      <Link className="text-white " href="/">
        <div className="flex items-center gap-2">
          <Icons.HomeColor className="h-6 w-6 shrink-0" />
          Retour sur le site
        </div>
      </Link>
      <Button
        variant={'ghost'}
        className="items-start justify-start p-0"
        onClick={() => signOut(() => redirect('/sign-in'))}>
        <div className="flex gap-2 text-white cursor-pointer">
          <Icons.Logout className="h-6 w-6 shrink-0" aria-hidden="true" />
          Se déconnecter
        </div>
      </Button>

      <p className="text-gray-400 text-sm">
        © Avis Étoiles {new Date().getFullYear()} - Développé par{' '}
        <Link href="https://www.tuumagency.com/">Tuum Agency</Link>
      </p>
    </div>
  );
}

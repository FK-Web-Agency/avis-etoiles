'use client';

import { PropsWithChildren } from 'react';
import { SignOutButton, SignedIn, UserButton, useClerk } from '@clerk/nextjs';

import Icons from '../Icons';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import TeamsNav from './TeamsNav';
import { useDashboardStore } from '@/store';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui';

export default function Sidebar({ children }: PropsWithChildren) {
  const { role } = useDashboardStore();
  const { signOut } = useClerk();
  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col justify-between">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow  flex-col gap-y-5 overflow-y-auto border-r border-gray-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Icons.Logo hrefNull />
            </div>
            <nav className="flex  flex-1 flex-col">
              <ul role="list" className="flex flex-1 justify-between flex-col gap-y-7">
                <li>
                  <NavItems />
                </li>
                {role === 'admin' ? (
                  <li>
                    <TeamsNav />
                  </li>
                ) : undefined}
                <div className="flex flex-col gap-4">
                  <Link className="text-white " href="/">
                    <div className="flex items-center gap-2">
                      <Icons.HomeColor className="h-6 w-6 shrink-0" />
                      Retour sur le site
                    </div>
                  </Link>
                  <Button
                    variant={'ghost'}
                    className='items-start justify-start p-0'
                    onClick={() => signOut(() => redirect('/sign-in'))}>
                    <div className="flex gap-2 text-white cursor-pointer">
                      <Icons.Logout
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      Se déconnecter
                    </div>
                  </Button>
                </div>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-60">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-600 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <MobileNav />
            <div className="-m-2.5 p-2.5 text-gray-700 lg:hidden"></div>

            <div className="flex justify-end flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex  items-center gap-x-4 lg:gap-x-6">
                {/* Profile dropdown */}
                <SignedIn>
                  <UserButton afterSignOutUrl="/sign-in" />
                </SignedIn>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

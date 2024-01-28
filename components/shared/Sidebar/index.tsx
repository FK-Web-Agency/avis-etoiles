import { PropsWithChildren } from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';

import Icons from '../Icons';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import TeamsNav from './TeamsNav';
import { useMemberDashboardStore } from '@/store';

export default function Sidebar({ children }: PropsWithChildren) {
  const { role } = useMemberDashboardStore();

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Icons.Logo hrefNull />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <NavItems />
                </li>
                {role === 'admin' && (
                  <li>
                    <TeamsNav />
                  </li>
                )}
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                    <Icons.Logout className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Se déconnecter
                  </a>
                </li>
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
                  <UserButton afterSignOutUrl="/dashboard" />
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

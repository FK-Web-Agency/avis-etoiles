'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { classNames } from '@/helper';
import Icons from '../Icons';
import { usePathname } from 'next/navigation';
import { Button, SheetClose } from '@/components/ui';

const navigation = {
  admin: [
    { name: 'Dashboard', href: '/dashboard/admin/overview', icon: Icons.Dashboard },
    { name: 'Membres', href: '/dashboard/admin/members/list', icon: Icons.Member },
   /*  { name: 'Équipe', href: '/dashboard/admin/teams/list', icon: Icons.Teams }, */
    { name: 'Jeu', href: '/dashboard/admin/game', icon: Icons.Game },
    /*  { name: 'Reports', href: '/dashboard/admin/report', icon: Icons.Reports, current: false }, */
  ],
  member: [
    { name: 'Dashboard', href: '/dashboard/member/overview', icon: Icons.Dashboard, current: false },
    { name: 'Jeu', href: '/dashboard/member/game', icon: Icons.Game, current: false },
    { name: 'Reports', href: '/dashboard/member/reports', icon: Icons.Reports, current: false },
  ],
};

export default function NavItems({ isMobile = false }: { isMobile?: boolean }) {
  const [role, setRole] = useState('member');
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(({ role }) => {
        setRole(role);
      });
  }, []);

  return (
    <ul className="-mx-2 space-y-1">
      {navigation[role as keyof typeof navigation].map((item) => {
        const isActive = pathname === item.href;

        if (!isMobile) {
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={classNames(
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}>
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.name}>
            <SheetClose asChild>
              <Link
                href={item.href}
                className={classNames(
                  isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                )}>
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            </SheetClose>
          </li>
        );
      })}
    </ul>
  );
}

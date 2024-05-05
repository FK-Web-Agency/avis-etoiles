'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { classNames } from '@/helper';
import Icons from '../Icons';
import { usePathname } from 'next/navigation';
import { SheetClose } from '@/components/ui';

const navigation = {
  admin: [
    { name: 'Dashboard', href: '/dashboard/admin/overview', icon: Icons.Dashboard },
    { name: 'Abonnés', href: '/dashboard/admin/members/list', icon: Icons.Member },
    { name: 'Ventes', href: '/dashboard/admin/orders', icon: Icons.Invoice },
    { name: 'Collaborateurs', href: '/dashboard/admin/collaborators/list', icon: Icons.Teams },
    { name: 'Paramétre de jeu', href: '/dashboard/admin/game', icon: Icons.Game },
    { name: 'Création de chevalet', href: '/dashboard/admin/easel', icon: Icons.Easel },
    { name: 'Création de Jeu Test', href: '/dashboard/admin/sandbox', icon: Icons.Test },
    { name: 'Avis Étoiles', href: '/dashboard/admin/features', icon: Icons.Test },
    /*  { name: 'Reports', href: '/dashboard/admin/report', icon: Icons.Reports, current: false }, */
  ],
  member: [
    { name: 'Dashboard', href: '/dashboard/member/overview', icon: Icons.Dashboard },
    { name: 'Jeu', href: '/dashboard/member/game', icon: Icons.Game },
    { name: 'Reports', href: '/dashboard/member/reports', icon: Icons.Reports },
    { name: 'Mon Abonnement', href: '/dashboard/member/subscription', icon: Icons.Document },
  ],
};

export default function NavItems({ isMobile = false }: { isMobile?: boolean }) {
  const [role, setRole] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then(({ role }) => {
        setRole(role);
      });
  }, []);

  if (!role) return <Icons.Spinner className="w-8 h-8 animate-spin" />;

  if (role === 'commercial') {
    navigation.admin = navigation.admin.filter((item) => item.name !== 'Collaborateurs');
  }

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

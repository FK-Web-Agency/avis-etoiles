'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { classNames } from '@/helper';
import Icons from '../Icons';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/overview', icon: Icons.Dashboard, current: false },
  { name: 'Membres', href: '/dashboard/members/list', icon: Icons.Member, current: false },
  { name: 'Équipe', href: '/dashboard/teams/list', icon: Icons.Teams, current: false },
  { name: 'Jeu', href: '/dashboard/game', icon: Icons.Game, current: false },
 /*  { name: 'Reports', href: '/dashboard/report', icon: Icons.Reports, current: false }, */
];

export default function NavItems() {
  const [navigationList, setNavigationList] = useState(navigation);
  const pathname = usePathname();

  useEffect(() => {
    const newNavigationList = navigationList.map((item) => {
      if (pathname.includes(item.href)) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    setNavigationList(newNavigationList);
  }, []);

  const handleClick = function (event: React.MouseEvent<HTMLElement>) {
    const target = event.target as HTMLElement;
    const name = target.innerText;

    const newNavigationList = navigationList.map((item) => {
      if (item.name === name) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    setNavigationList(newNavigationList);
  };

  return (
    <ul role="list" className="-mx-2 space-y-1">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            onClick={handleClick}
            href={item.href}
            className={classNames(
              item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            )}>
            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

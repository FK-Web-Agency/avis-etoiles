'use client';

import { useState } from 'react';
import Link from 'next/link';

import { classNames } from '@/helper';
import Icons from '../Icons';

const navigation = [
  { name: 'Dashboard', href: '#', icon: Icons.Dashboard, current: true },
  { name: 'Jeu', href: '#', icon: Icons.Game, current: false },
  { name: 'Équipe', href: '#', icon: Icons.Teams, current: false },
  { name: 'Membres', href: '#', icon: Icons.Member, current: false },
  { name: 'Reports', href: '#', icon: Icons.Reports, current: false },
];

export default function NavItems() {
  const [navigationList, setNavigationList] = useState(navigation);

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

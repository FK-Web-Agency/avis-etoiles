'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { label: 'Accueil', route: '/' },
  { label: 'Comment ça marche ?', route: '/features' },
  { label: 'Tarifs', route: '/prices' },
  { label: 'A propos', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {navigation.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && 'text-primary'
            } flex-center p-medium-16 whitespace-nowrap `}>
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}


export default  NavItems;
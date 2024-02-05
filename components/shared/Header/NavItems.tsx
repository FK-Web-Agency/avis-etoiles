'use client';

import { SheetClose } from '@/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { label: 'Accueil', route: '/' },
  { label: 'Comment ça marche ?', route: '/features' },
  { label: 'Tarifs', route: '/prices' },
  { label: 'A propos', route: '/about' },
  { label: 'Contact', route: '/contact' },
];

const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => {
  const pathname = usePathname();

  return (
    <ul className="lg:flex-between flex w-full flex-col items-start gap-5 lg:flex-row">
      {navigation.map((link) => {
        const isActive = pathname === link.route;

        if (!isMobile)
          return (
            <li key={link.route} className={`${isActive && 'text-primary'} flex-center p-medium-16 whitespace-nowrap `}>
              <Link href={link.route}>{link.label}</Link>
            </li>
          );

        return (
          <SheetClose asChild>
            <li key={link.route} className={`${isActive && 'text-primary'} flex-center p-medium-16 whitespace-nowrap `}>
              <Link href={link.route}>{link.label}</Link>
            </li>
          </SheetClose>
        );
      })}
    </ul>
  );
};

export default NavItems;

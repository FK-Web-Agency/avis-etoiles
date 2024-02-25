'use client';

import { SheetClose } from '@/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { label: 'Accueil', route: '/' },
 // { label: 'Comment ça marche ?', route: '/features' },
 { label: 'A propos', route: '/a-propos' },
  { label: 'Tarifs', route: '/prix' },
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
          <li key={link.route} className={`${isActive && 'text-primary'} flex-center p-medium-16 whitespace-nowrap `}>
            <SheetClose asChild>
              <Link href={link.route}>{link.label}</Link>
            </SheetClose>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;

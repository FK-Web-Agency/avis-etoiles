import Link from 'next/link';

import Icons from '../Icons';
import NavItems from './NavItems';
import MobileNav from './MobileNav';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header>
      {/* -------------------- Desktop, laptop, and tablet view -------------------- */}
      <nav className="wrapper flex items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <Icons.Logo />
        </div>
        <div className="flex lg:hidden">
          <MobileNav />
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavItems />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild variant={'gradient'}>
            <Link href="/dashboard" className="text-sm font-semibold leading-6 text-primary">
              Espace Membre{' '}
              <span className="ml-2" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </Button>
        </div>
      </nav>
      {/* ----------- Mobile menu, show/hide based on mobile menu state. ----------- */}
    </header>
  );
}

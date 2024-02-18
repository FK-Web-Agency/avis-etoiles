import { Sheet, SheetContent, Separator, SheetTrigger } from '@/components/ui';
import NavItems from './NavItems';
import Icons from '../Icons';
import Link from 'next/link';

const MobileNav = () => {
  return (
    <nav className="lg:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Icons.Menu className="cursor-pointer w-6 h-6" />
        </SheetTrigger>
        <SheetContent className="flex flex-col justify-between gap-6 bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60 border-l border-gray-100  lg:hidden">
          <div className="flex flex-col gap-5">
            <Icons.Logo hrefNull />
            <Separator className="border border-gray-50" />
            <NavItems isMobile />
          </div>

          <Link href="/sign-in" className="text-sm font-semibold leading-6 text-slate-50 bottom-5">
            Se connecter <span aria-hidden="true">&rarr;</span>
          </Link>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

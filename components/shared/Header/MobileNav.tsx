import { Sheet, SheetContent, Separator, SheetTrigger } from '@/components/ui';
import NavItems from './NavItems';
import Icons from '../Icons';
import Link from 'next/link';

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Icons.BurgerMenu className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Icons.Logo hrefNull color="text-slate-900" />
          <Separator className="border border-gray-50" />
          <NavItems />

          <Separator className="border border-gray-50" />
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-slate-50">
            Demander une demo <span aria-hidden="true">&rarr;</span>
          </Link>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

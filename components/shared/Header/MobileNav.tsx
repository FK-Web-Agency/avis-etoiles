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
        <SheetContent className="flex flex-col justify-between gap-6 bg-gray-800  md:hidden">
          <div className='flex flex-col gap-5'>
            <Icons.Logo hrefNull  />
            <Separator className="border border-gray-50" />
            <NavItems />
          </div>

          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-slate-50 bottom-5">
            Demander une demo <span aria-hidden="true">&rarr;</span>
          </Link>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

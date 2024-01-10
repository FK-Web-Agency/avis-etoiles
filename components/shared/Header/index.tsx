import Icons from '../Icons';
import NavItems from './NavItems';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header >
      {/* -------------------- Desktop, laptop, and tablet view -------------------- */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global">
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
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Demander une demo <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      {/* ----------- Mobile menu, show/hide based on mobile menu state. ----------- */}
    </header>
  );
}

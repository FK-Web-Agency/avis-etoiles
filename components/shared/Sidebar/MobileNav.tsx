import { Sheet, SheetContent, Separator, SheetTrigger, Button } from '@/components/ui';
import Icons from '../Icons';
import NavItems from './NavItems';
import TeamsNav from './TeamsNav';
import { useDashboardStore } from '@/store';

export default function MobileNav() {
  const { role } = useDashboardStore();

 
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icons.Menu className="w-6 h-6 text-white lg:hidden" />
      </SheetTrigger>
      <SheetContent className="background-body flex flex-col justify-between" side="left">
        <div className="flex grow flex-col gap-y-5">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-xl font-bold text-white">Avis Étoile 🎁</h2>
          </div>

          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <NavItems isMobile />

            {role === 'admin' && <TeamsNav />}

            <li className="mt-auto">
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                <Icons.Logout className="h-6 w-6 shrink-0" aria-hidden="true" />
                Se déconnecter
              </a>
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import {
  Sheet,
  SheetContent,
  Separator,
  SheetTrigger,
  Button,
} from '@/components/ui';
import Icons from '../Icons';
import NavItems from './NavItems';
import TeamsNav from './TeamsNav';
import { useDashboardStore } from '@/store';
import Footer from './Footer';

export default function MobileNav() {
  const { role } = useDashboardStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icons.Menu className="w-6 h-6 text-white lg:hidden" />
      </SheetTrigger>
      <SheetContent
        className="background-body flex flex-col justify-between"
        side="left">
        <div className="flex grow flex-col gap-y-5">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-xl font-bold text-white">Avis Étoile 🎁</h2>
          </div>

          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <NavItems isMobile />

            {role === 'admin' && <TeamsNav />}

            <Footer />
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

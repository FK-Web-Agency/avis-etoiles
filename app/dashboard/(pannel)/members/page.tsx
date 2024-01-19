import { Icons } from '@/components/shared';
import { Button } from '@/components/ui';


export default function Members() {
  return (
    <>
      <section className='flex justify-between items-center'>
        <h1 className="h4-medium text-white">Tous les Membres</h1>

        <Button variant={'gradient'} className='flex-center gap-2 rounded'>
          <Icons.AddMember className="w-4 h-4 text-slate-50" />
          <span className="p-regular-14 text-slate-50">Ajouter un membre</span>
        </Button>
      </section>
    </>
  );
}

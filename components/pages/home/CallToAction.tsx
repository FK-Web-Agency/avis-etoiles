import { Button } from '@/components/ui';
import { urlForImage } from '@/sanity/lib';

import { CallToActionProps } from '@/Type';
import Image from 'next/image';

type CallToActionType = {
  call_to_action_section: CallToActionProps;
};

export default function CallToAction({ call_to_action_section }: CallToActionType) {
  console.log(call_to_action_section);

  return (
    <section className="yellow-section py-16">
      <div className="gap-8 items-center xl:gap-16 md:grid md:grid-cols-2 wrapper">
        {/* ---------------------------------- Image --------------------------------- */}
        <div className="animate-jump-in animate-once animate-duration-1000">
          <Image
            className="w-full block"
            src={urlForImage(call_to_action_section?.image)}
            alt="dashboard image"
            width={500}
            height={500}
          />
        </div>

        {/* ------------------------------ Text Content ------------------------------ */}
        <div className="flex-center flex-align-start flex-col  gap-5 mt-8 md:mt-0 h-full animate-fade-left animate-once animate-duration-2000">
          <h2 className="h2-bold">{call_to_action_section?.title} </h2>
          <p>{call_to_action_section?.subtitle}</p>

          <Button variant={'secondary'}>Voir une demo</Button>
        </div>
      </div>
    </section>
  );
}

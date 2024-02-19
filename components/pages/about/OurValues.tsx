import Image from 'next/image';
import { PortableText } from '@portabletext/react';

import { ValuesSectionProps } from '@/interfaces/sanity';
import { urlForImage } from '@/sanity/lib';

type ValuesSectionType = {
  values_section: ValuesSectionProps;
};

export default function OurValues({ values_section }: ValuesSectionType) {
  return (
    <section className="wrapper">
      <div className="gap-16 items-center lg:grid lg:grid-cols-2 wrapper">
        <div className="grid grid-cols-2 gap-4 mt-8">
          {values_section?.images.map((image: any, index: any) => (
            <Image
              key={index}
              className={`w-full rounded-lg ${index === 0 && 'mt-10'}`}
              width={400}
              height={400}
              src={urlForImage(image)}
              alt="office content 1"
            />
          ))}
        </div>
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="h2-bold text-white mb-5">{values_section?.title} </h2>
          <div>
            <PortableText value={values_section?.subtitle || ''} />
          </div>
        </div>
      </div>
    </section>
  );
}

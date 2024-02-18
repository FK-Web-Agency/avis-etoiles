import { StorySectionProps } from '@/interfaces/sanity';
import { urlForImage } from '@/sanity/lib';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react';

type OurStoryProps = {
  story_section: StorySectionProps;
};

export default function OurStory({ story_section }: OurStoryProps) {
  return (
    <section className='wrapper'>
      <div>
        <h2 className="h2-bold">{story_section.title}</h2>
        <div className="mt-6 flex flex-col  gap-x-8 gap-y-20 lg:flex-row w-full lg:justify-between">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <div className="text">
              {story_section?.subtitle.map((item: any, index: number) => (
                <PortableText value={item} key={index} />
              ))}
            </div>
          </div>
          {/* <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {story_section.stats.map((stat: any) => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text">{stat.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-white">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div> */}
        </div>


        <div className="wrapper mb-8">
          <Image
            src={urlForImage(story_section.image)}
            width={400}
            height={400}
            alt="image banniere"
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

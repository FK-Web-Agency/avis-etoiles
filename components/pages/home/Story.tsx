import { StoryProps } from '@/interfaces/sanity';
import { urlForImage } from '@/sanity/lib';
import Image from 'next/image';

type StoryType = {
  story_section: StoryProps;
};

export default function Story({ story_section }: StoryType) {
  return (
    <section>
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="flex flex-col gap-4">
          <h2 className="h2-bold">{story_section?.title} </h2>
          <p className="p-regular-16">{story_section?.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {story_section.images?.map((image: any, index: number) => (
            <Image
              key={index}
              className="max-h-[30rem] w-full rounded-lg object-cover"
              src={urlForImage(image)}
              alt="office content 1"
              width={500}
              height={500}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

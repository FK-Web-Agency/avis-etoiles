import { TextGradient } from '@/components/ui';
import { generateMetadataWithSanity } from '@/helper';
import { client, queries } from '@/sanity/lib';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_FEATURES_PAGE');
}

export default async function Features() {
  const { introduction_section, how_it_works_section } = await client.fetch(
    queries.GET_FEATURES_PAGE
  );

  return (
    <main className="wrapper flex flex-col gap-12">
      {/* ------------------------------ Introduction ------------------------------ */}
      <section>
        <TextGradient component="h1" className="h1-bold" segments={introduction_section?.title} />
        <p className="mt-8">{introduction_section?.subtitle}</p>
      </section>

      {/* ------------------------------ Features ------------------------------ */}
      <section>
        <div className="pl-8 px-4 mx-auto max-w-screen-xl">
          <ol className="relative border-l border-gray-200">
            {how_it_works_section?.map(({ title, description }, index:number) => (
              <li className="mb-10 ml-6 relative" key={index}>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-500">
                  Etape {index + 1}
                </time>

                <span className="absolute -left-[2.8rem] -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient ">
                  {/* ICON */}
                </span>
                <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
                <div className="text">
                  {description?.map((item: any, index: number) => (
                    <PortableText key={index} value={item} />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

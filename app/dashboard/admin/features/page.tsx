import { Metadata } from 'next';

import { Button, TextGradient } from '@/components/ui';
import { ItemFeature } from '@/components/pages/features';
import { generateMetadataWithSanity } from '@/helper';
import {  queries } from '@/sanity/lib';
import { HowItWorksProps } from '@/interfaces/sanity';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/client';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_FEATURES_PAGE');
}

export default async function Features() {
  const { introduction_section, how_it_works_section, cta } = await sanityFetch<any>({
    query: queries.GET_FEATURES_PAGE,
    tags: ['page'],
  });

  return (
    <main className="wrapper main">
      {/* ------------------------------ Introduction ------------------------------ */}
      <section>
        <TextGradient component="h1" className="h1-bold text-white!" segments={introduction_section?.title} />
        <p className="mt-8">{introduction_section?.subtitle}</p>
      </section>

      {/* ------------------------------ Features ------------------------------ */}
      <section>
        <div className="pl-8 px-4 mx-auto max-w-screen-xl">
          <ol className="relative border-l border-gray-200">
            {how_it_works_section?.map(({ title, description, icon }: HowItWorksProps, index: number) => (
              <ItemFeature key={index} {...{ title, description, icon, index }} />
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------ */}
      <section className="flex flex-col gap-5">
        <h2 className="h2-bold">{cta?.title}</h2>
        <p>{cta?.subtitle} </p>

        <div className="flex-center flex-justify-start gap-5">
          <Button variant={'outline'} asChild>
            <Link href="/contact">Voir une demo</Link>
          </Button>

          <Button asChild>
            <Link href="/prix">S'abonner maintenant</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

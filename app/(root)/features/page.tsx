import { Metadata } from 'next';

import { TextGradient } from '@/components/ui';
import { ItemFeature } from '@/components/pages/features';
import { generateMetadataWithSanity } from '@/helper';
import { client, queries } from '@/sanity/lib';
import { HowItWorksProps } from '@/Type';

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
            {how_it_works_section?.map(({ title, description, icon }: HowItWorksProps, index: number) => (
              <ItemFeature key={index} {...{title, description, icon, index}} />
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------ CTA ------------------------------ */}
      <section>
        <h2 className="h2-bold"></h2>
        <p></p>

        
      </section>
    </main>
  );
}

import { Metadata } from 'next';

import { generateMetadataWithSanity } from '@/helper';
import { Banner } from '@/components/pages/about';
import { client, queries } from '@/sanity/lib';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_FEATURES_PAGE');
}

export default async function About() {
  const {banner} = await client.fetch(queries.GET_ABOUT_PAGE);

  return (
    <main className='wrapper'>
      <Banner {...{banner}} />
    </main>
  );
}

import { Metadata } from 'next';
import { SanityDocument } from 'next-sanity';
import { client, queries } from '@/sanity/lib';
import { generateMetadataWithSanity } from '@/helper';
import { Advantages, Banner, CallToAction } from '@/components/pages/home';

// Generate title and description from Sanity
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity();
}

export default async function Home() {
  const { banner, advantages_section, call_to_action_section } = await client.fetch<SanityDocument>(
    queries.GET_HOME_PAGE
  );

  return (
    <main>
      <Banner {...{ banner }} />
      <Advantages {...{ advantages_section }} />
      <CallToAction {...{ call_to_action_section }} />
    </main>
  );
}

import { Metadata } from 'next';
import { SanityDocument } from 'next-sanity';
import { client, queries } from '@/sanity/lib';
import { generateMetadataWithSanity } from '@/helper';
import { Advantages, Banner, CallToAction, Features, Story } from '@/components/pages/home';
import { sanityFetch } from '@/sanity/lib/client';

// Generate title and description from Sanity
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_HOME_PAGE');
}

export default async function Home() {
  const { banner, features_section, advantages_section, call_to_action_section, story_section } =
    await sanityFetch<SanityDocument>({ query: queries.GET_HOME_PAGE, tags: ['page'] });

  return (
    <main>
      <Banner {...{ banner }} />
      <Features {...{ features_section }} />
      <Advantages {...{ advantages_section }} />
      <CallToAction {...{ call_to_action_section }} />
      <Story {...{ story_section }} />
    </main>
  );
}

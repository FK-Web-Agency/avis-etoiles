import { Metadata } from 'next';

import { generateMetadataWithSanity } from '@/helper';
import { Banner, OurMission, OurStory, OurValues } from '@/components/pages/about';
import { client, queries } from '@/sanity/lib';
import { sanityFetch } from '@/sanity/lib/client';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_FEATURES_PAGE');
}

export default async function About() {
  const { banner, story_section, mission_section, values_section } = await sanityFetch<any>({
    query: queries.GET_ABOUT_PAGE,
    tags: [queries.TAG_ABOUT],
  });

  return (
    <main>
      <Banner {...{ banner }} />
      <OurStory {...{ story_section }} />
      <OurMission {...{ mission_section }} />
      <OurValues {...{ values_section }} />
    </main>
  );
}

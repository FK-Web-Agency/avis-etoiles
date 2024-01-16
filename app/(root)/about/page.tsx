import { Metadata } from 'next';

import { generateMetadataWithSanity } from '@/helper';
import { Banner, OurMission, OurStory, OurValues } from '@/components/pages/about';
import { client, queries } from '@/sanity/lib';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_FEATURES_PAGE');
}

export default async function About() {
  const {banner, story_section, mission_section, values_section} = await client.fetch(queries.GET_ABOUT_PAGE);

  return (
    <main >
      <Banner {...{banner}} />
      <OurStory {...{story_section}} />
      <OurMission {...{mission_section}} />
      <OurValues {...{values_section}} />
    </main>
  );
}

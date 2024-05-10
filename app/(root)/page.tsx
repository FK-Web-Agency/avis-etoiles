import { Metadata } from 'next';
import { SanityDocument } from 'next-sanity';
import { queries } from '@/sanity/lib';
import { generateMetadataWithSanity } from '@/helper';
import {
  Advantages,
  Banner,
  CallToAction,
  Features,
  Story,
} from '@/components/pages/home';
import client, { sanityFetch } from '@/sanity/lib/client';

// Generate title and description from Sanity
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_HOME_PAGE');
}

export default async function Home() {
  const {
    banner,
    features_section,
    advantages_section,
    call_to_action_section,
    story_section,
  } = await sanityFetch<SanityDocument>({
    query: queries.GET_HOME_PAGE,
    tags: ['page'],
  });

/*   const deleteALlFromSanity = async () => {
    console.log('deleting');

    const all = await client.fetch(
      `*[_type == "${process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!}"]`
    );

    all.forEach(async (doc) => {
      await client
        .delete({ query: `*[_id == "${doc._id}"]` })
        .then(() => console.log('data deteled from sanity'))
        .catch((err) => {
          console.error('Delete failed: ', err.message);
        });
    });
  };

  deleteALlFromSanity(); */
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

import { Metadata } from 'next';
import { SanityDocument } from 'next-sanity';
import { client, queries } from '@/sanity/lib';
import { generateMetadataWithSanity } from '@/helper';

// Generate title and description from Sanity
export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity();
}

export default async function Home() {
  const { banner } = await client.fetch<SanityDocument>(queries.GET_HOME_PAGE);

  return <div>{banner.title}</div>;
}

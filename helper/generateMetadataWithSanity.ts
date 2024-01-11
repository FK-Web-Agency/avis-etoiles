import { Metadata } from 'next';
import { SanityDocument } from 'next-sanity';

import { client, queries } from '@/sanity/lib';

export default async function generateMetadataWithSanity(): Promise<Metadata> {
  const { seo } = await client.fetch<SanityDocument>(queries.GET_HOME_PAGE);

  return {
    title: seo?.meta_title,
    description: seo?.meta_description,
  };
}

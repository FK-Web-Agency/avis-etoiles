import { Metadata } from 'next';
import { SanityDocument } from 'next-sanity';

import { client, queries } from '@/sanity/lib';

export default async function generateMetadataWithSanity(page: string): Promise<Metadata> {
  const { seo } = await client.fetch<SanityDocument>(queries[page as keyof typeof queries]);

  return {
    title: seo?.meta_title,
    description: seo?.meta_description,
  };
}

import { client, queries } from '@/sanity/lib';
import { SanityDocument } from 'next-sanity';
import React from 'react';

export default async function Home() {
  const { banner } = await client.fetch<SanityDocument>(queries.GET_HOME_PAGE);

  return <div>{banner.title}</div>;
}

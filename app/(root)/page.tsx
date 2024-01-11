import { getHomePageData } from '@/sanity/lib/queries';
import React from 'react';

export default async function Home() {
  const { title } = await getHomePageData();

  return <div>{title}</div>;
}

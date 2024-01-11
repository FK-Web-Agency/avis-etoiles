import { groq } from 'next-sanity';
import { client } from './client';

// Function for getting data from Sanity
async function sanityQuery(query: string) {
  const result = await client.fetch(query);
  return result;
}

// Get home page data
export async function getHomePageData() {
  // Query for home page data
  const query = groq`*[_type == "home"][0]`;

  const data = await sanityQuery(query);
  return data;
}

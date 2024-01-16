import { Metadata } from 'next';

import { generateMetadataWithSanity } from '@/helper';


export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_FEATURES_PAGE');
}


export default function About() {
  return (
    <main>
      
    </main>
  )
}

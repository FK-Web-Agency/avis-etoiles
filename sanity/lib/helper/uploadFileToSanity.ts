import { client } from '@/sanity/lib';

export default async function uploadFileToSanity(file: File) {
  try {
    const document = await client.assets.upload('image', file);
    return { _type: 'image', asset: { _ref: document._id } };
  } catch (error: any) {
    console.error('Upload failed:', error.message);
  }
}

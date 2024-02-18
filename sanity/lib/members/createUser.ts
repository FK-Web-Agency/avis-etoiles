import { client } from '@/sanity/lib';

export default async function createUser(user: any) {
  const doc = {
    _id: `subscriber-${user.email}`,
    _type: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    ...user,
  };
  try {
    const user = await client.createIfNotExists(doc);
    return user;
  } catch (error) {
    return error
  }
}

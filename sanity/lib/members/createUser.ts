import { client } from '@/sanity/lib';

export default async function createUser(user: any) {
  const doc = {
    _type: 'users',
    ...user,
  };
  try {
    const user = await client.create(doc);
    return user;
  } catch (error) {
    return error
  }
}

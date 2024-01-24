import { client } from '@/sanity/lib';

export default async function deleteUser({ id }: { id: string }) {
  try {
    await client.delete({query: '*[_type == "users" && clerkId == $clerkId][0]', params: {clerkId: id}}).then((res) => console.log(`${id} is deleted`, res));
  } catch (error) {
    console.log(error);
    return error;
  }
}

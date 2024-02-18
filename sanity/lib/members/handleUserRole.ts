import client from '../client';

interface UpdateUserProps {
  clerkId: string;
  role: string;
}

export default async function handleUserRole({ clerkId, role }: UpdateUserProps) {
  try {
    await client
      .patch({ query: '*[_type == "users" && clerkId == $clerkId][0]', params: { clerkId } })
      .set({ role })
      .commit()
      .then((res) => console.log('User role updated', res));
  } catch (error) {
    return error;
  }
}

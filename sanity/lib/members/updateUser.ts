import client from '../client';

interface UpdateUserProps {
  id: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default async function updateUser({ id, user }: UpdateUserProps) {
  try {
    await client
      .patch(id)
      .set({ ...user })
      .commit()
      .then((res) => console.log('res', res));
  } catch (error) {
    return error;
  }
}

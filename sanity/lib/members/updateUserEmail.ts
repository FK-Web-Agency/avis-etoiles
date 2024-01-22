import client from '../client';

interface UpdateUserProps {
  id: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export default async function updateUserEmail({ id, user }: UpdateUserProps) {
  try {
    await client
      .patch(id)
      .set({ ...user })
      .commit()
      .then((res) => console.log('res', res));
  } catch (error) {
    console.log(error);
    return error;
  }
}

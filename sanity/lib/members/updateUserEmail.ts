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
    const response = await client
      .patch(id)
      .set({ ...user })
      .commit();

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

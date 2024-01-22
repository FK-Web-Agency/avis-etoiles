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
  console.log(user);
  
  try {
    await client
      .patch(id)
      .set({ email: user.email, firstName: user.firstName, lastName: user.lastName})
      .commit()
      .then((res) => console.log('res', res));
  } catch (error) {
    console.log(error);
    return error;
  }
}

import client from './client';

export default function createUser(user: any) {
  const doc = {
    _type: 'users',
    ...user,
  };
  try {
    client.create(doc).then((res) => {
      console.log(`Bike was created, document ID is ${res._id}`);
      return res;
    });
  } catch (error) {
    console.log(error);
  }
}

'use server';

import { kv } from '@vercel/kv';

export const setWinner = async (winner: any) => await kv.set(`winner-${winner?.email}`, JSON.stringify(winner));

export const getWinner = async (email: string) => await kv.get(`winner-${email}`);

export const removeWinner = async (email: string) => {
  try {
    await kv.hdel(`winner-${email}`);
  } catch (error) {
    console.log(error);
  }
};

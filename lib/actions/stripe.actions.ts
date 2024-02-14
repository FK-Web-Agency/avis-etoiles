'use server';

import { kv } from '@vercel/kv';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface Payment {
  payment: {
    status: string;
    session_id: string;
    session_url: string;
  };
}

export const getAllSubscribers = async () => {
  const subscriptions = await stripe.subscriptions.list();

  return subscriptions.data;
};

export const getSession = async ({ subscriberId }: { subscriberId: string }) => {
  const db: Payment | null = await kv.get(`subscriber:texierremy@gilles.com`);


  const session = await stripe.checkout.sessions.retrieve(db?.payment?.session_id!);
  console.log('session', session);

  return session;
};

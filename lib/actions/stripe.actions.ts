'use server';

import { client } from '@/sanity/lib';
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
  const db: Payment | null = await kv.get(`subscriber:${subscriberId}`);
  if (!db?.payment?.session_id) {
    return null;
    throw new Error('No session found');
  }

  const session = await stripe.checkout.sessions.retrieve(db?.payment?.session_id!);


  return session;
};

export const cancelSubscription = async ({ clerkId }: { clerkId: string }) => {
  const subscriberSanity = await client.fetch(
    `*[_type == "${process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS}" && clerkId == $clerkId]{_id}[0]`,
    { clerkId }
  );

  const allSubscribers = await getAllSubscribers();

  const subscriber = allSubscribers.find((s) => JSON.parse(s.metadata.buyer)._ref === subscriberSanity?._id);

  const subscription = await stripe.subscriptions.cancel(subscriber?.id!);

  return { status: subscription.status === 'canceled' ? 'success' : 'error' };
};

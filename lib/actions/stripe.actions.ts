"use server"

import Stripe from 'stripe';

export const getAllSubscribers = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const subscriptions = await stripe.subscriptions.list();

  return subscriptions.data;
};

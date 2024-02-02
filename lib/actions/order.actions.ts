'use server';

import { client } from '@/sanity/lib';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export const checkoutOrder = async (order: any, withURL?: boolean) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: order.price * 100,
            product_data: {
              name: `Formule ${order.title}`,
            },
            recurring: {
              interval: 'month',
              interval_count: 3,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        plan: order.title,
        buyerId: 'order.buyerId',
      },
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    return withURL ? session.url : redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: any) => {
  // create a new order in sanity
  const newOrder = {
    ...order,
    _type: 'orders',
  };
  const result = client.create(newOrder);
  return result;
};

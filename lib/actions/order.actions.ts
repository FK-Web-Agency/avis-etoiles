'use server';

import { client } from '@/sanity/lib';
import Stripe from 'stripe';
import sendEmail from './resend.actions';
import { kv } from '@vercel/kv';
import { redirect } from 'next/navigation';

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'development'
    ? process.env.STRIPE_SECRET_KEY_TEST
    : process.env.STRIPE_SECRET;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!);
const baseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_LOCALHOST_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

export const checkoutOrder = async (order: any) => {
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: order.email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: order.price * 100,
            product_data: {
              name: `Formule ${order.title}`,
            },
            recurring: {
              interval: order?.frequency,
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        plan: order.title,
        buyer: order.buyer,
        seller: order.seller,
        subscription: order.subscription,
        frequency: order.frequency,
      },
      mode: 'subscription',
      success_url: `${baseUrl}/prix/success`,
      cancel_url: `${baseUrl}/prix?id=${order.sanityId}`,
      locale: 'fr',
      // Expiration date of the session (1 days)
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      /*  automatic_tax: {
        enabled: true,
      }, */
      tax_id_collection: {
        enabled: true,
      },
      subscription_data: {
        metadata: {
          plan: order.title,
          buyer: order.buyer,
          seller: order.seller,
        },
      },
    });

    return redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const updateSubscription = async (order: any) => {
  const subscriptions = await stripe.subscriptions.list({
    customer: order.customer_id,
  });

  console.log('subscriptions', subscriptions.data[0].items.data[0].plan);

  let frequency = order?.frequency === 'Month' ? 'month' : 'year';

  const price = await stripe.prices.create({
    currency: 'eur',
    unit_amount: order.price * 100,
    recurring: {
      interval: frequency as 'month' | 'year',
    },
    product_data: {
      name: frequency,
    },
  //  product: subscriptions.data[0].items.data[0].plan.product as string,
  });

  await stripe.subscriptions.update(subscriptions.data[0].id, {
    items: [
      {
        id: subscriptions.data[0].items.data[0].id,
        price: price.id,
      },
    ],
  });
};

export const checkoutSubscription = async (order: any) => {
  const startDate = new Date(JSON.parse(order.subscription).startDate);
  const now = new Date();

  const compareNowAndStartDate = startDate.getTime() <= now.getTime();
  const billingCycleAnchor = compareNowAndStartDate
    ? undefined
    : Math.floor(startDate.getTime() / 1000);

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: order.email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: order.price * 100,
            product_data: {
              name: `Formule ${order.title}`,
            },
            recurring: {
              interval: order?.frequency,
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        plan: order.title,
        buyer: order.buyer,
        seller: order.seller,
        subscription: order.subscription,
        frequency: order.frequency,
      },
      mode: 'subscription',
      success_url: `${baseUrl}/prix/success`,
      cancel_url: `${baseUrl}/prix/`,
      locale: 'fr',
      // Expiration date of the session (1 days)
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      /*  automatic_tax: {
        enabled: true,
      }, */
      tax_id_collection: {
        enabled: true,
      },
      subscription_data: {
        metadata: {
          plan: order.title,
          buyer: order?.buyer || undefined,
          seller: order.seller,
        },

        billing_cycle_anchor: billingCycleAnchor,
      },
      discounts: [
        {
          coupon: compareNowAndStartDate ? undefined : '7bsyeRqB',
        },
      ],
    });

    // Save the session in KV
    await kv.set(`subscriber:${order.id}`, {
      payment: {
        status: 'pending',
        session_id: session.id,
        session_url: session.url,
      },
    });

    await client
      .patch(JSON.parse(order.buyer)._ref)
      .set({ stripeSessionId: session.id })
      .commit();
    // Send email
    const { status } = await sendEmail({
      email: order.email,
      subject: 'Paiement de votre abonnement',
      emailTemplate: 'payment',
      url: session.url,
    });

    return status === 'success'
      ? {
          status: 'success',
          message: 'Abonné crée avec success, un email a été envoyé',
          data: session,
        }
      : {
          status: 'error',
          message:
            "Une erreur s'est produite, merci de réessayer ultérieurement",
        };
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: any) => {
  // create a new order in sanity
  const newOrder = {
    ...order,
    _type: 'avis-invoices',
  };
  const result = await client.create(newOrder);
  return result;
};

export const sendInvoice = async (invoiceId: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const invoice = await stripe.invoices.sendInvoice(invoiceId);
  return invoice;
};

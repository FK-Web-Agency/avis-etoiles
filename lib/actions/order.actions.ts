'use server';

import { client } from '@/sanity/lib';
import Stripe from 'stripe';
import sendEmail from './resend.actions';
import { kv } from '@vercel/kv';

export const checkoutOrder = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const baseUrl =
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCALHOST_URL : process.env.NEXT_PUBLIC_BASE_URL;

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
      success_url: `${baseUrl}/prices/success`,
      cancel_url: `${baseUrl}/prices/`,
      locale: 'fr',
      // Expiration date of the session (1 days)
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      automatic_tax: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
      },
      subscription_data: {
        metadata: {
          plan: order.title,
          buyer: order.buyer,
          seller: order.seller,
        },

        billing_cycle_anchor: new Date(JSON.parse(order.subscription).startDate).getTime() / 1000,
      },
      discounts: [
        {
          coupon: '7bsyeRqB',
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

    // Send email
    const { status } = await sendEmail({
      email: order.email,
      subject: 'Paiement de votre abonnement',
      emailTemplate: 'payment',
      url: session.url,
    });

    return status === 'success'
      ? { status: 'success', message: 'Abonné crée avec success, un email a été envoyé', data: session }
      : { status: 'error', message: "Une erreur s'est produite, merci de réessayer ultérieurement" };
  } catch (error) {
    throw error;
  }
};

export const checkoutSubscription = async (order: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const baseUrl =
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCALHOST_URL : process.env.NEXT_PUBLIC_BASE_URL;

  const startDate = new Date(JSON.parse(order.subscription).startDate);
  const now = new Date();

  const compareNowAndStartDate = startDate.getTime() <= now.getTime();
  const billingCycleAnchor = compareNowAndStartDate ? undefined : Math.floor(startDate.getTime() / 1000);

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
      success_url: `${baseUrl}/prices/success`,
      cancel_url: `${baseUrl}/prices/`,
      locale: 'fr',
      // Expiration date of the session (1 days)
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      automatic_tax: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
      },
      subscription_data: {
        metadata: {
          plan: order.title,
          buyer: order.buyer,
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

    // Send email
    const { status } = await sendEmail({
      email: order.email,
      subject: 'Paiement de votre abonnement',
      emailTemplate: 'payment',
      url: session.url,
    });

    return status === 'success'
      ? { status: 'success', message: 'Abonné crée avec success, un email a été envoyé', data: session }
      : { status: 'error', message: "Une erreur s'est produite, merci de réessayer ultérieurement" };
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

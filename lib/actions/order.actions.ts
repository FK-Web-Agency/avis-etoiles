'use server';

import { client } from '@/sanity/lib';
import Stripe from 'stripe';
import sendEmail from './resend.actions';

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
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      automatic_tax: {
        enabled: true,
      },
      tax_id_collection: {
        enabled: true,
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
    _type: "avis-invoices",
  };
  const result = await client.create(newOrder);
  return result;
};

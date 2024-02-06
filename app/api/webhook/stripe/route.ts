import { createOrder } from '@/lib/actions';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err:any) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Traiter l'événement
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Logique pour traiter l'événement checkout.session.completed

      const { id, amount_total, metadata } = event.data.object;

      const order = {
        stripeId: id,
        plan: metadata?.plan || '',
        buyerId: metadata?.buyerId || '',
        totalAmount: amount_total,
        createdAt: new Date(),
      };

      console.log('order', order);

      const newOrder = await createOrder(order);
      return NextResponse.json({ message: 'OK', order: newOrder });
    }

    // Réponse à Stripe
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

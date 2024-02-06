import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions';

export async function POST(request: Request) {
  console.log('webhook');

  const body = await request.text();

  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = "whsec_WxJevKl88mrxDGXgLJ1Xkf3gh4omPD2F";

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.log('Webhook error', err.message);

    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  // Get the ID and type
  const eventType = event.type;
  console.log('event', event);

  // CREATE
  if (eventType === 'checkout.session.completed') {
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

  return new Response('', { status: 200 });
}

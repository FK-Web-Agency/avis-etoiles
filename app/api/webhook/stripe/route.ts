import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder, retrieveInvoice } from '@/lib/actions/order.actions';
import { formatDate } from '@/helper';
import updateUser from '@/sanity/lib/members/updateUser';

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.text();

  // Retrieve the Stripe signature from the request headers
  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = 'whsec_WxJevKl88mrxDGXgLJ1Xkf3gh4omPD2F';

  let event;

  try {
    // Construct the Stripe event using the request body, signature, and endpoint secret
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    // Handle webhook error
    return NextResponse.json({ message: 'Webhook error', error: err });
  }

  // Get the type of the Stripe event
  const eventType = event.type;

  // Handle 'checkout.session.completed' event
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, invoice, metadata } = event.data.object;
    console.log(event.data.object);

    const invoiceRetrieve = await retrieveInvoice(invoice as string);
    console.log(invoiceRetrieve);

    const buyer = JSON.parse(metadata?.buyerId as string);
    const seller = JSON.parse(metadata?.sellerId as string);
    const subscription = JSON.parse(metadata?.subscription as string);
    // Create an order object
    const order = {
      stripeId: id,
      plan: metadata?.plan || '',
      frequency: metadata?.frequency || '', 
      buyer,
      seller,
      totalAmount: amount_total,
      createdAt: formatDate(new Date()),
    };

    // Create the order in the database
    const newOrder = await createOrder(order);

    // Update the buyer's subscription
    subscription.status = true;
    await updateUser({
      id: buyer._ref,
      user: subscription,
    });

    // Return success response with the new order
    return NextResponse.json({ message: 'OK', order: newOrder });
  }

  // Return empty response with 200 status
  return new Response('', { status: 200 });
}

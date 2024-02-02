// pages/api/hook.js
import { NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import sendEmail from '@/lib/actions/resend.actions';
import { checkoutOrder } from '@/lib/actions/order.actions';

const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: any, res: any) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await req.json(); // Read the body into a string

  if (!(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ success: false, message: 'Invalid signature', status: 401 });
  }

  // Create A link Stripe for payment
  const order = {
    id: body._id,
    title: body?.subscription?.plan,
    price: body?.subscription?.price,
  };

  const url = await checkoutOrder(order, true);

  // Send a email to the user with the link Stripe
  await sendEmail({
    email: body?.user?.email,
    subject: 'Paiement de votre abonnement',
    emailTemplate: 'payment',
    companyName: body?.companyName,
    url,
  });

  NextResponse.json({ success: true });
}

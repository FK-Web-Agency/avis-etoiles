'use client';

import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { Button } from '@/components/ui';
import { checkoutOrder } from '@/lib/actions';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton({ plan }: any) {

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    // TODO - handle success and cancelation
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async function () {
    const order = {
      id: plan._id,
      title: plan.title,
      price: plan.price,
      frequency: plan.frequency,
    };

    await checkoutOrder(order);
  };

  return (
    <form action={onCheckout} method="post">
      <Button className="w-full" type="submit" role="link">
        Commander
      </Button>
    </form>
  );
}

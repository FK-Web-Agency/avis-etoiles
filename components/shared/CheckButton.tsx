'use client';

import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import {
  AutoForm,
  AutoFormSubmit,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { checkoutOrder, checkoutSubscription } from '@/lib/actions';
import { z } from 'zod';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const InfoSchema = z.object({
  information: z.object({
    // role: z.enum(['admin', 'member']).default('member'),
    firstName: z.string().describe('Prénom'),
    lastName: z.string().describe('Nom'),
    email: z.string().email(),
    phone: z
      .string()
      .describe('Numéro de téléphone')
      .max(22, {
        message: 'Le numéro de téléphone est trop long',
      })
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de téléphone doit être une valeur numérique',
      })
      .describe('Numéro de téléphone'),
    companyName: z.string().describe('Nom de la société'),
    siret: z
      .string()
      .min(9, {
        message: 'Le numéro SIRET doit contenir 14 chiffres',
      })
      .max(14, {
        message: 'Le numéro SIRET doit contenir 14 chiffres',
      })
      .describe('Numéro SIRET ou SIREN')
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de SIRET/SIREN doit être une valeur numérique',
      }),
    vat: z.string().describe('TVA').optional(),
  }),
  address: z
    .object({
      street: z.string().describe('Rue'),
      city: z.string().describe('Ville'),
      zipCode: z
        .string()
        .max(5)
        .refine((value) => !isNaN(Number(value)), {
          message: 'Le numéro de code postal doit être une valeur numérique',
        })
        .describe('Code postal'),
      country: z.string().describe('Pays'),
    })
    .describe('Adresse Postale'),
});

type InfoSchemaType = z.infer<typeof InfoSchema>;
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

  const onCheckout = async function (values: InfoSchemaType) {
    const buyer = {
      email: values.information?.email,
      phoneNumber: values.information?.phone,
      companyName: values.information?.companyName,
      siret: values.information?.siret,
      role: 'member',
      address: values?.address,
      disabled: 'false',
    };

    const order = {
      id: plan._id,
      email: values.information?.email,
      title: plan.title,
      price: plan.price,
      frequency: plan.frequency,
      buyer: JSON.stringify(buyer),
      seller: 'avisetoiles.com',
      subscription: JSON.stringify({
        startDate: new Date(),
        plan: plan.title,
      }),
    };

    await checkoutOrder(order);
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button className="w-full">Commander</Button>
      </DialogTrigger>
      <DialogContent className="h-5/6 overflow-y-auto bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle>Informations requises</DialogTitle>
          <DialogDescription>
            <AutoForm onAction={onCheckout} formSchema={InfoSchema}>
              <AutoFormSubmit>Payer</AutoFormSubmit>
            </AutoForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

/* 
  <form action={onCheckout} method="post">
      <Button className="w-full" type="submit" role="link">
        Commander
      </Button>

    </form>
*/

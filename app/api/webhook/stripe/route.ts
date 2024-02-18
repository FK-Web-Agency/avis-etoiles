import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder, sendInvoice } from '@/lib/actions/order.actions'; // Assurez-vous que ce chemin est correct
import { kv } from '@vercel/kv';
import { createMember } from '@/lib/actions/clerk.actions';
import { client } from '@/sanity/lib';

// Fonction asynchrone pour gérer les requêtes POST
export async function POST(request: Request) {
  // Parsez le corps de la requête
  const body = await request.text();

  // Récupération de la signature Stripe depuis les en-têtes de la requête
  const sig = request.headers.get('stripe-signature') as string;
  const endpointSecret = 'whsec_WxJevKl88mrxDGXgLJ1Xkf3gh4omPD2F'; // Secret de l'endpoint, à garder sécurisé

  try {
    // Construction de l'événement Stripe à partir du corps de la requête, de la signature, et du secret de l'endpoint
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Traitement basé sur le type d'événement Stripe
    if (event.type === 'invoice.payment_succeeded') {
      console.log('invoice.payment_succeeded');

      const { invoice_pdf, hosted_invoice_url, id } = event.data.object;
      console.log(event.data.object);

      // Traitement pour le paiement d'une facture réussi
      const invoice = {
        pdf: invoice_pdf,
        url: hosted_invoice_url,
      };

      // Enregistrement de la facture dans KV
      await kv.set('invoice', invoice);

      // Envoi de la facture au client via Stripe API
      // Ça ne fonctionne pas en mode test
      const sendInvoiceToCustomer = await sendInvoice(id);
      // Envoi de la réponse de succès
      return NextResponse.json({ message: 'OK', sendInvoiceToCustomer });
    } else if (event.type === 'checkout.session.completed') {
      console.log('checkout.session.completed');

      // Traitement pour une session de paiement terminée
      const { id, amount_total, metadata } = event.data.object;

      const buyer = JSON.parse(metadata?.buyer as string);
      const seller = JSON.parse(metadata?.seller as string);

      const invoice = await kv.get('invoice');

      // Création de l'objet de commande
      const order = {
        stripeId: id,
        plan: metadata?.plan || '',
        frequency: metadata?.frequency || '',
        buyer,
        seller,
        price: amount_total,
        createdAt: new Date().toISOString(),
        invoice,
      };

      // Création de la commande dans la base de données
      const newOrder = await createOrder(order);
      await client
        .patch(buyer._ref)
        .set({
          subscription: {
            status: 'active',
          },
        })
        .commit();

      await kv.del('invoice');
      await kv.del(`subscriber:${buyer.email}`);

      // Réponse de succès avec la nouvelle commande
      return NextResponse.json({ message: 'OK', order: newOrder });
    } else if (event.type === 'payment_intent.succeeded') {
      console.log('payment_intent.succeeded');
    } else if (event.type === 'customer.subscription.created') {
      console.log('customer.subscription.created');
      const { id, metadata } = event.data.object;
      const buyer = JSON.parse(metadata?.buyer as string);
      const seller = JSON.parse(metadata?.seller as string);
      const member = {
        stripeId: id,
        buyer,
        seller,
        createdAt: new Date().toISOString(),
      };
      ///const newMember = await createMember(member);
      return NextResponse.json({ message: 'OK', data: event.data.object });
    }
  } catch (err: any) {
    // Gestion des erreurs liées aux webhooks
    return NextResponse.json({ message: 'Webhook error', error: err.message });
  }

  // Réponse vide avec le statut 200 si aucun traitement n'est effectué
  return new Response('', { status: 200 });
}

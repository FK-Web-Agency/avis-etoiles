import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions'; // Assurez-vous que ce chemin est correct
import updateUser from '@/sanity/lib/members/updateUser'; // Mise à jour des utilisateurs dans Sanity
import { kv } from '@vercel/kv';

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
    let invoice = '';
    let order: any = {};

    // Traitement basé sur le type d'événement Stripe
    if (event.type === 'invoice.payment_succeeded') {
      const { invoice_pdf, hosted_invoice_url } = event.data.object;
      // Traitement pour le paiement d'une facture réussi

      const invoice = {
        pdf: invoice_pdf,
        url: hosted_invoice_url,
      };
      await kv.set('invoice', invoice);
    } else if (event.type === 'checkout.session.completed') {
      // Traitement pour une session de paiement terminée
      const { id, amount_total, metadata } = event.data.object;

      const buyer = JSON.parse(metadata?.buyer as string);
      const seller = JSON.parse(metadata?.seller as string);
      const subscription = JSON.parse(metadata?.subscription as string);

      // Mise à jour de l'abonnement de l'acheteur
      subscription.status = true;
      await updateUser({
        id: buyer._ref,
        user: subscription,
      });

      const invoice = await kv.get('invoice');

      // Création de l'objet de commande
      order = {
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

      await kv.del('invoice');
      // Réponse de succès avec la nouvelle commande
      return NextResponse.json({ message: 'OK', order: newOrder });
    }
  } catch (err: any) {
    // Gestion des erreurs liées aux webhooks
    return NextResponse.json({ message: 'Webhook error', error: err.message });
  }

  // Réponse vide avec le statut 200 si aucun traitement n'est effectué
  return new Response('', { status: 200 });
}

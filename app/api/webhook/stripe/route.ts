import stripe from 'stripe';
import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/actions/order.actions'; // Assurez-vous que ce chemin est correct
import { formatDate } from '@/helper'; // Utilisé pour formater les dates si nécessaire
import updateUser from '@/sanity/lib/members/updateUser'; // Mise à jour des utilisateurs dans Sanity
import { client } from '@/sanity/lib'; // Client Sanity pour les opérations de base de données

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
    let orderId;

    // Traitement basé sur le type d'événement Stripe
    if (event.type === 'invoice.payment_succeeded') {
      // Traitement pour le paiement d'une facture réussi
      invoice = event.data.object.invoice_pdf as string;

      console.log('orderId Invoice', orderId);

      if (orderId) {
        // Mise à jour de la commande avec le lien de la facture
        await client.patch(orderId).set({ invoice }).commit();
      } else {
        const newOrder = await createOrder({ invoice });
        orderId = newOrder._id;
      }

      console.log('invoice', invoice);
      console.log('order id', orderId);
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
      console.log('order', orderId);

      // Création de la commande dans la base de données
      if (orderId) {
        // Mise à jour de la commande existante
        const updateOrder = await client.patch(orderId).set(order).commit();

        return NextResponse.json({ message: 'OK', order: updateOrder });
      } else {
        const newOrder = await createOrder(order);

        orderId = newOrder._id;
        // Réponse de succès avec la nouvelle commande
        return NextResponse.json({ message: 'OK', order: newOrder });
      }
    }
  } catch (err: any) {
    // Gestion des erreurs liées aux webhooks
    return NextResponse.json({ message: 'Webhook error', error: err.message });
  }

  // Réponse vide avec le statut 200 si aucun traitement n'est effectué
  return new Response('', { status: 200 });
}

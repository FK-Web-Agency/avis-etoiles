import { defineType } from 'sanity';

export default defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'stripeId',
      description: 'Numéro Stripe ID de l\'abonnement',
      title: 'Stripe ID',
      type: 'string',
    },
    {
      name: 'plan',
      title: 'Tarification',
      type: 'string',
    },
    {
      name: 'buyerId',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'totalAmount',
      title: 'Prix total',
      type: 'number',
    },
    {
      name: 'createdAt',
      title: 'Payé le',
      type: 'date',
    },
  ],
});

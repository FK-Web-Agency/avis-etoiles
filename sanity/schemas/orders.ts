import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'orders',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({
      name: 'stripeId',
      description: "Numéro Stripe ID de l'abonnement",
      title: 'Stripe ID',
      type: 'string',
    }),
    defineField({
      name: 'plan',
      title: 'Tarification',
      type: 'string',
    }),
    defineField({
      name: 'buyerId',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'seller',
      title: 'Vendeur',
      type: 'reference',
      to: [{ type: 'team-members' }],
    }),
    defineField({
      name: 'totalAmount',
      title: 'Prix total',
      type: 'number',
    }),
    defineField({
      name: 'createdAt',
      title: 'Payé le',
      type: 'date',
    }),
  ],
});

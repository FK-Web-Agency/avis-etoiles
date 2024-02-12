import { defineType, defineField } from 'sanity';

export default defineType({
  name: process.env.NEXT_PUBLIC_SANITY_ORDERS!,
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
      name: 'buyer',
      title: 'Abonné',
      type: 'reference',
      to: [{ type: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS! }],
    }),
    defineField({
      name: 'seller',
      title: 'Vendeur',
      type: 'reference',
      to: [{ type: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!}],
    }),
    defineField({
      name: 'price',
      title: 'Prix total',
      type: 'number',
    }),
    defineField({
      name: 'frequency',
      title: 'Fréquence',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Payé le',
      type: 'date',
      options:{
        dateFormat: 'DD-MM-YYYY',
      }
    }),
  ],
});

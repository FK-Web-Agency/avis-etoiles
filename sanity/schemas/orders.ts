import { Icons } from '@/components/shared';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: process.env.NEXT_PUBLIC_SANITY_ORDERS!,
  title: 'Les commandes',
  icon: Icons.Invoice,
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
      to: [{ type: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS! }],
    }),
    defineField({
      name: 'invoice',
      title: 'Facture',
      type: 'object',
      fields: [
        defineField({
          name: 'pdf',
          title: 'PDF',
          type: 'url',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
        }),
      ],
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
      type: 'datetime',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
  ],
});

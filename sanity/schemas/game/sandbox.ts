import { Icons } from '@/components/shared';
import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'sandbox',
  title: 'Paramétres du Jeu de test',
  icon: Icons.Test,
  fields: [
    defineField({
      name: 'seller',
      title: 'Vendeur',
      type: 'reference',
      to: [{ type: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS! }],
    }),
    defineField({
      name: 'buyer',
      title: 'Acheteur',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
        }),
        defineField({
          name: 'companyName',
          title: "Nom de l'entreprise",
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'qrCode',
      title: 'QR Code',
      type: 'image',
    }),
    defineField({
      name: 'actions',
      title: 'Actions',
      type: 'array',
      description: 'Actions à réaliser pour pouvoir tourner la roue',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'socialNetworkName',
              title: 'Nom du réseau social',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Valeur',
              description: "Valeur de l'action (url ou placeId pour google)",
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'rewards',
      title: 'Récompenses',
      type: 'array',
      description: 'Récompenses à gagner en tournant la roue',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'numberWinners',
      title: 'Nombre de gagnants',
      type: 'object',
      fields: [
        defineField({
          name: 'winners',
          title: 'Gagnants',
          type: 'number',
        }),
        defineField({
          name: 'attempts',
          title: 'Tentatives',
          type: 'number',
        }),
      ],
    }),
    defineField({
      name: 'secretCode',
      title: 'Code secret',
      description: 'Code secret pour confirmer la recupération de la récompense',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Créé le',
      type: 'datetime',
    }),
  ],
});

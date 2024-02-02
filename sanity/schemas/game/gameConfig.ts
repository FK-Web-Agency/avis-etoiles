import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'gameConfig',
  title: 'Jeu',
  fields: [
    defineField({
      name: 'user',
      title: 'Membre',
      type: 'reference',
      description: 'Configuration du jeu pour un membre en particulier',
      to: [{ type: 'users' }],
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
    // chevalet
    defineField({
      name: 'easel',
      title: 'easel',
      type: 'image',
    }),
    defineField({
      name: 'background',
      title: 'Arrière plan',
      type: 'image',
    }),
    defineField({
      name: 'color',
      title: 'Couleur',
      type: 'string',
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
      type: 'number',
    }),
    defineField({
      name: 'secretCode',
      title: 'Code secret',
      description: 'Code secret pour confirmer la recupération de la récompense',
      type: 'string',
    }),
  ],
});

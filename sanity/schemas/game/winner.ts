import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'winner',
  title: 'Gagnant',
  type: 'object',
  fields: [
    defineField({
      name: 'winnerFirstName',
      title: 'Nom du gagnant',
      type: 'string',
    }),
    defineField({
      name: 'winnerLastName',
      title: 'Prénom du gagnant',
      type: 'string',
    }),
    defineField({
      name: 'winnerEmail',
      title: 'Email du gagnant',
      type: 'string',
    }),
    defineField({
      name: 'winnerPhone',
      title: 'Téléphone du gagnant',
      type: 'string',
    }),
    defineField({
      name: 'winnerZipAddress',
      title: 'Code postal du gagnant',
      type: 'string',
    }),
    defineField({
      name: 'reward',
      title: 'Récompense',
      type: 'object',
      fields: [
        defineField({
          name: 'rewardName',
          title: 'Nom de la récompense',
          type: 'string',
        }),
        defineField({
          name: 'retrieved',
          title: 'Récupéré',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'winnerFirstName',
      subtitle: 'winnerEmail',
    },
  },
});

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
  ],

  preview: {
    select: {
      title: 'winnerFirstName',
      subtitle: 'winnerEmail',
    },
  },
});

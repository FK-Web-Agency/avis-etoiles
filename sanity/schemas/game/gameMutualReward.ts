import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'mutualReward',
  title: 'Cadeau mutuelisé',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    /*  defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }), */
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Date de début',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Date de fin',
      type: 'date',
    }),
    defineField({
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
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});

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
      name: 'winnerAddress',
      title: 'Adresse du gagnant',
      type: 'object',
      fields: [
        defineField({
          name: 'winnerAddressStreet',
          title: 'Rue',
          type: 'string',
        }),
        defineField({
          name: 'winnerAddressCity',
          title: 'Ville',
          type: 'string',
        }),
        defineField({
          name: 'winnerAddressPostalCode',
          title: 'Code postal',
          type: 'string',
        }),
        defineField({
          name: 'winnerAddressCountry',
          title: 'Pays',
          type: 'string',
        }),
        defineField({
            name: 'createdAt',
            title: 'Date de création',
            type: 'datetime',
            options: {
              dateFormat: 'DD/MM/YYYY',
              timeFormat: 'HH:mm',
              timeStep: 15,
            },
        }),
      ],
    }),
  ],


  preview: {
    select: {
      title: 'winnerFirstName' + ' ' + 'winnerLastName',
      subtitle: 'winnerEmail',
    },
  }
});

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'users',
  title: 'Les Membres',
  type: 'document',
  fields: [
    defineField({
      name: 'clerkId',
      title: 'id du membre',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firstName',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Prenom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: "Nom de l'entreprise",
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Rue',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'Ville',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'zip',
          title: 'Code postal',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'subscription',
      title: 'Abonnement',
      type: 'object',
      fields: [
        defineField({
          name: 'status',
          title: 'Status',
          type: 'boolean',
        }),
        defineField({
          name: 'expirationDate',
          title: 'Date',
          type: 'date',
        }),
      ],
    }),

    defineField({
      name: 'game',
      title: 'Jeu',
      type: 'object',
      fields: [
        defineField({
          name: 'rewards',
          title: 'Récompenses',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'secretCode',
          title: 'Code secret',
          description: 'Code secret pour confirmer la recupération de la récompense',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'month',
              title: 'Mois',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'year',
              title: 'Année',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'google',
              title: 'Google',
              type: 'number',
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram',
              type: 'number',
            }),
            defineField({
              name: 'facebook',
              title: 'Facebook',
              type: 'number',
            }),
            defineField({
              name: 'visitors',
              title: 'Numbre de visiteurs',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});

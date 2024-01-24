import { defineField, defineType } from 'sanity';
import { client } from '../lib';

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
      name: 'role',
      title: 'Rôle',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Membre', value: 'member' },
        ],
      },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siret',
      title: 'Siret',
      type: 'string',
      validation: (Rule) => Rule.required().min(9).max(14),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .email()
          .custom(async (email, schema) => {
            const filter = `*[_type == "users" && email == $email]`;
            const params = { email };

            const duplicateEmails = await client.fetch(filter, params);
            // @ts-ignore
            if (duplicateEmails.length > 0 && !schema?.document._id.includes(duplicateEmails[0]._id)) {
              return 'Email already exists';
            }

            return true; // Email is unique
          })
          .error('Email already exists'),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'string',
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
          name: 'zipCode',
          title: 'Code postal',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'country',
          title: 'Pays',
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
          description: "Status de l'abonnement",
          type: 'boolean',
        }),
        defineField({
          name: 'free',
          title: 'Gratuit',
          description: 'Abonnement gratuit ?',
          type: 'boolean',
        }),
        defineField({
          name: 'plan',
          title: 'Plan',
          type: 'string',
          options: {
            list: [
              { title: 'Essentiel', value: 'essential' },
              { title: 'Pro', value: 'premium' },
              { title: 'Entreprise', value: 'enterprise' },
            ],
          },
        }),
        defineField({
          name: 'recurring',
          title: 'Renouvellement',
          type: 'string',
          options: {
            list: [
              { title: 'Mensuel', value: 'monthly' },
              { title: 'Annuel', value: 'yearly' },
            ],
          },
        }),
        defineField({
          name: 'price',
          title: 'Prix',
          type: 'number',
        }),
        defineField({
          name: 'startDate',
          title: 'Date de début',
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
          },
        }),
        defineField({
          name: 'expirationDate',
          title: "Date d'expiration",
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
          },
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

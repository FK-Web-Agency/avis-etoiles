import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'general',
  title: 'ℹ️ Informations Generales (logo, mentions légales, etc)',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    // Mentions légales
    defineField({
      name: 'legalNotice',
      title: 'Mentions légales',
      type: 'infoContent',
    }),
    // Conditions générales de vente
    defineField({
      name: 'termsAndConditions',
      title: 'Conditions générales de vente',
      type: 'infoContent',
    }),
    // Conditions générales d'utilisation
    defineField({
      name: 'termsOfUse',
      title: "Conditions générales d'utilisation",
      type: 'infoContent',
    }),
    /*   defineField({
        name: 'privacyPolicy',
        title: 'Politique de confidentialité',
        type: 'array',
        of: [
          {
            type: 'block',
          },
        ],
      }) */
    // Politique de confidentialité
    defineField({
      name: 'privacyPolicy',
      title: 'Politique de confidentialité',
      type: 'infoContent',
    }),

    // Address
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Nom de la rue',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'Ville',
          type: 'string',
        }),
        defineField({
          name: 'zipCode',
          title: 'Code postal',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Pays',
          type: 'string',
        }),
      ],
    }),
    // Phone
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    // Email
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    // Social networks
    defineField({
      name: 'socialNetworks',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],

  // Preview
  preview: {
    select: {
      media: 'logo',
    },
    prepare() {
      return {
        title: 'Informations Generales',
      };
    },
  },
});

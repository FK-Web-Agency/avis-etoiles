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
      type: 'array',
      of: [
        {
          type: 'block',
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

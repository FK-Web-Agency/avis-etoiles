import { defineField, defineType } from 'sanity';

const groups = [
  {
    name: 'seo',
    title: 'SEO',
    icon: () => '🔍',
  },
  {
    name: 'intro_section',
    title: "Section d'introduction",
    icon: () => '🏞️',
  },
  {
    name: 'prices_list_section',
    title: 'Section liste des tarifications',
    icon: () => '💸',
  },
];

export default defineType({
  name: 'prices',
  title: '🤑 Page Tarifications',
  type: 'document',
  groups,
  fields: [
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Configuration SEO de la page',
      type: 'seo',
      group: 'seo',
      validation: (Rule: any) => Rule.required(),
    }),
    // Intro Section
    defineField({
      name: 'introduction_section',
      title: "Section d'introduction",
      type: 'object',
      group: 'intro_section',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'generatedTextGradient',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
    // Prices List Section
    defineField({
      name: 'prices_list_section',
      title: 'Section liste des tarifications',
      description: 'Liste des tarifications',
      type: 'array',
      of: [
        defineField({
          name: 'price',
          title: 'Tarification',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Prix',
              type: 'number',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'features',
              title: 'Fonctionnalités',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
      ],
    }),
  ],

  // Preview
  preview: {
    select: {
      title: 'seo.meta_title',
    },
  },
});

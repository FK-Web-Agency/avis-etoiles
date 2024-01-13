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
  {
    name: 'faq_section',
    title: 'Section FAQ',
    icon: () => '❓',
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

    // FAQs
    defineField({
      name: 'faqs__section',
      title: 'Section FAQ',
      type: 'object',
      group: 'faq_section',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Sous-titre',
          type: 'array',
          validation: (Rule: any) => Rule.required(),
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'faqs',
          title: 'FAQs',
          description: 'Liste des questions fréquentes',
          type: 'array',
          validation: (Rule: any) => Rule.required(),
          of: [
            defineField({
              name: 'faq',
              title: 'FAQ',
              type: 'object',
              fields: [
                defineField({
                  name: 'question',
                  title: 'Question',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                }),
                defineField({
                  name: 'answer',
                  title: 'Réponse',
                  type: 'text',
                  validation: (Rule: any) => Rule.required(),
                }),
              ],
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

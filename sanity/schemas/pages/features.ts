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
];

export default defineType({
  name: 'features',
  title: '🎯 Page Features',
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
      name: 'intro',
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
  ],
// Preview
  preview: {
    select: {
      title: 'seo.meta_title',
    },
  },
});

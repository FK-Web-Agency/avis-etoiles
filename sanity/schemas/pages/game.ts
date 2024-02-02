import { defineField, defineType } from 'sanity';

const groups = [
  {
    name: 'seo',
    title: 'SEO',
    icon: () => '🔍',
  },
  {
    name: 'starter_section',
    title: "Section d'introduction",
    icon: () => '🏞️',
  },
];

export default defineType({
  name: 'game',
  title: 'Page de jeu',
  type: 'document',
  groups,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      description: 'Configuration SEO de la page',
      type: 'seo',
      group: 'seo',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'starter_section',
      title: "Section d'introduction",
      type: 'object',
      group: 'starter_section',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'procedure',
          title: 'Explication du jeu',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),
  ],
});

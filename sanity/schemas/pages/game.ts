import { Icons } from '@/components/shared';
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
  name: process.env.NEXT_PUBLIC_SANITY_GAME!,
  title: 'Pages du Jeu',
  type: 'document',
  icon: Icons.Game,
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

    defineField({
      name: 'settings',
      title: 'Design du jeu',
      type: 'gameSetting',
    }),
  ],
});

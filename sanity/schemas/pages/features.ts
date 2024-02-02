import { Icons } from '@/components/shared';
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
    name: 'how_it_works_section',
    title: 'Comment ça marche',
    icon: () => '🎯',
  },
];

export default defineType({
  name: 'features',
  title: 'Page Features',
  type: 'document',
  icon: Icons.Features,
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

    // How it works Section
    defineField({
      name: 'how_it_works_section',
      title: 'Section Comment ça marche',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'how_it_works',
          fields: [
            defineField({
              name: 'icon',
              type: 'array',
              title: 'Icône',
              validation: (Rule: any) => Rule.required(),
              of: [
                {
                  type: 'block',
                  of: [{ type: 'icon.manager', title: 'Inline Icon' }],
                },
                {
                  type: 'icon.manager',
                  title: 'Block Icon',
                },
              ],
            }),
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            }),
          ],
        }),
      ],
    }),

    // CTA
    defineField({
      name: 'cta',
      title: 'CTA',
      description: 'Call to action section avant le pied de page',
      validation: (Rule: any) => Rule.required(),
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Description',
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

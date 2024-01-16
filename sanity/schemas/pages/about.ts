import { defineField, defineType } from 'sanity';

const groups = [
  {
    name: 'seo',
    title: 'SEO',
    icon: () => '🔍',
  },
  {
    name: 'banner',
    title: 'Bannière de la page',
    icon: () => '🏞️',
  },
  {
    name: 'how_it_works_section',
    title: 'Comment ça marche',
    icon: () => '🎯',
  },
];

export default defineType({
  name: 'about',
  title: '📚 Page à propos',
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
    // Banner
    defineField({
      name: 'banner',
      title: 'Bannière de la page',
      type: 'object',
      group: 'banner',
      fields: [
        defineField({
          name: 'title_gradient',
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
        defineField({
          name: 'images',
          title: 'Image',
          type: 'array',
          validation: (Rule: any) => Rule.required(),
          of: [{ type: 'image' }],
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

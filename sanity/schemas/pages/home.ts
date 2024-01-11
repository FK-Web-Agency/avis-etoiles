import { defineField, defineType } from 'sanity';

const groups = [
  {
    name: 'seo',
    title: 'SEO',
    icon: () => '🔍',
  },
  {
    name: 'banner_content',
    title: "Bannière de la page d'accueil",
    icon: () => '🏞️',
  },
];

export default defineType({
  name: 'home',
  title: "Page d'accueil",
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
    }),
    // Banner
    defineField({
      name: 'banner',
      title: "Bannière d'accueil",
      type: 'object',
      group: 'banner_content',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'text',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
    }),
  ],
  // Preview
  preview: {
    select: {
      title: 'banner.title',
      subtitle: 'banner.subtitle',
      media: 'banner.image',
    },
  },
});

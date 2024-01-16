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
    name: 'story_section',
    title: 'Section histoire',
    icon: () => '📖',
  },
  {
    name: 'mission_section',
    title: 'Section mission',
    icon: () => '🎯',
  },
  {
    name: 'values_section',
    title: 'Section notre engagement',
    icon: () => '🤝',
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
    // Story section
    defineField({
      name: 'story_section',
      title: 'Section histoire',
      type: 'object',
      group: 'story_section',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'stats',
          title: 'Les stats affichées',
          type: 'array',
          of: [
            defineField({
              name: 'item',
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Nom de la stats',
                  type: 'string',
                }),
                defineField({
                  name: 'value',
                  title: 'Valeur de la stats',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
      ],
    }),
    // Mission section
    defineField({
      name: 'mission_section',
      title: 'Section mission',
      group: 'story_section',
      description: 'Section mission',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre de la section',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Description de la section',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'values',
          title: 'Liste des valeurs',
          type: 'array',
          of: [
            defineField({
              name: 'item',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Nom de la valeur',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description de la valeur',
                  type: 'text',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // Values section
    defineField({
      name: 'values_section',
      title: 'Section notre engagement',
      type: 'object',
      group: 'values_section',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre de la section',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Description de la section',
          type: 'array',
          of: [{ type: 'block' }],
        }),
        defineField({
          name: 'images',
          title: 'Images de la section',
          type: 'array',
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

import { defineField, defineType } from 'sanity';

const groups = [
  {
    name: 'seo',
    title: 'SEO',
    icon: () => '🔍',
  },
  {
    name: 'banner_section',
    title: "Bannière de la page d'accueil",
    icon: () => '🏞️',
  },
  {
    name: 'advantages_section',
    title: 'Les avantages de la plateforme',
    icon: () => '🎯',
  },
];

export default defineType({
  name: 'home',
  title: "🏠 Page d'accueil",
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
    // Banner Section
    defineField({
      name: 'banner',
      title: "Bannière d'accueil",
      type: 'object',
      group: 'banner_section',
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
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          validation: (Rule: any) => Rule.required(),
        }),
      ],
    }),

    // Advantages Section
    defineField({
      name: 'advantages_section',
      title: 'Les avantages',
      description:
        "C'est la section qui présente les avantages de la plateforme section 2 après la bannière",
      type: 'object',
      group: 'advantages_section',
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
          type: 'text',
          validation: (Rule: any) => Rule.required(),
        }),
        defineField({
          name: 'advantages',
          title: 'Les avantages de la plateforme',
          description:
            "C'est la section qui présente les avantages de la plateforme section 2 après la bannière",
          type: 'array',
          validation: (Rule: any) => Rule.required(),
          of: [
            {
              type: 'object',
              description: 'Avantages de la plateforme',
              fields: [
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
                  validation: (Rule: any) => Rule.required().max(150),
                }),
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
              ],
            },
          ],
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

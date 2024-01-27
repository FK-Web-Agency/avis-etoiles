import { defineField, defineType } from 'sanity';

export default defineType({
  // gameEasel = chevalet
  name: 'gameEasel',
  title: 'Les chevalets',
  type: 'document',
  description: 'Les chevalets pour afficher les QR Codes',
  fields: [
    defineField({
      name: 'easel',
      title: 'Chevalet',
      type: 'image',
    }),
    defineField({
      name: 'qrcode',
      title: 'Position et taille du QR Code',
      type: 'object',
      fields: [
        defineField({
          name: 'size',
          title: 'Taille',
          type: 'object',
          fields: [
            defineField({
              name: 'width',
              title: 'Largeur',
              type: 'number',
            }),
            defineField({
              name: 'height',
              title: 'Hauteur',
              type: 'number',
            }),
          ],
        }),
        defineField({
          name: 'position',
          title: 'Position',
          type: 'object',
          fields: [
            defineField({
              name: 'x',
              title: 'Position X',
              type: 'number',
            }),
            defineField({
              name: 'y',
              title: 'Position Y',
              type: 'number',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: 'easel',
    },
  },
});

import { Icons } from '@/components/shared';
import { defineField, defineType } from 'sanity';

export default defineType({
  // gameEasel = chevalet
  name: 'gameEasel',
  title: 'Les Modèles de Chevalet',
  icon: Icons.Easel,
  type: 'document',
  description: 'Les chevalets pour afficher les QR Codes',
  fields: [
    defineField({
      name: 'easelPreview',
      title: 'Chevalet de prévisualisation',
      type: 'image',
    }),

    defineField({
      name: 'easel',
      title: 'Chevalet pour afficher les QR Codes',
      type: 'image',
    }),
    defineField({
      name: 'logo',
      title: 'Position et taille du Logo',
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

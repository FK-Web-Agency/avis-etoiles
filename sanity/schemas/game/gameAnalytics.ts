import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gameAnalytics',
  title: 'Analytique du jeu',
  type: 'document',
  description: 'Analytique du jeu pour chaque membre',

  fields: [
    defineField({
      name: 'user',
      title: 'Member',
      type: 'reference',
      to: [{ type: 'users' }],
    }),
    defineField({
      name: 'views',
      title: 'Vues',
      description: 'Nombre de vues ou de fois que le QR code a été scanné',
      type: 'number',
    }),
    defineField({
      name: 'winners',
      title: 'Gagnants',
      description: 'Les gagnants',
      type: 'array',
      of: [{ type: 'winner' }],
    }),
    defineField({
      name: 'google',
      title: 'Google',
      description: 'Statistiques de Google',
      type: 'number',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      description: 'Statistiques de Facebook',
      type: 'number',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      description: 'Statistiques de Instagram',
      type: 'number',
    }),
  ],
});

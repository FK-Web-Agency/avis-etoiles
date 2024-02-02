import { Icons } from '@/components/shared';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gameAnalytics',
  title: 'Analytique du jeu',
  type: 'document',
  description: 'Analytique du jeu pour chaque membre',
  icon: Icons.Stats,
  fields: [
    defineField({
      name: 'user',
      title: 'Member',
      type: 'reference',
      to: [{ type: 'users' }],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytique',
      type: 'array',
      of: [{ type: 'analytic' }],
    }),
  ],

  preview: {
    select: {
      title: 'user.companyName',
    },

    prepare({ title }) {
      return {
        title: `Analytique du jeu pour ${title}`,
      };
    },
  },
});

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'analytic',
  title: 'Analytique',
  type: 'object',
  fields: [
    defineField({
      name: 'year',
      title: 'Année',
      description: "Année de l'analytique",
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
      // year value must be unique for each analytic
      validation: (Rule) =>
        Rule.custom((field, schema) => {
          const date = new Date(field as string);
          const year = date.toLocaleString('fr-FR', { year: 'numeric' });
          // document is the current document
          const analytics = schema?.document?.analytics;

          // @ts-ignore
          const yearExists = analytics?.filter((analytic) => {
            const date = new Date(analytic.year);
            const yearAnalytic = date.toLocaleString('fr-FR', { year: 'numeric' });

            return yearAnalytic === year;
          });

          // Check if the document has year field and it is not empty and is published
          return yearExists?.length > 1 ? "L'année doit être unique" : true;
        }),
    }),
    defineField({
      name: 'months',
      title: 'Mois',
      description: "Mois de l'analytique",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'month',
              title: 'Mois',
              description: "Mois de l'analytique",
              type: 'date',
              options: {
                dateFormat: 'MMM',
              },
              validation: (Rule) =>
                Rule.custom((field, schema) => {
                  const date = new Date(field as string);
                  const month = date.toLocaleString('fr-FR', { month: 'long' }); // document is the current document

                  // document is the current document
                  const analytics = schema?.document?.analytics;

                  for (const item of analytics as any[]) {
                    const date = new Date(item.year);
                    const year = date.toLocaleString('fr-FR', { year: 'numeric' });
                    const months = item.months;

                    if (months) {
                      const monthExists = months.filter((item:any) => {
                        const date = new Date(item.month);
                        const monthAnalytic = date.toLocaleString('fr-FR', { month: 'long' });

                        return monthAnalytic === month;
                      });

                      if (monthExists?.length > 1) {
                        return 'Le mois doit être unique';
                      }
                    }
                  }

                  // Check if the document has year field and it is not empty and is published
                  return true;
                }),
            }),
            defineField({
              name: 'visitors',
              title: 'Nombre de visiteurs',
              description: 'Nombre de vues ou de fois que le QR code a été scanné',
              type: 'number',
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

          preview: {
            select: {
              title: 'month',
              subtitle: 'visitors',
            },

            prepare({ title, subtitle }) {
              const date = new Date(title);
              const month = date.toLocaleString('fr-FR', { month: 'long' });

              return {
                title: month,
                subtitle: `Visiteurs: ${subtitle || 0}`,
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'year',
    },

    prepare({ title }) {
      const date = new Date(title);
      const year = date.toLocaleString('fr-FR', { year: 'numeric' });

      return {
        title: year,
      };
    },
  },
});

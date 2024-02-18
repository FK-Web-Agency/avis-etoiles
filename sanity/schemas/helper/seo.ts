import { defineType } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'meta_title',
      title: 'Meta title',
      type: 'string',
    },
    {
      name: 'meta_description',
      title: 'Meta description',
      type: 'text',
    },
  ],
});

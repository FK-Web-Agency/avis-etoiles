import { type SchemaTypeDefinition } from 'sanity';
import { home } from './schemas/pages';
import { seo } from './schemas/helper';
import general from './schemas/general';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [general, seo, home],
};

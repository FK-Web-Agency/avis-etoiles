import { type SchemaTypeDefinition } from 'sanity';
import { features, home } from './schemas/pages';
import { generatedTextGradient, infoContent, seo } from './schemas/helper';
import general from './schemas/general';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [infoContent, seo, generatedTextGradient, general, home, features],
};

import { type SchemaTypeDefinition } from 'sanity';
import { about, features, home, prices } from './schemas/pages';
import { generatedTextGradient, infoContent, seo } from './schemas/helper';
import general from './schemas/general';
import orders from './schemas/orders';
import members from './schemas/members';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [infoContent, seo, generatedTextGradient, general, home, features, prices, about, members, orders],
};

import { type SchemaTypeDefinition } from 'sanity';
import { about, features, home, prices, game } from './schemas/pages';
import { generatedTextGradient, infoContent, seo } from './schemas/helper';
import general from './schemas/general';
import orders from './schemas/orders';
import {
  analytic,
  gameAnalytics,
  gameBackgrounds,
  gameConfig,
  gameEasel,
  gameMutualReward,
  gameWinners,
  winner,
} from './schemas/game';
import users from './schemas/users';
import collaborators from './schemas/collaborators';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    infoContent,
    seo,
    generatedTextGradient,
    general,
    home,
    features,
    prices,
    about,
    game,
    orders,
    collaborators,
    users,
    analytic,
    gameBackgrounds,
    gameEasel,
    gameConfig,
    gameMutualReward,
    gameAnalytics,
    winner,
    gameWinners,
  ],
};

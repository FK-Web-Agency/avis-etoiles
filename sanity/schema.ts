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
  gameSetting,
  gameWinners,
  winner,
} from './schemas/game';
import subscribers from './schemas/subscribers';
import collaborators from './schemas/collaborators';
import sandbox from './schemas/game/sandbox';

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
    collaborators,
    subscribers,
    orders,
    gameSetting,
    analytic,
    game,
    gameMutualReward,
    // gameBackgrounds,
    gameEasel,
    gameConfig,
    sandbox,
    gameAnalytics,
    winner,
    gameWinners,
  ],
};

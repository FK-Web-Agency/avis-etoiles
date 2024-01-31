import { type SchemaTypeDefinition } from 'sanity';
import { about, features, home, prices, game } from './schemas/pages';
import { generatedTextGradient, infoContent, seo } from './schemas/helper';
import general from './schemas/general';
import orders from './schemas/orders';
import users from './schemas/users';
import gameConfig from './schemas/game/gameConfig';
import gameBackgrounds from './schemas/game/gameBackgrounds';
import gameEasel from './schemas/game/gameEasel';
import winner from './schemas/game/winner';
import gameAnalytics from './schemas/game/gameAnalytics';
import analytic from './schemas/game/analytic';
import gameWinners from './schemas/game/gameWinners';

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
    users,
    orders,
    gameBackgrounds,
    gameEasel,
    gameConfig,
    winner,
    analytic,
    gameAnalytics,
    gameWinners
  ],
};

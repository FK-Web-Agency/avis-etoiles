import { GameConfigProps } from '@/interfaces/game';
import { client } from '@/sanity/lib';

export default async function createGameConfig(config: any) {
  try {
    const gameConfig = await client.create(config);

    await client.create({
      _type: 'gameAnalytics',
      user: gameConfig._id,
      views: 0,
      winners: [],
      google: 0,
      facebook: 0,
      instagram: 0,
    });
    return { status: 'ok', message: 'Votre confituration a bien été créée', gameConfig };
  } catch (error: any) {
    return { status: 'error', message: error.message };
  }
}

import { GameConfigProps } from '@/interfaces/game';
import { client } from '@/sanity/lib';

export default async function createGameConfig(config: any) {
  try {
    const gameConfig = await client.create(config);
    return { status: 'ok', message: 'Votre confituration a bien été créée', gameConfig };
  } catch (error: any) {
    return { status: 'error', message: error.message };
  }
}

import { z } from 'zod';
import { create } from 'zustand';

enum GameStep {
  starter = 'starter',
  verification = 'verification',
  game = 'game',
  result = 'result',
}

const GameSchema = z.object({
  currentAction: z.string().optional(),
  canPlay: z.boolean(),
  saveUserHistory: z.any().optional(),
  gameStep: z.nativeEnum(GameStep),
  setCurrentAction: z.function().args(z.string()).returns(z.void()),
  setCanPlay: z.function().args(z.boolean()).returns(z.void()),
  setSaveUserHistory: z.function().args(z.any()).returns(z.void()),
});

type GameProps = z.infer<typeof GameSchema>;

const useGameStore = create<GameProps>((set) => ({
  canPlay: true,
  currentAction: undefined,
  saveUserHistory: undefined,
  gameStep: GameStep.starter,
  setCurrentAction: (currentAction: string) => set({ currentAction }),
  setCanPlay: (canPlay: boolean) => set({ canPlay }),
  setSaveUserHistory: (saveUserHistory: any) => set({ saveUserHistory }),
  setGameStep: (gameStep: GameStep) => set({ gameStep }),
}));

export default useGameStore;

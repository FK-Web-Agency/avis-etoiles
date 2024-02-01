import { z } from 'zod';
import { create } from 'zustand';

export enum GameStep {
  starter = 'starter',
  verification = 'verification',
  launchWheel = 'launchWheel',
  result = 'result',
}

const ActionSchema = z.object({
  title: z.string(),
  Icon: z.function().args(z.any()).returns(z.any()),
});

const userHistorySchema = z
  .object({
    lastGamePlayed: z.date(),
    actions: z.array(z.string()),
  })
  .optional();

const GameSchema = z.object({
  currentAction: ActionSchema.optional(),
  canPlay: z.boolean(),
  userLocalStorage: z.function().returns(z.tuple([userHistorySchema, z.function().returns(z.any())])),
  gameStep: z.nativeEnum(GameStep),
  result: z.string().optional(),
  setCurrentAction: z.function().args(ActionSchema).returns(z.void()),
  setCanPlay: z.function().args(z.boolean()).returns(z.void()),
  setUserLocalStorage: z.function().args(userHistorySchema, z.any()).returns(z.void()),
  setGameStep: z.function().args(z.nativeEnum(GameStep)).returns(z.void()),
  setResult: z.function().args(z.string()).returns(z.void()),
});

type GameProps = z.infer<typeof GameSchema>;
type ActionProps = z.infer<typeof ActionSchema>;
export type UserHistoryProps = z.infer<typeof userHistorySchema>;

const useGameStore = create<GameProps>((set) => ({
  canPlay: true,
  currentAction: undefined,
  userLocalStorage: () => [undefined, () => {}],
  gameStep: GameStep.starter,
  result: 'lait',
  setCurrentAction: (currentAction: ActionProps) => set({ currentAction }),
  setCanPlay: (canPlay: boolean) => set({ canPlay }),
  setUserLocalStorage: (userHistory: UserHistoryProps | undefined, saveUserHistory: any) =>
    set({ userLocalStorage: () => [userHistory, saveUserHistory] }),
  setGameStep: (gameStep: GameStep) => set({ gameStep }),
  setResult: (result: string) => set({ result }),
}));

export default useGameStore;

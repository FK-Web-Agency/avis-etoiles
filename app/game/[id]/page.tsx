'use client';

import { z } from 'zod';
import { useList } from '@refinedev/core';

import { Footer, LaunchWheel, Starter } from '@/components/game';
import { Icons } from '@/components/shared';
import { urlForImage } from '@/sanity/lib';
import useGameStore, { GameStep } from '@/store/game.store';
import { useEffect, useState } from 'react';

const GameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

type GameProps = z.infer<typeof GameSchema>;

export default function Game({ params: { id } }: GameProps) {
  const [actionExists, setActionExists] = useState(true);
  const { gameStep, currentAction } = useGameStore();
  const { data, isLoading } = useList({
    resource: 'gameConfig',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: id,
      },
    ],
  });
  const config = data?.data[0];

  useEffect(() => {
 /*    const actionsTitle = config?.actions?.map(
      (action: { socialNetworkName: string; value: string }) => action.socialNetworkName
    );

    if (actionsTitle?.includes(currentAction?.title)) {
      setActionExists(true);
    } */
  }, [data]);

  /*
BEFORE LAUNCH GAME
 verify that the user has a game config
  if not, send a error message

  Verify the use don't use private navigation
  if so, send a error message

  Verify the user don't have a game in progress
  if so, send a error message

  Verift the use didn't play the game today
  if so, send a error message

  Verify which action the user has to do
*/

  return (
    <>
      {isLoading ? (
        <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <main
            style={{
              backgroundImage: `url(${urlForImage(config?.background)})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="min-h-[calc(100vh-2rem)]">
            {!actionExists && <div>error</div>}
            {gameStep === GameStep.starter && actionExists && <Starter config={config} />}
            {gameStep === GameStep.launchWheel && actionExists && <LaunchWheel />}
          </main>

          <Footer color={config?.color} />
        </>
      )}
    </>
  );
}

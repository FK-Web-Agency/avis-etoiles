'use client';
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
import { z } from 'zod';
import { useList, useOne, useUpdate } from '@refinedev/core';

import { ErrorActionDoesNotExist, Footer, LaunchWheel, Result, Starter } from '@/components/game';
import { Icons } from '@/components/shared';
import { urlForImage } from '@/sanity/lib';
import useGameStore, { GameStep } from '@/store/game.store';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/helper';
import { createAnalytics } from '@/sanity/schemas/helper';

const GameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

type GameProps = z.infer<typeof GameSchema>;

export default function Game({ params: { id } }: GameProps) {
  const [actionExists, setActionExists] = useState(true);
  const [done, setDone] = useState(false);
  const { gameStep, currentAction, setWheelData } = useGameStore();

  const { mutate } = useUpdate();
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

  const { data: dataAnalytics } = useList({
    resource: 'gameAnalytics',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: id,
      },
    ],
  });

  const { data: subscriberData } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    id,
  });

  const { data: defaultConfig, isLoading: defaultIsLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME!,
  });

  const config = data?.data[0];
  const defaultSettings = defaultConfig?.data[0]?.settings;
  const analytics = dataAnalytics?.data[0];

  useEffect(() => {
    const actionsTitle = config?.actions?.map(
      (action: { socialNetworkName: string; value: string }) => action.socialNetworkName
    );

    if (actionsTitle?.includes(currentAction?.title)) {
      setActionExists(true);
    }
  }, [data]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const userAnalytics = analytics?.analytics;
  const index = userAnalytics?.findIndex((item: any) => new Date(item.year).getFullYear() === year);

  const thisYearAnalytics = userAnalytics?.at(index);
  const monthIndex = thisYearAnalytics?.months.findIndex((item: any) => new Date(item.month).getMonth() === month);
  const thisMonthAnalytics = thisYearAnalytics?.months?.at(monthIndex);

  useEffect(() => {
    if (index === -1 && !done)
      mutate({
        resource: 'gameAnalytics',
        id: analytics?._id,
        values: {
          analytics: [...userAnalytics, createAnalytics()],
        },
      });
  }, [dataAnalytics]);

  useEffect(() => {
    if (index === -1 || !thisMonthAnalytics) return;
    if (!done) return setDone(true);

    thisMonthAnalytics.visitors += 1;

    mutate({
      resource: 'gameAnalytics',
      values: {
        analytics: userAnalytics,
      },
      id: analytics?._id,
    });
    setDone(true);
  }, [thisMonthAnalytics]);

  useEffect(() => {
    setWheelData({
      id: id,
      rewards: config?.rewards,
      numberWinners: config?.numberWinners,
    });
  }, [config]);

  if (subscriberData?.data?.subscription?.status !== 'active')
    return (
      <div className="flex-center h-screen wrapper">
        <h1 className="h3-bold">Cet QRCode est inaccesible merci de rééssayer plus tard</h1>
      </div>
    );

    
  return (
    <>
      {isLoading || defaultIsLoading ? (
        <div className="flex-center">
          <Icons.Spinner className="mr-2 h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          <main
            style={{
              backgroundImage: `url(${defaultSettings && urlForImage(defaultSettings?.background)})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
            className="min-h-[calc(100vh-2rem)] pb-10">
            <div className="container overflow-x-hidden flex-center flex-col h-screen gap-10">
              <div
                className={classNames(
                  'flex justify-center items-center ',
                  gameStep === GameStep.starter ? 'mb-16' : 'mb-1'
                )}>
                <Image src={urlForImage(config?.logo)} alt="Picture of the author" width={150} height={150} />
              </div>
              {!actionExists && <ErrorActionDoesNotExist />}
              {gameStep === GameStep.starter && actionExists && <Starter config={{ ...config, ...defaultSettings }} />}
              {gameStep === GameStep.launchWheel && actionExists && (
                <LaunchWheel
                  config={{ ...config, ...defaultSettings }}
                  thisYearAnalytics={thisYearAnalytics}
                  thisMonthAnalytics={thisMonthAnalytics}
                  analytics={analytics}
                />
              )}
              {gameStep === GameStep.result && actionExists && <Result config={defaultSettings} id={id} />}
            </div>
          </main>

          <Footer color={config?.color} />
        </>
      )}
    </>
  );
}

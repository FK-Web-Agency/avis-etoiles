'use client';
import { useList } from '@refinedev/core';
import { useEffect, useState } from 'react';
import { z } from 'zod';

import { Spinner } from '@/components/shared';
import { classNames } from '@/helper';
import { urlForImage } from '@/sanity/lib';
import { useGameStore } from '@/store';
import { GameStep } from '@/store/game.store';
import Image from 'next/image';
import { ErrorActionDoesNotExist, LaunchWheel, Result, Starter } from '@/components/game';
import { check24HoursPast } from '@/helper/getDate';

const SandboxSchema = z.object({
  params: z.object({
    name: z.string(),
  }),
});

type SandboxProps = z.infer<typeof SandboxSchema>;

export default function page({ params: { name } }: SandboxProps) {
  const [actionExists, setActionExists] = useState(true);
  const { gameStep, currentAction, setWheelData } = useGameStore();
  const [qrcodeExpired, setQrcodeExpired] = useState(false);

  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME!,
  });

  const { data: subscriber, isLoading: subscriberIsLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_SANDBOX!,
    filters: [
      {
        field: 'buyer.companyName',
        operator: 'eq',
        value: name.split('-').join(' '),
      },
    ],
  });

  const config = data?.data[0]?.settings;
  const subscriberData = subscriber?.data[0];

  useEffect(() => {
    if (subscriberData?.createdAt) {
      const checkValidation = check24HoursPast(subscriberData?.createdAt);

      if (checkValidation === '24 heures se sont écoulées depuis la date donnée.') {
        setQrcodeExpired(true);
      }
    }
  }, [subscriberData]);

  console.log('config', config);

  useEffect(() => {
    setWheelData({
      id: subscriberData?._id,
      rewards: subscriberData?.rewards,
      numberWinners: subscriberData?.numberWinners,
    });
  }, [subscriberData]);

  if (isLoading || subscriberIsLoading) return <Spinner />;

  if (qrcodeExpired) return <div className="text-center text-2xl">Le QR code a expiré</div>;

  return (
    <main
      style={{
        backgroundImage: `url(${urlForImage(config?.background)})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="min-h-[calc(100vh-2rem)] pb-10">
      <div className="container overflow-x-hidden">
        {/* Logo */}
        <div
          className={classNames('flex justify-center items-center ', gameStep === GameStep.starter ? 'mb-10' : 'mb-1')}>
          <Image src={urlForImage(subscriberData?.logo)} alt="Picture of the author" width={150} height={150} />
        </div>

        {!actionExists && <ErrorActionDoesNotExist />}

        {gameStep === GameStep.starter && actionExists && (
          <Starter config={{ color: config?.color, actions: subscriberData?.actions }} />
        )}

        {gameStep === GameStep.launchWheel && actionExists && (
          <LaunchWheel
            config={{ color: config?.color, rewards: subscriberData?.rewards, id: subscriberData?._id }}
            sandbox
          />
        )}

        {gameStep === GameStep.result && actionExists && (
          <Result config={config} id={subscriberData?._id} companyName={subscriberData?.buyer?.companyName} sandbox />
        )}
      </div>
    </main>
  );
}

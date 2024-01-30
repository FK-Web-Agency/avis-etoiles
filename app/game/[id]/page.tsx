'use client';

import { Footer } from '@/components/game';
import { Icons } from '@/components/shared';
import { urlForImage } from '@/sanity/lib';
import { useList } from '@refinedev/core';
import Image from 'next/image';
import React from 'react';
import { z } from 'zod';

const GameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

type GameProps = z.infer<typeof GameSchema>;

export default function Game({ params: { id } }: GameProps) {
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

  const config = data?.data[0];
  console.log(config);
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
            className='min-h-[calc(100vh-2rem)]'
            >
            <header className="flex justify-center items-center">
              <Image src={urlForImage(config?.logo)} alt="Picture of the author" width={200} height={200} />
            </header>
          </main>

          <Footer color={config?.color} />
        </>
      )}
    </>
  );
}

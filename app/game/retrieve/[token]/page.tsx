'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { useList, useUpdate } from '@refinedev/core';
import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs-react';

import { Icons } from '@/components/shared';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  useToast,
} from '@/components/ui';
import { Label } from '@radix-ui/react-label';
import { calculate24HoursEnd, check24HoursPast } from '@/helper/getDate';

const RetrieveSchema = z.object({
  params: z.object({
    token: z.string(),
  }),
});

type RetrieveProps = z.infer<typeof RetrieveSchema>;

export default function Retrieve({ params: { token } }: RetrieveProps) {
  const [remainingTime, setRemainingTime] = useState<null | string>(null);
  const [textEntered, setTextEntered] = useState('');
  const { toast } = useToast();
  const tokenDecoded: any = jwtDecode(token);
  const { mutate } = useUpdate();

console.log('====================================');
console.log(tokenDecoded, 'tokenDecoded');
console.log('====================================');

  const { data, isLoading } = useList({
    resource: 'gameWinners',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: tokenDecoded?.id as string,
      },
    ],
  });

  const { data: dataConfig } = useList({
    resource: 'gameConfig',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: tokenDecoded?.id as string,
      },
    ],
  });

  console.log('====================================');
  console.log(data);
  console.log('====================================');
  const winners = data?.data[0]?.winners;
  const winner = winners?.find((winner: any) => winner.winnerEmail === tokenDecoded?.winner.email);
  const config = dataConfig?.data[0];

  useEffect(() => {
    if (winner?.createdAt) {
      setRemainingTime(check24HoursPast(winner?.createdAt));
    }
  }, [data]);

  // Verify if the winner has already retrieved his reward
  if (winner?.reward?.retrieved) {
    return (
      <main className="min-h-screen background-body">
        <div className="wrapper min-h-screen flex-center flex-col gap-8">
          <Icons.Error className="w-12 h-12 text-red-500" />
          <h1 className="p-bold-24 text-center text-red-500">
            <span className="uppercase">
              {winner.winnerFirstName} {winner.winnerLastName}{' '}
            </span>
            a déjà récupéré sa récompense
          </h1>
        </div>
      </main>
    );
  }

  // Verify if it has been 24 hours

  if (remainingTime?.includes('restantes')) {
    return (
      <main className="min-h-screen background-body">
        <div className="wrapper">
          <h1 className="p-semibold-18 text-center text-white mb-8">
            Vous devez attendre 24 heures avant de pouvoir récupérer votre récompense
          </h1>

          <p>La récompense sera disponible le {calculate24HoursEnd(winner?.createdAt)} </p>
        </div>
      </main>
    );
  }

  const handleSubmit = async function () {
    const secretCodeIsCorrect = await bcrypt.compare(textEntered, config?.secretCode);

    if (secretCodeIsCorrect)
      return toast({
        title: 'Code secret incorrect',
        description: 'Le code secret que vous avez saisi est incorrect',
        variant: 'destructive',
      });
    else {
      winner.reward.retrieved = true;
      try {
      } catch (error) {
        mutate({
          resource: 'gameWinners',
          id: data?.data[0]._id,
          values: {
            winners,
          },
        });
      }

      toast({
        title: 'Récompense récupérée',
        description: 'Vous avez récupéré votre récompense',
      });
    }
  };

  return (
    <main className="min-h-screen background-body">
      <div className="wrapper relative min-h-screen">
        {isLoading ? (
          <div className="flex-center h-screen">
            <Icons.Spinner className="animate-spin w-12 h-12 text-white" />
          </div>
        ) : (
          <>
            <h1 className="h5-bold text-center text-white">Récupération de récompense</h1>

            <div className="mt-20">
              <p className="p-bold-24 text-center">
                <span className="uppercase">
                  {winner?.winnerFirstName} {winner?.winnerLastName}{' '}
                </span>
                a gagné 1 {winner?.reward?.rewardName}
              </p>

              <Image
                className="object-cover mt-10 block mx-auto"
                src="/winner.png"
                alt="winner"
                width={400}
                height={600}
              />

              <Dialog>
                <DialogTrigger className="w-full absolute bottom-8 left-0 right-0 px-4">
                  <Button variant={'gradient'} className="w-full py-6 p-medium-18 uppercase mt-10">
                    Recuperer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="p-semibold-20">
                      Pour confirmer la récupération de la récompense merci de saissir votre code secret
                    </DialogTitle>
                    <DialogDescription>
                      <div className="mt-8">
                        <Label htmlFor="code">Code secret</Label>
                        <Input onChange={(e) => setTextEntered(e.target.value)} value={textEntered} type="password" />
                      </div>
                      <DialogClose>
                        <Button
                          onClick={handleSubmit}
                          disabled={!textEntered}
                          variant={'gradient'}
                          className="w-full py-6 p-medium-18 uppercase mt-4">
                          Confirmer
                        </Button>
                      </DialogClose>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

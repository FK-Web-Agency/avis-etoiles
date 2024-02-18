'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
  CardFooter,
  Button,
  useToast,
  Input,
} from '@/components/ui';
import { useCreate, useDelete, useList } from '@refinedev/core';
import { Icons, Spinner } from '../shared';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib';
import { uploadFileToSanity } from '@/sanity/lib/helper';
import { useState } from 'react';

export default function GameBackground() {
  const [background, setBackground] = useState<null | File>();
  const { toast } = useToast();
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_BACKGROUNDS!,
  });

  const { mutate } = useDelete();
  const { mutate: create } = useCreate();

  const backgrounds = data?.data;

  if (isLoading) return <Spinner />;

  const handleDelete = (id: string) => {
    mutate({
      resource: process.env.NEXT_PUBLIC_SANITY_GAME_BACKGROUNDS!,
      id,
    });

    toast({
      description: 'Arrière plan supprimé avec succès',
    });
  };

  const handleAction = async (e: any) => {
    e.preventDefault();

    const backgroundUpload = await uploadFileToSanity(background!);
    create({
      resource: process.env.NEXT_PUBLIC_SANITY_GAME_BACKGROUNDS!,
      values: {
        background: backgroundUpload,
      },
    });
  };

  return (
    <div className='mt-8'>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {backgrounds?.map(({ background, _id }, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      className="w-full h-full rounded"
                      src={urlForImage(background)}
                      alt="arriere plan"
                      width={400}
                      height={400}
                      objectFit="cover"
                    />
                  </CardContent>
                </Card>

                <CardFooter className="mt-4 px-0">
                  <Button onClick={() => handleDelete(_id)} variant={'destructive'}>
                    <Icons.Delete className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </CardFooter>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div>
        <h3 className="p-medium-18 text-slate-100">Télécharger un arriére plan</h3>

        <form onSubmit={handleAction}>
          <Input
            className="text-slate-100"
            type="file"
            name="background"
            id="background"
            accept="image/*"
            onChange={(e) => e?.target?.files && setBackground(e?.target?.files[0])}
          />
          <Button disabled={!background} variant="gradient" className="mt-4">
            Télécharger
          </Button>
        </form>
      </div>
    </div>
  );
}

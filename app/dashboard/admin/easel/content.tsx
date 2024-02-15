'use client';

import { useEffect, useRef, useState } from 'react';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { useDelete, useList } from '@refinedev/core';
import CompositeImage from 'composite-image';
import { Icons, Spinner } from '@/components/shared';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib';

const PREVIEW_WIDTH = 1414;
const PREVIEW_HEIGHT = 2000;

export default function Content() {
  const [easel, setEasel] = useState<null | any>();
  const [easelPreview, setEaselPreview] = useState<any>(null);
  const [subscriberSelected, setSubscriberSelected] = useState('');

  const [qrCodeConfig, setQrCodeConfig] = useState({
    x: PREVIEW_WIDTH / 2,
    y: PREVIEW_HEIGHT / 2,
    width: 200,
    height: 200,
  });
  const [logoConfig, setLogoConfig] = useState({
    x: PREVIEW_WIDTH - 400,
    y: 100,
    width: 200,
    height: 100,
  });

  const { toast } = useToast();

  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_EASEL!,
  });

  const { data: configData, isLoading: configIsLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_CONFIG!,
    filters: [
      {
        field: 'user._ref',
        operator: 'eq',
        value: subscriberSelected,
      },
    ],
  });

  const { data: subscribersData } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    filters: [
      {
        field: 'disabled',
        operator: 'eq',
        value: 'false',
      },
    ],
  });
  const { mutate } = useDelete();

  const easels = data?.data;
  const config = configData?.data?.[0];
  const subscribers = subscribersData?.data;

  useEffect(() => {
    (async () => {
      const timeout = setTimeout(() => {
        if (subscriberSelected && !config && !configIsLoading) {
          toast({
            title: 'Configuration non trouvée',
            description: "le jeu pour cet abonné n'est pas configuré",
            variant: 'destructive',
          });
        }
      }, 1500);

      if (config && easel) {
        const qrCode = urlForImage(config?.qrCode);

        // @ts-ignore
        const image = new CompositeImage({
          bgWidth: PREVIEW_WIDTH,
          bgHeight: PREVIEW_HEIGHT,
        });

        const cfg1 = {
          src: urlForImage(easel),
          x: 0,
          y: 0,
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
        };

        const cfg2 = {
          src: qrCode,
          ...qrCodeConfig,
        };

        const cfg3 = {
          src: urlForImage(config?.logo),
          ...logoConfig,
        };

        image.composite(cfg1, cfg2, cfg3).then(() => {
          fetch(image?.print())
            .then((res) => res.blob())
            .then((blob) => {
              setEaselPreview({ url: URL.createObjectURL(blob), blob: image });
            });
        });
      }
      return () => clearTimeout(timeout);
    })();

  }, [qrCodeConfig, easel, config, subscriberSelected]);

  if (isLoading) return <Spinner />;

  const handleDelete = (id: string) => {
    const askConfirmation = confirm('Voulez-vous vraiment supprimer ce chevalet ?');

    if (askConfirmation) {
      mutate({
        resource: process.env.NEXT_PUBLIC_SANITY_GAME_EASEL!,
        id,
      });

      toast({
        description: 'Chevalet supprimé avec succès',
      });
    }
  };

  const handleEaselSelected = function (easelSelected: any) {
    setEasel(easelSelected.easel);
    setQrCodeConfig({ ...easelSelected.qrcode.size, ...easelSelected.qrcode.position });
    setLogoConfig({ ...easelSelected.logo.size, ...easelSelected.logo.position });
  };

  return (
    <>
      <h1 className="h4-medium text-white mb-8">Création de Chevalet</h1>

      <div className="flex flex-col justify-center">
        {/* Select User */}
        <div className="w-full max-w-xs text-white mb-8">
          <Label className="my-4">Sélectionner un utilisateur</Label>

          <Select onValueChange={(e) => setSubscriberSelected(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choissir un abonné" />
            </SelectTrigger>
            <SelectContent>
              {subscribers?.map((subscriber, index) => (
                <SelectItem key={index} value={subscriber._id}>
                  {subscriber.companyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {subscriberSelected && config && (
          <Carousel className="w-full max-w-xs ml-8">
            <CarouselContent>
              {easels?.map(
                (easel, index) =>
                  easel.easel && (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex items-center justify-center p-6">
                            <Image
                              className="w-full h-full rounded shadow-2xl"
                              src={urlForImage(easel.easelPreview)}
                              alt="arriere plan"
                              width={400}
                              height={400}
                              objectFit="cover"
                            />
                          </CardContent>
                        </Card>

                        <CardFooter className="mt-4 px-0 flex-center gap-8">
                          <Button onClick={() => handleDelete(easel._id)} variant={'destructive'}>
                            <Icons.Delete className="w-4 h-4 mr-2" />
                            Supprimer
                          </Button>

                          <Button onClick={() => handleEaselSelected(easel)}>Sélectionner</Button>
                        </CardFooter>
                      </div>
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}

        {easel && (
          <div className="flex-center flex-justify-start gap-8">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant={'secondary'} className="w-auto sm:w-96">
                  <Icons.Eye className="w-4 h-4 mr-2" />
                  Prévisualiser
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogDescription>
                    <Image
                      src={easelPreview?.url}
                      alt="arriere plan"
                      width={400}
                      height={400}
                      objectFit="cover"
                      className="shadow-xl mx-auto"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                  <AlertDialogCancel>Fermer</AlertDialogCancel>
                  <AlertDialogAction>
                    <a href={easelPreview?.url} download={`chevalet.png`}>
                      Télécharger
                    </a>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/*       <Button>
            <Icons.Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button> */}
          </div>
        )}
      </div>
    </>
  );
}

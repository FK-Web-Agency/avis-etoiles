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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { useCreate, useDelete, useList } from '@refinedev/core';
import QRCode from 'qrcode';
import CompositeImage from 'composite-image';
import qrcode from './qrcode.png';
import { Icons, Spinner } from '../shared';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib';
import { uploadFileToSanity } from '@/sanity/lib/helper';

const PREVIEW_WIDTH = 1414;
const PREVIEW_HEIGHT = 2000;

const Settings = ({ onChange, config }: any) => {
  return (
    <div className="flex flex-col gap-8 mt-4">
      <div>
        <Label htmlFor="x">Axe X : {config.x} px</Label>
        <Input type="range" className="h-8" max={PREVIEW_WIDTH} name="x" value={config.x} onChange={onChange.x} />
      </div>

      <div>
        <Label htmlFor="y">Axe Y : {config.y} px</Label>
        <Input type="range" max={PREVIEW_HEIGHT} name="y" value={config.y} onChange={onChange.y} />
      </div>

      <div>
        <Label htmlFor="width">Largeur : {config.width} px</Label>
        <Input type="range" max={PREVIEW_WIDTH} name="width" value={config.width} onChange={onChange.width} />
      </div>

      <div>
        <Label htmlFor="height">Hauteur : {config.height} px</Label>
        <Input type="range" max={PREVIEW_HEIGHT} name="height" value={config.height} onChange={onChange.height} />
      </div>
    </div>
  );
};

export default function GameEasel() {
  const [easel, setEasel] = useState<null | File>();
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
  const [easelPreview, setEaselPreview] = useState<any>(null);

  const { toast } = useToast();
  const alertRef = useRef<any>(null);

  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_EASEL!,
  });

  const { data: generalData } = useList({
    resource: 'general',
  });

  const { mutate } = useDelete();
  const { mutate: create } = useCreate();

  const easels = data?.data;

  useEffect(() => {
    (async () => {
      if (easel) {
        const qrCode = await QRCode.toDataURL(`https://www.google.com`);

        // @ts-ignore
        const image = new CompositeImage({
          bgWidth: PREVIEW_WIDTH,
          bgHeight: PREVIEW_HEIGHT,
        });

        const cfg1 = {
          src: URL.createObjectURL(easel),
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
          src: 'https://i0.wp.com/nigoun.fr/wp-content/uploads/2022/04/placeholder.png?ssl=1',
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
    })();
  }, [qrCodeConfig, easel]);


  if (isLoading) return <Spinner />;

  const handleDelete = (id: string) => {
    mutate({
      resource: process.env.NEXT_PUBLIC_SANITY_GAME_EASEL!,
      id,
    });

    toast({
      description: 'Chevalet supprimé avec succès',
    });
  };

  const handleAction = async (e: any) => {
    e.preventDefault();
    try {
      const easelUpload = await uploadFileToSanity(easel!);

      const response = await fetch(easelPreview?.blob?.print());
      const blob = await response.blob();

      const easelPreviewUpload = await uploadFileToSanity(new File([blob], 'easel-preview.png'));
      create({
        resource: process.env.NEXT_PUBLIC_SANITY_GAME_EASEL!,
        values: {
          easel: easelUpload,
          easelPreview: easelPreviewUpload,
          logo: {
            size: {
              width: logoConfig.width,
              height: logoConfig.height,
            },
            position: {
              x: logoConfig.x,
              y: logoConfig.y,
            },
          },
          qrCode: {
            size: {
              width: qrCodeConfig.width,
              height: qrCodeConfig.height,
            },
            position: {
              x: qrCodeConfig.x,
              y: qrCodeConfig.y,
            },
          },
        },
      });

      toast({
        description: 'Chevalet créé avec succès',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const onChangeLogo = {
    x: (e: any) => setLogoConfig({ ...qrCodeConfig, x: e.target.value }),
    y: (e: any) => setLogoConfig({ ...qrCodeConfig, y: e.target.value }),
    width: (e: any) => setLogoConfig({ ...qrCodeConfig, width: e.target.value }),
    height: (e: any) => setLogoConfig({ ...qrCodeConfig, height: e.target.value }),
  };

  const onChangeQRCode = {
    x: (e: any) => setQrCodeConfig({ ...qrCodeConfig, x: e.target.value }),
    y: (e: any) => setQrCodeConfig({ ...qrCodeConfig, y: e.target.value }),
    width: (e: any) => setQrCodeConfig({ ...qrCodeConfig, width: e.target.value, height: e.target.value }),
    height: (e: any) => setQrCodeConfig({ ...qrCodeConfig, width: e.target.value, height: e.target.value }),
  };

  return (
    <div className="mt-8">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {easels?.map(
            ({ easel, _id }, index) =>
              easel && (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <Image
                          className="w-full h-full rounded"
                          src={urlForImage(easel)}
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
              )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div>
        <h3 className="p-medium-18 text-slate-100">Télécharger un chevalet</h3>
        <small className="block">Merci d'utilise un chevalet SANS QR Code</small>

        <div>
          <Input
            className="text-slate-100"
            type="file"
            name="background"
            id="background"
            accept="image/*"
            onChange={(e) => e?.target?.files && setEasel(e?.target?.files[0])}
          />
          <Button
            disabled={!easel}
            type="button"
            onClick={() => alertRef.current?.click()}
            variant="gradient"
            className="mt-4 ">
            Télécharger
          </Button>
          <AlertDialog>
            <AlertDialogTrigger className='sr-only"' ref={alertRef}>
              Open
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-y-auto h-5/6">
              <AlertDialogHeader>
                <AlertDialogTitle>Emplace du QR sur le chevalet</AlertDialogTitle>
                <AlertDialogDescription>
                  {easelPreview && (
                    <div>
                      <Image
                        className="w-full h-full rounded max-w-80"
                        src={easelPreview?.url!}
                        alt="arriere plan"
                        width={400}
                        height={400}
                        objectFit="cover"
                      />
                      <Tabs defaultValue="logo" className="w-[400px] mt-4 max-w-80">
                        <TabsList>
                          <TabsTrigger value="logo">Logo</TabsTrigger>
                          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="logo">
                          <Settings key={'1'} onChange={onChangeLogo} config={logoConfig} />
                        </TabsContent>
                        <TabsContent value="qrcode">
                          <Settings key={'2'} onChange={onChangeQRCode} config={qrCodeConfig} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleAction} type="submit">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

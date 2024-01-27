'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { useList } from '@refinedev/core';
import CompositeImage from 'composite-image';

import { Button, Dialog, DialogContent, DialogTrigger, Skeleton, useToast } from '@/components/ui';
import { urlForImage } from '@/sanity/lib';
import { classNames } from '@/helper';
import { Icons } from '@/components/shared';
import { useOnboardingStore } from '@/store';

const PREVIEW_WIDTH = 1414;
const PREVIEW_HEIGHT = 2000;

export default function GenerateQRCode() {
  const [qrCode, setQrCode] = useState<null | string>();
  const [preview, setPreview] = useState<null | { print: () => string; download: (name: string) => void }>(null);
  const [easelSelected, setEaselSelected] = useState<null | number>(0);
  const { toast } = useToast();

  const { userIds, setGameConfig } = useOnboardingStore();

  const { data, isLoading } = useList({
    resource: 'gameEasel',
  });
  const easels = data?.data;

  useEffect(() => {
    (async () => {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_LOCALHOST_URL
          : process.env.NEXT_PUBLIC_BASE_URL;

      const qrCode = await QRCode.toDataURL(`${baseUrl}/game/${userIds?.sanityId}`);

      setQrCode(qrCode);
    })();
  }, []);

  useEffect(() => {
    if (easels) {
      console.log(data.data[0]);

      // @ts-ignore
      const image = new CompositeImage({
        bgWidth: PREVIEW_WIDTH,
        bgHeight: PREVIEW_HEIGHT,
      });

      const cfg1 = {
        src: urlForImage(easels[easelSelected || 0].easel),
        x: 0,
        y: 0,
        width: PREVIEW_WIDTH,
        height: PREVIEW_HEIGHT,
      };

      const cfg2 = {
        src: qrCode,
        x: easels[easelSelected || 0].qrcode.position.x,
        y: easels[easelSelected || 0].qrcode.position.y,
        width: easels[easelSelected || 0].qrcode.size.width,
        height: easels[easelSelected || 0].qrcode.size.height,
      };

      image.composite(cfg1, cfg2).then(() => {
        setPreview(image);
      });
    }
  }, [easels, easelSelected]);

  if (!qrCode) return null;

  const handleSave = function () {
    if (!preview)
      return toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la génération de votre image',
        variant: 'destructive',
      });
    try {
      // Get the dataURL of the image
      fetch(preview?.print())
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });
          setGameConfig({ easel: file });
        });

      fetch(qrCode)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });
          setGameConfig({ qrCode: file });
        });

      toast({
        description: 'Votre chevalet a été mis à jour',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-start">
        <Image src={qrCode} alt="QR Code" className="shadow" width={200} height={200} />
        <Button asChild variant={'secondary'}>
          <a href={qrCode} download="qrcode.png">
            Télécharger
          </a>
        </Button>
      </div>

      <div className="mt-8">
        <h4 className="p-semibold-14 mb-4">Choissisez un chevalet</h4>
        <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="w-52 h-52" />)
            : easels?.map(({ easel }, index) => (
                <Image
                  key={index}
                  onClick={() => setEaselSelected(index)}
                  src={urlForImage(easel)}
                  className={classNames(
                    'shadow-xl rounded-lg w-full h-auto',
                    easelSelected === index
                      ? 'ring-2 ring-primary opacity-100'
                      : 'opacity-70 hover:opacity-100 transition-opacity'
                  )}
                  alt="QR Code"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority
                />
              ))}
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Dialog>
            <DialogTrigger>
              <Button variant="secondary">
                <Icons.Eye className="w-4 h-4 mr-2" />
                Aperçu
              </Button>
            </DialogTrigger>

            <DialogContent className="pt-10">
              {preview?.print && (
                <Image
                  src={preview?.print()}
                  className="w-full h-full object-cover shadow-xl"
                  alt="QR Code"
                  width={200}
                  height={200}
                  priority
                />
              )}
            </DialogContent>
          </Dialog>

          <Button onClick={() => preview?.download('chelavet.png')} variant="secondary">
            <Icons.Disc className="w-4 h-4 mr-2" />
            Télécharger
          </Button>

          <Button onClick={handleSave} variant="secondary">
            Confirmer
          </Button>
        </div>
      </div>
    </div>
  );
}

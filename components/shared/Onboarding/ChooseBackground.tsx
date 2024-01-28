import { useRef, useState } from 'react';
import { useList } from '@refinedev/core';
import Image from 'next/image';

import { urlForImage } from '@/sanity/lib';
import { Image as ImageSanity } from 'sanity';
import { Button, Input, Label, Skeleton, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import { classNames } from '@/helper';
import { z } from 'zod';

type ChooseBackgroundProps = {
  onSave?: (file: File) => void;
  background?: ImageSanity;
};

export default function ChooseBackground({ onSave, background }: ChooseBackgroundProps) {
  const [backgroundSelected, setBackgroundSelected] = useState<null | number>(null);
  const { setGameConfig, setStep } = useOnboardingStore();
  const { toast } = useToast();
  const { data, isLoading } = useList({ resource: 'gameBackgrounds' });

  const imageRef = useRef<HTMLInputElement>(null);

  const backgrounds = data?.data;

  const handleBackgroundSelected = (index: number) => setBackgroundSelected(index);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let file;

    try {
      if (imageRef?.current?.files && imageRef?.current?.files?.length > 0) {
        file = imageRef.current.files[0];

        if (onSave) return onSave(file as File);

        setGameConfig({ background: file });

        toast({
          description: 'Votre arrière plan a été mis à jour',
        });
      } else {
        if (backgrounds) {
          fetch(urlForImage(backgrounds[backgroundSelected as number].background))
            .then((response) => response.blob())
            .then((blob) => {
              file = new File([blob], 'background.jpg', { type: 'image/jpeg' });

              console.log(file);
              if (onSave) return onSave(file as File);
              // Now you can use `file` as a File object
              setGameConfig({ background: file });
            });
        }
      }

      // Next Step
      setStep('chooseColor');
    } catch (error: any) {
      console.log(error);

      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  console.log(imageRef?.current?.files);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-center flex-align-start flex-col gap-5">
        {background && (
          <div  className='mb-8 w-full'>
            <p>Arrière plan choissi :</p>
            <Image
              src={urlForImage(background!)}
              alt="Image"
              width={200}
              height={200}
              className="w-full h-32 object-cover rounded-xl"
            />
          </div>
        )}
        <div>
          <p>Choissir :</p>
          <div className="flex items-center min-[525px]:justify-start flex-wrap gap-5">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton className="rounded-md object-cover w-full h-28" key={index} />
                ))
              : backgrounds?.map(({ background }, index) => (
                  <Image
                    key={`image-${index}`}
                    onClick={() => handleBackgroundSelected(index)}
                    src={urlForImage(background)}
                    alt="Image"
                    className={classNames(
                      'rounded-md object-cover w-32 min-[525px]:w-48 h-28',
                      backgroundSelected === index && imageRef?.current?.files?.length === 0 && 'ring-2 ring-primary'
                    )}
                    width={200}
                    height={200}
                  />
                ))}
          </div>
        </div>

        <div>
          <Label>Télécharger votre arrière plan</Label>
          <Input ref={imageRef} type="file" accept="image/*" />
        </div>

        <Button type="submit" variant={'gradient'}>
          Confirmer
        </Button>
      </div>
    </form>
  );
}

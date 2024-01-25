import { useRef, useState } from 'react';
import { useList } from '@refinedev/core';
import Image from 'next/image';

import {  urlForImage } from '@/sanity/lib';
import { Input, Label, Skeleton, useToast } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import { classNames } from '@/helper';

export default function ChooseBackground() {
  const [backgroundSelected, setBackgroundSelected] = useState<null | number>(null);
  const { toast } = useToast();
  const { setGameConfig, setStep } = useOnboardingStore();
  const { data, isLoading } = useList({ resource: 'gameBackgrounds' });

  const imageRef = useRef<HTMLInputElement>(null);

  const backgrounds = data?.data;

  const handleBackgroundSelected = (index: number) => setBackgroundSelected(index);

  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (imageRef?.current?.files) {
        const file = imageRef.current.files[0];
        setGameConfig({ background: file });

        toast({
          description: 'Votre arrière plan a été mis à jour',
        });

        // Next Step
        setStep('chooseColor');
      } else {
        if (backgrounds) {
          fetch(backgrounds[backgroundSelected as number].asset._ref)
            .then((response) => response.blob())
            .then((blob) => {
              const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });
              // Now you can use `file` as a File object
              setGameConfig({ background: file });
            });
        }
      }
    } catch (error: any) {
      console.log(error);

      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-center flex-align-start flex-col gap-5">
        <div>
          <p>Choissir :</p>
          <div className="flex items-center gap-5">
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
                      'rounded-md object-cover w-full h-28',
                      backgroundSelected === index && 'ring-2 ring-primary'
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
      </div>
    </form>
  );
}

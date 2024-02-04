'use client';

import { useState } from 'react';
import { z } from 'zod';
import { AutoForm, AutoFormSubmit, Button, Input, Label, useToast } from '../ui';
import { uploadFileToSanity } from '@/sanity/lib/helper';
import { useCreate, useList } from '@refinedev/core';
import { formatDate, formatToISOString } from '@/helper';
import { Spinner } from '../shared';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale/fr';

const MutualGiftSchema = z.object({
  title: z.string(),
  startDate: z.date().describe('Date de début'),
  endDate: z.date().describe('Date de fin'),
  //description: z.string(),
});

type MutualGiftProps = z.infer<typeof MutualGiftSchema>;

export default function MutualGift() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [winner, setWinner] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { mutate } = useCreate();
  const dateOptions = {
    addSuffix: true,
    locale: fr,
  };
  const { data, isLoading } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_MUTUAL_REWARD!,
  });
  const mutualGifts = data?.data[0];

  const { data: dataWinners } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_GAME_WINNERS!,
  });

  const winners = dataWinners?.data;

  const participants = winners?.map((item) => {
    if (mutualGifts) {
      const participantsValid = item.winners.filter((participant: any) => {
        const startDate = parseISO(mutualGifts?.startDate);
        const endDate = parseISO(mutualGifts?.endDate);
        const createdAt = new Date(participant.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });
      console.log(participantsValid);
    }
  });

  const handleLotteryDraw = () => {
    if (participants && participants?.length > 0) {
      const winner = participants[Math.floor(Math.random() * participants.length)];
      setWinner(winner);

      // TODO - send email to winner
    }
  };

  const handleShowForm = () => setShowForm(!showForm);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async (values: MutualGiftProps) => {
    if (!photo) return alert('Veuillez choisir une photo');

    const image = await uploadFileToSanity(photo);

    try {
      const startDate = formatToISOString(values?.startDate);
      const endDate = formatToISOString(values?.endDate);
      mutate({
        resource: process.env.NEXT_PUBLIC_SANITY_MUTUAL_REWARD!,
        values: {
          ...values,
          startDate,
          endDate,
          image,
        },
      });

      toast({
        description: 'Cadeau mutualisé créé avec succès',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) return <Spinner />;

  const dayBetween = formatDistanceToNow(new Date(mutualGifts?.endDate), dateOptions);

  const canLotteryDraw = !dayBetween.includes('dans');

  return (
    <div>
      {mutualGifts && !showForm ? (
        <div className="mt-8">
          <h3 className="p-medium-20 text-slate-100">{mutualGifts.title} </h3>
          <p className="p-medium-14">
            Debut: {formatDate(mutualGifts.startDate)}
            <br />
            fin : {formatDate(mutualGifts.endDate)}
          </p>

          <Image
            className="object-cover mt-8 rounded shadow-xl w-80 h-auto"
            src={urlForImage(mutualGifts.image)}
            alt="cadeau mutuel"
            width={200}
            height={200}
            priority
          />

          <div className="flex items-center gap-4 mt-8">
            <Button disabled={!canLotteryDraw} onClick={handleLotteryDraw} variant={'gradient'}>
              Tirer au sort
            </Button>

            <Button onClick={handleShowForm} variant={'secondary'}>
              Créer un nouveau cadeau mutualisé
            </Button>
          </div>
        </div>
      ) : (
        <AutoForm className="text-slate-100 mt-8" onSubmit={handleSubmit} formSchema={MutualGiftSchema}>
          <div>
            <Label htmlFor="photo">Photo</Label>
            <Input className="mt-4" accept="image/*" type="file" id="photo" onChange={handlePhotoChange} />
          </div>


          <div className='flex items-center gap-4'>

          <AutoFormSubmit>Crée le cadeau mutualisé</AutoFormSubmit>
          {mutualGifts && <Button onClick={handleShowForm} variant={"destructive"}>
            Annuler
          </Button>}
          </div>
        </AutoForm>
      )}
    </div>
  );
}

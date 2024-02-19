'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import QRCode from 'qrcode';

import {
  AutoForm,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useToast,
} from '../ui';
import { classNames, colorIsLight } from '@/helper';
import { useList, useOne, useUpdate } from '@refinedev/core';
import { PortableText } from '@portabletext/react';
import { encodedValue } from '@/lib/actions/jwt.actions';
import { useGameStore } from '@/store';
import sendEmail from '@/lib/actions/resend.actions';
import { Icons } from '../shared';
import { uploadFileToSanity } from '@/sanity/lib/helper';
import { urlForImage } from '@/sanity/lib';

const WinnerFormSchema = z.object({
  winnerFirstName: z.string().describe('Prénom'),
  winnerLastName: z.string().describe('Nom'),
  winnerEmail: z.string().email().describe('Email'),
  winnerPhone: z.string().describe('Numero de téléphone'),
  winnerZipAddress: z.string().describe('Code postal'),
  accepterLesConditions: z
    .boolean()
    .describe('Accept terms and conditions.')
    .refine((value) => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms'],
    }),
});

export default function WinnerForm({ color, id, formCompleted }: { color: any; id: string; formCompleted: any }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { result } = useGameStore();
  const { data } = useList({
    resource: 'general',
  });

  const { data: userData } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
    id,
  });

  const { data: winnersData } = useList({
    resource: 'gameWinners',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: id,
      },
    ],
  });

  const { mutate } = useUpdate();

  const allDataWinner = winnersData?.data[0];
  const winners = allDataWinner?.winners;

  const handleAction = async function (values: any) {
    setLoading(true);
    const winner: any = {
      firstName: values.winnerFirstName,
      lastName: values.winnerLastName,
      email: values.winnerEmail,
      phone: values.winnerPhone,
      zipAddress: values.winnerZipAddress,
      createAt: new Date(),
      reward: {
        rewardName: result,
        retrieve: false,
      },
    };

    const baseUrl =
      process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCALHOST_URL : process.env.NEXT_PUBLIC_BASE_URL;
    const token = await encodedValue({ id: allDataWinner?._id, winner });
    const qrCode = await QRCode.toDataURL(`${baseUrl}/game/retrieve/${token}`);

    const response = await fetch(qrCode);
    const blob = await response.blob();
    const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });

    const qrCodeUpload = await uploadFileToSanity(file);

    try {
      const valuesWithoutAcceptTerms = { ...values, qrCode: qrCodeUpload };
      delete valuesWithoutAcceptTerms.accepterLesConditions;

      winners.push(valuesWithoutAcceptTerms);

      mutate({
        resource: 'gameWinners',
        id: allDataWinner?._id,
        values: {
          winners: winners,
        },
        successNotification: (data, values: any, resource) => {
          const winnerWithQRCode = values?.values?.winners?.find(
            (winner: any) => winner.qrCode?.asset?._ref === qrCodeUpload?.asset?._ref
          );

          console.log(winnerWithQRCode, 'winnerWithQRCode');

          sendEmail({
            ...winner,
            subject: 'Votre lot est prêt',
            emailTemplate: 'winner',
            address: userData?.data?.address,
            ownerName: userData?.data?.companyName,
            QRCode: urlForImage(winnerWithQRCode?.qrCode),
          }).then(() => {
            console.log('Email sent');
          });
          return {
            message: ``,
            description: '',
            type: 'success',
          };
        },
      });

      toast({
        description: 'Votre lot est prêt, vous allez recevoir un email avec votre QR Code',
      });

      setLoading(false);
      formCompleted();
    } catch (error) {
      console.log(error, 'error');

      setLoading(false);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue, veuillez réessayer plus tard',
        variant: 'destructive',
      });
    }
  };

  return (
    <AutoForm
      onAction={handleAction}
      formSchema={WinnerFormSchema}
      fieldConfig={{
        accepterLesConditions: {
          inputProps: {
            required: true,
          },
          // You can use JSX in the description
          description: (
            <>
              En sélectionnant ceci, vous acceptez notre{' '}
              <Dialog>
                <DialogTrigger>
                  <span className="hover:underline cursor-pointer underline text-yellow-400">
                    politique de confidentialité
                  </span>
                </DialogTrigger>
                <DialogContent className="max-h-screen mt-10 overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Politique de confidentialité</DialogTitle>
                    <DialogDescription>
                    {data?.data[0]?.privacyPolicy.content &&  <PortableText value={data?.data[0]?.privacyPolicy.content} />}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              .
            </>
          ),
        },
      }}>
      <Button
        type="submit"
        disabled={loading}
        style={{ backgroundColor: color }}
        className={classNames(colorIsLight(color) ? 'text-back' : 'text-white')}>
        {loading && <Icons.Spinner className={classNames(loading ? 'animate-spin w-4 h-4 mr-2' : 'hidden')} />}
        Confirmer
      </Button>
    </AutoForm>
  );
}

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
import { client, urlForImage } from '@/sanity/lib';
import { kv } from '@vercel/kv';
import { setWinner } from '@/lib/actions/kv.actions';

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

export default function WinnerForm({
  color,
  id,
  formCompleted,
  companyName,
}: {
  color: any;
  id: string;
  formCompleted: any;
  companyName?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { result } = useGameStore();
  const { data } = useList({
    resource: 'general',
  });

  const { data: subscriber } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_SANDBOX!,
    id,
  });
  const { mutate } = useUpdate();

  const subscriberData = subscriber?.data;

  const handleAction = async function (values: any) {
    setLoading(true);
    const winner: any = {
      firstName: values.winnerFirstName,
      lastName: values.winnerLastName,
      email: values.winnerEmail,
      phone: values.winnerPhone,
      zipAddress: values.winnerZipAddress,
      createdAt: new Date(),
      reward: {
        rewardName: result,
        retrieve: false,
      },
    };

    const baseUrl =
      process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_LOCALHOST_URL : process.env.NEXT_PUBLIC_BASE_URL;
    const token = await encodedValue({ id, winner });

    const qrCode = await QRCode.toDataURL(`${baseUrl}/game/sandbox/retrieve/${token}`);

    const response = await fetch(qrCode);
    const blob = await response.blob();
    const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });

    const document = await client.assets.upload('image', file);

    try {
      const valuesWithoutAcceptTerms = { ...values, qrCode: document };
      delete valuesWithoutAcceptTerms.accepterLesConditions;

      const winnerData = {
        ...valuesWithoutAcceptTerms,
        createdAt: new Date(),
        reward: {
          rewardName: result,
          retrieved: false,
        },
      };

      delete winnerData.qrCode;

      mutate({
        resource: process.env.NEXT_PUBLIC_SANITY_SANDBOX!,
        id,
        values: {
          winners: subscriberData?.winners ? [...subscriberData?.winners, winnerData] : [winnerData],
        },
      });

      await sendEmail({
        ...winner,
        subject: 'Votre lot est prêt',
        emailTemplate: 'winner',

        ownerName: companyName,
        QRCode: urlForImage(document),
      });

      toast({
        description: 'Votre lot est prêt, vous allez recevoir un email avec votre QR Code',
      });

      setLoading(false);
      formCompleted();
    } catch (error: any) {
      setLoading(false);

      toast({
        title: 'Erreur',
        description: error.message,
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
                      <PortableText value={data?.data[0]?.privacyPolicy.content} />
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

'use client';
import QRCode from 'qrcode';

import Image from 'next/image';
import { AutoForm, AutoFormSubmit, Button } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import { useEffect, useState } from 'react';
import { Spinner } from '@/components/shared';
import { z } from 'zod';

const FormSchema = z.object({
  email: z.string().email(),
  companyName: z.string(),
});

export default function GenerateQRCode({ onSave, sandbox }: any) {
  const [qrCode, setQrCode] = useState<null | string>();
  const [buyerCompanyName, setBuyerCompanyName] = useState<string | null>(null);
  const { userIds, setGameConfig, setBuyer } = useOnboardingStore();

  useEffect(() => {
    (async () => {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_LOCALHOST_URL
          : process.env.NEXT_PUBLIC_BASE_URL;

      let qrCode;

      if (sandbox) {
        qrCode = await QRCode.toDataURL(`${baseUrl}/game/${buyerCompanyName}?sandbox=true`);
      } else {
        qrCode = await QRCode.toDataURL(`${baseUrl}/game/${userIds?.sanityId}`);
      }

      fetch(qrCode)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });
          setGameConfig({ qrCode: file });
        });

      setQrCode(qrCode);
    })();
  }, [buyerCompanyName]);

  if (!qrCode) return <Spinner />;

  return (
    <div className="flex flex-col gap-2 items-center sm:items-start ">
      {sandbox && (
        <AutoForm
          onSubmit={(values) => {
            setBuyerCompanyName(values.companyName);
            setBuyer({ email: values.email, companyName: values.companyName });
          }}
          formSchema={FormSchema}>
          <AutoFormSubmit>Confirmer</AutoFormSubmit>
        </AutoForm>
      )}
      {sandbox && buyerCompanyName && (
        <>
          <Image src={qrCode!} alt="QR Code" className="shadow" width={200} height={200} />
          <Button asChild variant={'secondary'}>
            <a href={qrCode!} download="qrcode.png">
              Télécharger
            </a>
          </Button>
        </>
      )}

      {!sandbox && (
        <>
          <Image src={qrCode!} alt="QR Code" className="shadow" width={200} height={200} />
          <Button asChild variant={'secondary'}>
            <a href={qrCode!} download="qrcode.png">
              Télécharger
            </a>
          </Button>
        </>
      )}
    </div>
  );
}

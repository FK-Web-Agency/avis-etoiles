'use client';
import QRCode from 'qrcode';

import Image from 'next/image';
import { Button } from '@/components/ui';
import { useOnboardingStore } from '@/store';
import { useEffect, useState } from 'react';
import { Spinner } from '..';

export default function GenerateQRCode({ onSave }: any) {
  const [qrCode, setQrCode] = useState<null | string>();

  const { userIds, setGameConfig } = useOnboardingStore();

  useEffect(() => {
    (async () => {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_LOCALHOST_URL
          : process.env.NEXT_PUBLIC_BASE_URL;

      const qrCode = await QRCode.toDataURL(`${baseUrl}/game/${userIds?.sanityId}`);

      fetch(qrCode)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'background.jpg', { type: 'image/jpeg' });
          setGameConfig({ qrCode: file });
        });

      setQrCode(qrCode);
    })();
  }, []);

  if (!qrCode) return <Spinner />;

  return (
    <div className="flex flex-col gap-2 items-center sm:items-start ">
      <Image src={qrCode!} alt="QR Code" className="shadow" width={200} height={200} />
      <Button asChild variant={'secondary'}>
        <a href={qrCode!} download="qrcode.png">
          Télécharger
        </a>
      </Button>
    </div>
  );
}

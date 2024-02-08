'use client';

import { useToast } from "@/components/ui";
import { useOnboardingStore } from "@/store";
import { useOne, useList } from "@refinedev/core";
import { useState } from "react";

export default function GenerateQRCode({onSave}:any) {
  const [qrCode, setQrCode] = useState<null | string>();
  const [preview, setPreview] = useState<null | { print: () => string; download: (name: string) => void }>(null);
  const [easelSelected, setEaselSelected] = useState<null | number>(0);
  const { toast } = useToast();

  const { userIds, setGameConfig } = useOnboardingStore();

  const { data, isLoading } = useList({
    resource: 'gameEasel',
  });

  const { data: userConfig } = useOne({
    resource: 'gameConfig',
    id: userIds?.sanityId,
  });

  const easels = data?.data;
  return (
    <div>GenerateQRCode</div>
  )
}

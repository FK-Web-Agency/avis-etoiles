'use client';

import ChooseActions from '@/components/shared/Onboarding/ChooseActions';
import ChooseBackground from '@/components/shared/Onboarding/ChooseBackground';
import ChooseColor from '@/components/shared/Onboarding/ChooseColor';
import ChooseNumberWinners from '@/components/shared/Onboarding/ChooseNumberWinners';
import ChooseRewards from '@/components/shared/Onboarding/ChooseRewards';
import ChooseSecretCode from '@/components/shared/Onboarding/ChooseSecretCode';
import GenerateQRCode from '@/components/shared/Onboarding/GenerateQRCode';
import UploadLogo from '@/components/shared/Onboarding/UploadLogo';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast,
} from '@/components/ui';
import { uploadFileToSanity } from '@/sanity/lib/helper';
import { useDashboardStore } from '@/store';
import { useList, useUpdate } from '@refinedev/core';

export default function Content() {
  const { toast } = useToast();
  const { userIds } = useDashboardStore();
  const { mutate } = useUpdate();

  const { data } = useList({
    resource: 'gameConfig',
    filters: [
      {
        field: 'user._ref',
        operator: 'contains',
        value: userIds?.sanityId,
      },
    ],
  });

  const updateGameConfig = (values: object) => {
    try {
      mutate({
        resource: 'gameConfig',
        id: data?.data[0]._id,
        values,
      });

      toast({
        description: 'Les modifications ont été enregistrées',
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const onSaveLogo = async (file: File) => {
    const doc = await uploadFileToSanity(file);
    updateGameConfig({
      logo: doc!,
    });

    //   const saveFile = await saveBackground({ id: data?.data[0]._id, background: doc! });
  };

  const onSaveBackground = async (file: File) => {
    const doc = await uploadFileToSanity(file);
    updateGameConfig({
      background: doc!,
    });

    //   const saveFile = await saveBackground({ id: data?.data[0]._id, background: doc! });
  };

  const onSaveColor = (color: string) =>
    updateGameConfig({
      color,
    });

  const onSaveRewards = (rewards: string[]) => updateGameConfig({ rewards });
  const onSaveActions = (
    actions: { _key?: string; socialNetworkName: string; value: string }[]
  ) => updateGameConfig({ actions });

  const onSaveSecretCode = (secretCode: string) =>
    updateGameConfig({ secretCode });

  const onSaveNumbersOfWinners = (winners: {
    numberWinners: { winners: number; attempts: number };
  }) => updateGameConfig(winners);

  const onSaveEasel = async (file: File) => {
    const doc = await uploadFileToSanity(file);
    updateGameConfig({
      easel: doc!,
    });
  };

  const gameConfig = data && data?.data[0];

  return (
    <main>
      <Tabs defaultValue="logo" className="max-w-[700px]">
        <TabsList className="flex-wrap h-min w-full">
          <TabsTrigger value="logo">Logo</TabsTrigger>
          {/*           <TabsTrigger value="background">Arriére plan</TabsTrigger>
          <TabsTrigger value="color">Couleur</TabsTrigger> */}
          <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="numOfWinners">Nombre de gagnants</TabsTrigger>
          <TabsTrigger value="secretCode">Code secret</TabsTrigger>
          <TabsTrigger value="easelAndQrcode">QR Code</TabsTrigger>
        </TabsList>

        <TabsContent
          className="bg-muted p-4 rounded-xl max-w-[700px]"
          value="logo">
          <UploadLogo onSave={onSaveLogo} logo={gameConfig?.logo} />
        </TabsContent>
        <TabsContent className="bg-muted p-4 rounded-xl" value="background">
          <ChooseBackground
            onSave={onSaveBackground}
            background={gameConfig?.background}
          />
        </TabsContent>
        <TabsContent className="bg-muted p-4 rounded-xl" value="color">
          <ChooseColor onSave={onSaveColor} colorDb={gameConfig?.color} />
        </TabsContent>
        <TabsContent className="bg-muted p-4 rounded-xl" value="rewards">
          <ChooseRewards
            onSave={onSaveRewards}
            rewardsDb={gameConfig?.rewards}
          />
        </TabsContent>
        <TabsContent className="bg-muted p-4 rounded-xl" value="actions">
          <ChooseActions
            onSave={onSaveActions}
            actionsDb={gameConfig?.actions}
          />
        </TabsContent>

        <TabsContent className="bg-muted p-4 rounded-xl" value="secretCode">
          <ChooseSecretCode onSave={onSaveSecretCode} />
        </TabsContent>

        <TabsContent className="bg-muted p-4 rounded-xl" value="numOfWinners">
          <ChooseNumberWinners onSave={onSaveNumbersOfWinners} />
        </TabsContent>
        <TabsContent className="bg-muted p-4 rounded-xl" value="easelAndQrcode">
          <GenerateQRCode onSave={onSaveEasel} easel={gameConfig?.easel} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

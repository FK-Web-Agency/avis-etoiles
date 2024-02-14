import { GameBackground, GameEasel, MutualGift } from '@/components/dashboard';
import { Icons } from '@/components/shared';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

/* 
1- Creer un cadeau mutuel
2 - Créer un background
3 - Créer un chevalet
*/

export default function Content() {
  const tabs = [
    { id: 1, name: 'Cadeau Mutualisé', Icon: Icons.GiftMutual, Content: MutualGift },
//    { id: 2, name: 'Arrière Plan', Icon: Icons.Images, Content: GameBackground },
    { id: 3, name: 'Chevalet', Icon: Icons.Easel, Content: GameEasel },
  ];

  return (
    <>
      <h1 className="h4-medium text-white mb-8">Paramétres du jeu</h1>

      <Tabs defaultValue={tabs[0].name} className="w-full flex-center flex-items-start flex-col sm:justify-start">
        <TabsList className="h-min w-[70vw] grid justify-center items-center sm:w-96 sm:flex sm:justify-between sm:items-start bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          {tabs.map((tab) => (
            <TabsTrigger className="flex-center flex-col gap-2 w-52" key={tab.id} value={tab.name}>
              <tab.Icon className="w-6 h-6" />
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.name}>
            <tab.Content />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

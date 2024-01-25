import { Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import Link from 'next/link';
import { z } from 'zod';
import { Icons } from '@/components/shared';
import { useState } from 'react';

const actionsList = [
  {
    title: 'google',
    Icon: Icons.Google,
    Description: () => (
      <small>
        Utilise l'outil{' '}
        <Link
          className="text-primary hover:text-primary-foreground"
          href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
          target="_blank">
          Google Place ID Finder
        </Link>
        . Sur cette page, vous peuvez rechercher le lieu dans la barre de recherche intégrée et l'outil te fournira le
        Place ID correspondant. Il suffit de saisir le nom du lieu ou son adresse, et l'outil affichera le lieu avec son
        Place ID que vous peuvez facilement copier
      </small>
    ),
    placeholder: 'Entrez votre Place ID',
    label: 'Place ID',
  },
  {
    title: 'instagram',
    Icon: Icons.Instagram,
    Description: () => <small>Renseigner l'URL de votre compte Instagram</small>,
    placeholder: 'Entrez votre URL',
    label: 'URL profile Instagram',
  },
];

export default function ChooseActions() {
  const [actions, setActions] = useState(actionsList);
  const [textEntered, setTextEntered] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextEntered(e.target.value);

  return (
    <div>
      <Tabs defaultValue="google">
        <TabsList className="bg-transparent mb-8">
          {actions.map((action, index) => (
            <TabsTrigger key={index} value={action.title}>
              <Label
                htmlFor={action.title}
                className="flex flex-col items-center justify-between rounded-md  p-4 hover:text-accent-foreground">
                <action.Icon className="w-8 h-8" />
                {action.title}
              </Label>
            </TabsTrigger>
          ))}
        </TabsList>

        {actions.map((action, index) => (
          <TabsContent key={index} value={action.title}>
            <action.Description />

            <div>
              <Label htmlFor={action.title}>{action.label}</Label>
              <Input
                id={action.title}
                type="text"
                placeholder={action.placeholder}
                value={textEntered}
                onChange={handleChange}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

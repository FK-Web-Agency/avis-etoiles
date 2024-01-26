import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';

import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
import { Icons } from '@/components/shared';
import { classNames } from '@/helper';
import { useOnboardingStore } from '@/store';

// Define the schema for an action
const actionSchema = z.object({
  title: z.string(),
  Icon: z.any(),
  Description: z.any(),
  placeholder: z.string(),
  label: z.string(),
  value: z.string().optional(),
});

// Infer the type of an action from the schema
type Action = z.infer<typeof actionSchema>;

type ActionFromConfig = { socialNetworkName: string; value: string };

// Define a list of actions
const actionsList: Action[] = [
  {
    title: 'google',
    Icon: Icons.Google,
    Description: () => (
      <small>
        Use the{' '}
        <Link
          className="text-primary hover:text-primary-foreground"
          href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
          target="_blank">
          Google Place ID Finder
        </Link>
        . On this page, you can search for the location in the integrated search bar and the tool will provide you with
        the corresponding Place ID. Simply enter the name or address of the location, and the tool will display the
        location with its Place ID that you can easily copy.
      </small>
    ),
    placeholder: 'Enter your Place ID',
    label: 'Place ID',
    value: undefined,
  },
  {
    title: 'instagram',
    Icon: Icons.Instagram,
    Description: () => <small>Enter the URL of your Instagram account</small>,
    placeholder: 'Enter your URL',
    label: 'Instagram Profile URL',
    value: undefined,
  },
  {
    title: 'facebook',
    Icon: Icons.Facebook,
    Description: () => <small>Enter the URL of your Facebook account</small>,
    placeholder: 'Enter your URL',
    label: 'Facebook Profile URL',
    value: undefined,
  },
];

export default function ChooseActions() {
  const [actions, setActions] = useState<Action[]>(actionsList);
  const [textEntered, setTextEntered] = useState('');
  const { gameConfig, setGameConfig, setStep } = useOnboardingStore();
  const { toast } = useToast();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextEntered(e.target.value);

  // Handle adding an action
  const handleAddAction = function (action: Action) {
    setActions((prevActions) => {
      const newActions = [...prevActions];
      const index = newActions.findIndex((a) => a.title === action.title);
      newActions[index].value = textEntered;
      return newActions;
    });

    setTextEntered('');
  };

  // Handle editing an action
  const handleEditAction = function (action: Action) {
    const editText = prompt('Enter your modification', action.value);

    if (!editText)
      return toast({
        title: 'Error',
        description: 'You must enter text',
        variant: 'destructive',
      });

    setActions((prevActions) => {
      const newActions = [...prevActions];
      const index = newActions.findIndex((a) => a.title === action.title);
      newActions[index].value = editText;
      return newActions;
    });

    toast({
      description: 'Modification saved',
    });
  };

  // Handle deleting an action
  const handleDeleteAction = function (action: Action) {
    const askConfirmation = confirm('Are you sure you want to delete this action?');
    if (!askConfirmation) return;

    setActions((prevActions) => {
      const newActions = [...prevActions];
      const index = newActions.findIndex((a) => a.title === action.title);
      newActions[index].value = undefined;
      return newActions;
    });

    toast({
      description: 'Action deleted',
    });
  };

  // Handle form submission
  const handleSubmit = function () {
    const actionsWithValues = actions.filter((action) => action.value);

    const socialNetworkData = actionsWithValues.map((action) => ({
      socialNetworkName: action.title,
      value: action.value as string,
    }));

    setGameConfig({ actions: socialNetworkData });

    toast({
      description: 'Les actions ont été enregistrées',
    });

    setStep('chooseNumberWinners');
  };

  return (
    <div>
      <Tabs className="mt-5" defaultValue="google">
        <TabsList className="bg-transparent mb-8">
          {actions.map((action, index) => {
            const config: ActionFromConfig[] | undefined = gameConfig?.actions?.filter(
              (a) => a.socialNetworkName === action.title
            );

            return (
              <TabsTrigger
                className={classNames(
                  action.value || (config && config?.length > 0)
                    ? 'data-[state=active]:border-emerald-500 data-[state=active]:border-2 data-[state=active]:shadow-emerald-300'
                    : null
                )}
                key={index}
                value={action.title}>
                <Label
                  htmlFor={action.title}
                  className="flex flex-col items-center justify-between rounded-md  p-4 hover:text-accent-foreground">
                  <action.Icon className="w-8 h-8" />
                  {action.title}
                </Label>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {actions.map((action, index) => {
          const config: ActionFromConfig[] | undefined = gameConfig?.actions?.filter(
            (a) => a.socialNetworkName === action.title
          );

          return (
            <TabsContent key={index} value={action.title}>
              <action.Description />

              <div className="mt-4 flex flex-col gap-1">
                <Label htmlFor={action.title}>{action.label}</Label>
                <Input
                  id={action.title}
                  type="text"
                  placeholder={action.placeholder}
                  value={textEntered}
                  onChange={handleChange}
                />
              </div>
              {action.value || (config && config?.length > 0) ? (
                <div className="mt-4 flex flex-col gap-1 items-start">
                  <p className="p-medium-12">
                    Valeur enregistrée :{' '}
                    <span className="text-gray-900">{action.value || (config && config[0]?.value)}</span>.
                  </p>

                  <div className="flex items-center gap-4">
                    <Button className="mt-4" onClick={() => handleEditAction(action)} variant="secondary">
                      <Icons.Edit className="w-4 h-4 mr-2 font-semibold" />
                      Modifier
                    </Button>

                    <Button className="mt-4" onClick={() => handleDeleteAction(action)} variant="destructive">
                      <Icons.Delete className="w-4 h-4 mr-2 font-semibold" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="mt-4"
                  variant={'secondary'}
                  disabled={!textEntered}
                  onClick={() => handleAddAction(action)}>
                  <Icons.Plus className="w-4 h-4 mr-2 font-semibold" />
                  Ajouter
                </Button>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <Button
        onClick={handleSubmit}
        disabled={!actions.some((action) => action.value)}
        className="mt-4"
        variant={'gradient'}>
        Confirmer
      </Button>
    </div>
  );
}

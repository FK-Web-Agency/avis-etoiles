"use client"

import { memo, useEffect, useState } from 'react';
import { z } from 'zod';

import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger, useToast } from '@/components/ui';
import { Icons } from '@/components/shared';
import { classNames } from '@/helper';
import { useOnboardingStore } from '@/store';

import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { generate } from 'generate-password';

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

type ActionFromConfig = { socialNetworkName: string; value: string; _key?: string };

// Define a list of actions
const actionsList: Action[] = [
  {
    title: 'google',
    Icon: Icons.Google,
    Description: () => (
      <small>
        Utilise le champ de recherche ci-dessous pour trouver votre lieu. <br />
        Nous avons besoin du place ID de votre lieu pour pouvoir diriger les utilisateurs et récupérer les avis.
      </small>
    ),
    placeholder: 'Entrez votre Place ID',
    label: 'Place ID',
  },
  {
    title: 'instagram',
    Icon: Icons.Instagram,
    Description: () => (
      <small>
        Renseigner l'URL de votre compte Instagram l'utilisateur sera rediriger vers ce lien lors de son seconde visite
      </small>
    ),
    placeholder: 'Entrez votre URL',
    label: 'URL profile Instagram',
  },
  {
    title: 'facebook',
    Icon: Icons.Facebook,
    Description: () => (
      <small>
        Renseigner l'URL de votre page Facebook l'utilisateur sera rediriger vers ce lien lors de sa troisiéme visite
      </small>
    ),
    placeholder: 'Entrez votre URL',
    label: 'URL page Facebook',
  },
];

function ChooseActions({ onSave, actionsDb }: { onSave: (actions: ActionFromConfig[]) => void; actionsDb?: any[] }) {
  const [actions, setActions] = useState<Action[]>(actionsList);
  const [textEntered, setTextEntered] = useState('');
  const [selectGoogle, setSelectGoogle] = useState<null | { description: string; place_id: string }>(null);
  const [togglePopover, setTogglePopover] = useState(false);
  const { gameConfig, setGameConfig, setStep } = useOnboardingStore();
  const { toast } = useToast();

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    language: 'fr',
  });

  useEffect(() => {
    // Check if actionsDb contains titles of actions and add the value to the corresponding action
    if (actionsDb) {
      actionsDb.forEach((actionDb) => {
        const copyActions = [...actions];
        const index = copyActions.findIndex((action) => action.title === actionDb.socialNetworkName);
        if (index !== -1) {
          actions[index].value = actionDb.value;

          setActions(copyActions);
        }
      });
    }
  }, [actionsDb]);
console.log(actionsDb);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTextEntered(e.target.value);

  // Handle adding an action
  const handleAddAction = function (action: Action) {
    if (action.title === 'google' && !selectGoogle) {
      return toast({
        title: 'Erreur',
        description: 'Vous devez choissir un lieu',
        variant: 'destructive',
      });
    }

    setActions((prevActions) => {
      const newActions = [...prevActions];
      const index = newActions.findIndex((a) => a.title === action.title);
      newActions[index].value = selectGoogle?.place_id || textEntered;
      return newActions;
    });

    setSelectGoogle(null);
    setTextEntered('');
  };

  // Handle editing an action
  const handleEditAction = function (action: Action) {
    if (action.title === 'google')
      return alert("Pour modifier votre place ID, merci d'utiliser le champ de recherche Google ci-dessus");

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
      _key: generate({
        numbers: true,
        length: 5,
      }),
    }));

    if (onSave) return onSave(socialNetworkData);

    setGameConfig({ actions: socialNetworkData });

    toast({
      description: 'Les actions ont été enregistrées',
    });

    setStep('chooseNumberWinners');
  };

  return (
    <div>
      <Tabs className="mt-5" defaultValue="google">
        <TabsList className="bg-transparent mb-8 flex-col max-[410px]:justify-center max-[410px]:w-full min-[410px]:flex-row">
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
            <TabsContent className="max-[410px]:pt-20" key={index} value={action.title}>
              <action.Description />

              <div className="mt-4 flex flex-col gap-1">
                <Label htmlFor={action.title}>{action.label}</Label>
                {action.title === 'google' ? (
                  <>
                    <Input
                      placeholder="Nom de la société"
                      id={action.title}
                      value={selectGoogle?.description || textEntered}
                      onChange={(evt) => {
                        if (!togglePopover) setTogglePopover(!togglePopover);

                        setTextEntered(evt.target.value);
                        getPlacePredictions({ input: evt.target.value });
                      }}
                    />
                    {placePredictions.length && togglePopover ? (
                      <div className="flex flex-col gap-4 z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 mt-4">
                        {placePredictions?.map((suggestion: any, index) => (
                          <div
                            onClick={() => (setSelectGoogle(suggestion), setTogglePopover(!togglePopover))}
                            className="min-h-min p-2 rounded-md hover:bg-gray-200 cursor-pointer"
                            key={index}>
                            <div className="flex items-start flex-col gap-1 text-gray-900 hover:bg-gray-200 rounded">
                              <p className="p-medium-14 text-gray-900 break-all">{suggestion.description}</p>
                              <small className="text-xs block text-gray-600">Place ID :{suggestion.place_id}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <Input
                    id={action.title}
                    type="text"
                    placeholder={action.placeholder}
                    value={textEntered}
                    onChange={handleChange}
                  />
                )}
              </div>
              {action.value || (config && config?.length > 0) ? (
                <div className="mt-4 flex flex-col gap-1 items-start">
                  <p className="p-medium-12">
                    Valeur enregistrée :{' '}
                    <span className="text-gray-900">
                      {selectGoogle?.description || action.value || (config && config[0]?.value)}
                    </span>
                    .
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

export default memo(ChooseActions);

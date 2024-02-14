'use client';

import { deleteMember } from '@/lib/actions/clerk.actions';
import { BaseRecord, useList, useNavigation, useUpdate } from '@refinedev/core';
import React, { PropsWithChildren } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  useToast,
} from '@/components/ui';

type DeleteProps = {
  user: BaseRecord | undefined;
  id: string;
};

export default function DeleteMemberButton({ user, id, children }: PropsWithChildren<DeleteProps>) {
  const { toast } = useToast();
  const { mutate } = useUpdate();
  const { list } = useNavigation();
  const { data } = useList({
    resource: process.env.NEXT_PUBLIC_SANITY_ORDERS!,
  });

  console.log(data);

  const handleDelete = async function () {
    try {
      const { status } = await deleteMember(user?.clerkId as string);

      if (status === 'error') {
        return toast({
          title: 'Erreur',
          description: "Une erreur s'est produite lors de la suppression du membre",
          variant: 'destructive',
        });
      }

      mutate(
        {
          resource: process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS!,
          id,
          values: { disabled: "true" },
        },
        {
          onSuccess() {
            toast({
              title: 'Membre supprimé',
              description: `Le membre ${user?.firstName} ${user?.lastName} a été supprimé.`,
            });
          },

          onError(error) {
            toast({
              title: 'Erreur',
              description: "Une erreur s'est produite lors de la suppression du membre",
              variant: 'destructive',
            });
          },
        }
      );

      list('members');
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={'destructive'} className="px-4 py-2">
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer membre</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera définitivement le compte et retirera les données de
            vos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={handleDelete}>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction type="submit">Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

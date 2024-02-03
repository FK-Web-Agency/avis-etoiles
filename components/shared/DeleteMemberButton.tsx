'use client';

import { deleteMember } from '@/lib/actions/clerk.actions';
import { BaseRecord, useDelete, useNavigation } from '@refinedev/core';
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
  const { mutate } = useDelete();
  const { list } = useNavigation();
  const handleDelete = async function () {
    try {
      // delete the user from the database (sanity)
      mutate({
        resource: 'users',
        id,
      });

      // delete the user from the auth database (clerk)
      await deleteMember(user?.clerkId as string);

      toast({
        title: 'Membre supprimé',
        description: `Le membre ${user?.firstName} ${user?.lastName} a été supprimé.`,
      });
      setTimeout(() => {
        // redirect to members list
        list('members');
      }, 900);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }

    console.log('delete');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={'destructive'}>{children}</Button>
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

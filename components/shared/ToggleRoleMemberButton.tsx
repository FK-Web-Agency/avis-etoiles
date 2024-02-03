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
  import { updateMemberRole } from '@/lib/actions/clerk.actions';
  import { BaseRecord } from '@refinedev/core';
  import { PropsWithChildren } from 'react';
  
  type ToggleProps = {
    user: BaseRecord | undefined;
  };
  
  export default function ToggleRoleMemberButton({ children, user }: PropsWithChildren<ToggleProps>) {
    const { toast } = useToast();
  
    const handleToggleRole = async function () {
      const { status } = await updateMemberRole(user?.clerkId as string, user?.role === 'member' ? 'admin' : 'member');
  
      if (status === 'success') {
        toast({
          title: 'Rôle mis à jour',
          description: `Le rôle de ${user?.firstName} ${user?.lastName} a été mis à jour.`,
        });
      } else {
        toast({
          title: 'Erreur',
          description: `Une erreur est survenue lors de la mise à jour du rôle de ${user?.firstName} ${user?.lastName}.`,
          variant: 'destructive',
        });
      }
    };
  
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={user?.role === 'member' ? 'outline' : 'destructive'} >{children}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mettre a jour le role</AlertDialogTitle>
            <AlertDialogDescription>
              {user?.role === 'member'
                ? `Voulez-vous vraiment passer ${user?.firstName} ${user?.lastName} en administrateur ?`
                : `Voulez-vous vraiment passer ${user?.firstName} ${user?.lastName} en membre ?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form action={handleToggleRole}>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction type="submit">Continuer</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  
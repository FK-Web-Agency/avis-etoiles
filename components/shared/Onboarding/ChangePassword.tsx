'use client';

import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { changeMemberPassword } from '@/lib/actions/clerk.actions';
import { useOnboardingStore } from '@/store';
import { z } from 'zod';

const ChangePasswordSchema = z.object({
  newPassword: z.string().min(8).describe('Nouveau mot de passe'),
  confirmPassword: z.string().min(8).describe('Confirmer le nouveau mot de passe'),
});

type ChangePasswordProps = z.infer<typeof ChangePasswordSchema>;

export default function ChangePassword() {
  const { toast } = useToast();
  const { userIds, setStep } = useOnboardingStore();

  const handleAction = async function (values: ChangePasswordProps) {
    if (values.newPassword !== values.confirmPassword) {
      console.log('Les mots de passe ne correspondent pas');

      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      });
    } else {
      try {
        await changeMemberPassword(userIds.clerkId as string, values.newPassword);
        toast({
          description: 'Votre mot de passe a été mis à jour',
        });

        setStep('uploadLogo');
      } catch (error: any) {
        console.log(error);
        toast({
          title: 'Erreur',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div>
      <AutoForm
        onAction={handleAction}
        formSchema={ChangePasswordSchema}
        fieldConfig={{
          newPassword: {
            inputProps: {
              type: 'password',
            },
          },
          confirmPassword: {
            inputProps: {
              type: 'password',
            },
          },
        }}>
        <AutoFormSubmit>Mettre à jour</AutoFormSubmit>
      </AutoForm>
    </div>
  );
}

'use client';

import { z } from 'zod';
import { generate } from 'generate-password';
import {
  AutoForm,
  AutoFormSubmit,
  Button,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  Input,
  useToast,
} from '@/components/ui';
import { Icons } from '@/components/shared';
import { changeMemberPassword } from '@/lib/actions/clerk.actions';
import { useState } from 'react';
import { AutoFormInputComponentProps } from '../ui/auto-form/types';
import sendEmail from '@/lib/actions/resend.actions';

const EditPasswordSchema = z.object({
  password: z
    .string({
      required_error: 'Le mot de passe est requis',
    })
    .min(8)
    .max(100)
    .describe('Nouveau mot de passe')
    .optional(),
});

type EditPasswordProps = z.infer<typeof EditPasswordSchema>;

export default function EditPasswordForm({ clerkId, email }: { clerkId: string; email: string }) {
  const [passwordGenerated, setPasswordGenerated] = useState('');
  const { toast } = useToast();

  const handleGeneratePassword = () => setPasswordGenerated(generate({ length: 10, numbers: true }));

  // Handle password change using server action
  const handleAction = async function (values: EditPasswordProps) {
    const password = values.password || passwordGenerated;
    try {
      await changeMemberPassword(clerkId, password);

      setPasswordGenerated('');

      await sendEmail({
        to: email,
        subject: 'Votre mot de passe a été modifié - Avis Étoiles',
        emailTemplate: 'reset-password',
        password,
      });

      toast({
        title: 'Mot de passe changé',
        description: "Le mot de passe a été changé avec succès, l'utilisateur a été notifié par email",
      });
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="flex flex-col gap-5 py-8 my-8 border-y border-gray-600">
      <AutoForm
        onAction={handleAction}
        formSchema={EditPasswordSchema}
        fieldConfig={{
          password: {
            fieldType: ({ label, isRequired, field, fieldConfigItem, fieldProps }: AutoFormInputComponentProps) => (
              <FormItem className="flex flex-col items-start  space-y-3 rounded-md">
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {label}
                    {!isRequired && <span className="text-destructive"> *</span>}
                  </FormLabel>
                  {fieldConfigItem.description && <FormDescription>{fieldConfigItem.description}</FormDescription>}
                </div>
                <FormControl>
                  <div className="flex w-full items-center space-x-2">
                    <Input defaultValue={passwordGenerated} type="password" placeholder="*******" required />
                    <Button
                      type="button"
                      onClick={handleGeneratePassword}
                      variant={'link'}
                      className="flex items-end gap-2">
                      <Icons.Lock className="w-6 h-6 text-gray-400" />
                      Générer un mot de passe
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            ),
          },
        }}>
        <AutoFormSubmit variant="secondary" className="text-gray-900">
          Charger le mot de passe
        </AutoFormSubmit>
      </AutoForm>
    </section>
  );
}

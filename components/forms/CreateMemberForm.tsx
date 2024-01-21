'use client';

import { useState } from 'react';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import {
  AutoFormSubmit,
  AutoForm,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  useToast,
  ToastAction,
} from '@/components/ui';
import { createMember } from '@/lib/actions/clerk.actions';
import { AutoFormInputComponentProps } from '../ui/auto-form/types';
import { useGo } from '@refinedev/core';

const MemberSchema = z.object({
  information: z.object({
    role: z.enum(['admin', 'member']).default('member'),
    firstName: z.string().describe('Prénom'),
    lastName: z.string().describe('Nom'),
    email: z.string().email(),
    phone: z.string().describe('Numéro de téléphone').max(22, {
      message: 'Le numéro de téléphone est trop long',
    }),
    companyName: z.string().describe('Nom de la société'),
    siret: z
      .string()
      .min(9, {
        message: 'Le numéro SIRET doit contenir 14 chiffres',
      })
      .max(14, {
        message: 'Le numéro SIRET doit contenir 14 chiffres',
      })
      .describe('Numéro SIRET ou SIREN'),
  }),
  address: z
    .object({
      street: z.string().describe('Rue'),
      city: z.string().describe('Ville'),
      zipCode: z.string().describe('Code postal').max(5),
      country: z.string().describe('Pays'),
    })
    .describe('Adresse Postale'),
  subscription: z.object({
    free: z.boolean().default(false).describe('Abonnement gratuit'),
    plan: z.enum(['essential', 'premium', 'enterprise']).default('essential'),
    startDate: z.date().describe('Date de début').default(new Date()),
    expirationDate: z.date().describe('Date de fin'),
  }),
});

export type MemberProps = z.infer<typeof MemberSchema>;

export default function CreateMemberForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const go = useGo();

  const handleAction = async function (value: MemberProps) {
    console.log(value);

    setLoading(true);

    const response: any = await createMember(value);

    if (response?.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Quelque chose a mal tourné.',
        description: response?.message,
      });
    } else {
      toast({
        description: 'Membre créé avec succès',
      });

      setTimeout(() => {
        go({
          to: '/members/list',
        });
      }, 1000);
    }

    setLoading(false);
  };

  /*   */
  return (
    <AutoForm
      onAction={handleAction}
      formSchema={MemberSchema}
      fieldConfig={{
        information: {
          email: {
            inputProps: {
              type: 'email',
            },
          },
          phone: {
            fieldType: ({ label, isRequired, field, fieldConfigItem, fieldProps }: AutoFormInputComponentProps) => (
              <FormItem className="flex flex-col items-start space-y-3 rounded-md">
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {label}
                    {isRequired && <span className="text-destructive"> *</span>}
                  </FormLabel>
                  {fieldConfigItem.description && <FormDescription>{fieldConfigItem.description}</FormDescription>}
                </div>
                <FormControl>
                  <PhoneInput
                    defaultCountry="FR"
                    international
                    placeholder="Enter phone number"
                    onChange={field.onChange}
                    value={field.value}
                    className="border w-full rounded-md py-2 px-3 border-input"
                    {...fieldProps}
                  />
                </FormControl>
              </FormItem>
            ),
          },
        },
      }}
      className="text-slate-100">
      <AutoFormSubmit loading={loading}>Créer un membre</AutoFormSubmit>
    </AutoForm>
  );
}

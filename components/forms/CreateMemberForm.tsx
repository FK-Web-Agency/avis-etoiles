'use client';
// TODO : check if email is sent

import { useState } from 'react';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useGo } from '@refinedev/core';

import { AutoFormSubmit, AutoForm, FormItem, FormControl, FormLabel, FormDescription, useToast } from '@/components/ui';
import { createMember } from '@/lib/actions/clerk.actions';
import { AutoFormInputComponentProps } from '../ui/auto-form/types';

enum Recurring {
  monthly = 'Mois',
  yearly = 'Année',
  punctual = 'Ponctuel',
}

const MemberSchema = z.object({
  information: z.object({
    role: z.enum(['admin', 'member']).default('member'),
    firstName: z.string().describe('Prénom'),
    lastName: z.string().describe('Nom'),
    email: z.string().email(),
    phone: z
      .string()
      .describe('Numéro de téléphone')
      .max(22, {
        message: 'Le numéro de téléphone est trop long',
      })
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de téléphone doit être une valeur numérique',
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
      .describe('Numéro SIRET ou SIREN')
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de SIRET/SIREN doit être une valeur numérique',
      }),
  }),
  address: z
    .object({
      street: z.string().describe('Rue'),
      city: z.string().describe('Ville'),
      zipCode: z
        .string()
        .describe('Code postal')
        .max(5)
        .refine((value) => !isNaN(Number(value)), {
          message: 'Le numéro de code postal doit être une valeur numérique',
        }),
      country: z.string().describe('Pays'),
    })
    .describe('Adresse Postale'),
  subscription: z.object({
    free: z.boolean().default(false).describe('Abonnement gratuit').optional(),
    plan: z.enum(['essential', 'premium', 'enterprise']).default('essential'),
    recurring: z.nativeEnum(Recurring).default(Recurring.monthly).describe('Renouvellement'),
    startDate: z.date().describe('Date de début').default(new Date()),
    expirationDate: z
      .date()
      .describe('Date de fin')
      .default(() => {
        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        return expirationDate;
      }),
    price: z.number().default(0).describe('Prix'),
  }),
});

export type MemberProps = z.infer<typeof MemberSchema>;

export default function CreateMemberForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const go = useGo();

  const handleAction = async function (values: MemberProps) {
    setLoading(true);

    const response: any = await createMember(values);

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
      /*   go({
          to: '/dashboard/members/list',
        }); */
      }, 1000);
    }

    setLoading(false);
  };

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

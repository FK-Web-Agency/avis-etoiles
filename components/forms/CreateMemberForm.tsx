'use client';
// TODO : check if email is sent
/* 
TODO 

1- envoyer un email pour le paiement
2 - Mettre a jour sanity apres le paiement
3 - envoyer un email pour la confirmation de l'abonnement
*/
import { useState } from 'react';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigation } from '@refinedev/core';

import { AutoFormSubmit, AutoForm, FormItem, FormControl, FormLabel, FormDescription, useToast } from '@/components/ui';
import { createMember } from '@/lib/actions/clerk.actions';
import { AutoFormInputComponentProps } from '../ui/auto-form/types';
import { formatToISOString } from '@/helper';

enum Recurring {
  monthly = 'Mois',
  yearly = 'Année',
  punctual = 'Ponctuel',
}

const MemberSchema = z.object({
  information: z.object({
    // role: z.enum(['admin', 'member']).default('member'),
    firstName: z.string().describe('Prénom'),
    lastName: z.string().describe('Nom'),
    email: z.string().email(),
    phoneNumber: z
      .string()
      .describe('Numéro de téléphone')
      .max(22, {
        message: 'Le numéro de téléphone est trop long',
      })
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de téléphone doit être une valeur numérique',
      })
      .describe('Numéro de téléphone'),
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
    price: z.string().default('0').describe('Prix'),
  }),
});

export type MemberProps = z.infer<typeof MemberSchema>;

export default function CreateMemberForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { list } = useNavigation();

  const handleAction = async function (values: MemberProps) {
    setLoading(true);

    const askConfirmation =
      values?.subscription?.price == '0' || !values?.subscription?.price
        ? confirm("Le prix de l'abonnement est de 0€, êtes-vous sûr de vouloir continuer ?")
        : true;

    if (askConfirmation) {
      const startDate = formatToISOString(values?.subscription?.startDate);
      const expirationDate = formatToISOString(values?.subscription?.expirationDate);

      const response: any = await createMember({
        ...values,
        subscription: {
          ...values.subscription,
          startDate,
          expirationDate,
        },
      });

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
          list('members');
        }, 1000);
      }
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

// Import dependencies
'use client';
import { useState } from 'react';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useCreate, useNavigation, useOne } from '@refinedev/core';

import { AutoFormSubmit, AutoForm, FormItem, FormControl, FormLabel, FormDescription, useToast } from '@/components/ui';
import { createMember } from '@/lib/actions/clerk.actions';
import { AutoFormInputComponentProps } from '../ui/auto-form/types';

import { useDashboardStore } from '@/store';
// @ts-ignore
import { IClerkMember, SubscribeStatus } from '../../interfaces/user.d.ts';
import { createSubscriber } from '@/lib/actions';

// Define recurring options
enum Recurring {
  monthly = 'Mois',
  yearly = 'Année',
}

// Define the schema for the member form
const MemberSchema = z.object({
  information: z.object({
    // role: z.enum(['admin', 'member']).default('member'),
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
    vat: z.string().describe('TVA').optional(),
  }),
  address: z
    .object({
      street: z.string().describe('Rue'),
      city: z.string().describe('Ville'),
      zipCode: z
        .string()
        .max(5)
        .refine((value) => !isNaN(Number(value)), {
          message: 'Le numéro de code postal doit être une valeur numérique',
        })
        .describe('Code postal'),
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
  // Define state variables
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { list } = useNavigation();
  const { userIds } = useDashboardStore();
  const { mutate } = useCreate();

  // Fetch data for the current user
  const { data } = useOne({
    resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS,
    id: userIds?.sanityId,
  });

  const seller = data?.data;

  // Handle form submission
  async function handleAction(values: MemberProps) {
    // Set loading state to true
    setLoading(true);

    // Create a new member in clerk
    const member: IClerkMember = {
      email: values.information.email,
      firstName: values.information.firstName,
      lastName: values.information.lastName,
      companyName: values.information.companyName,
      status: 'incomplete',
      seller: {
        id: seller?._id,
        firstName: seller?.firstName,
        lastName: seller?.lastName,
        email: seller?.email,
        phone: seller?.phone,
      },
      address: {
        line1: values.address.street,
        city: values.address.city,
        zipCode: values.address.zipCode,
        country: 'FR',
      },
    };

    const newClerkMember = await createMember(member);


    console.log(newClerkMember);
    
    // Set loading state to false
    setLoading(false);
  }

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
      <AutoFormSubmit loading={loading}>Create Member</AutoFormSubmit>
    </AutoForm>
  );
}

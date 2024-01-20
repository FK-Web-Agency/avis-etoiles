'use client';

import { useState } from 'react';
import { z } from 'zod';

import { AutoFormSubmit, AutoForm } from '@/components/ui';
import { createMember } from '@/lib/actions/clerk.actions';

const MemberSchema = z.object({
  information: z.object({
    role: z.enum(['admin', 'member']).default('member'),
    firstName: z.string().describe('Prénom'),
    lastName: z.string().describe('Nom'),
    email: z.string().email(),
    phone: z.string().describe('Numéro de téléphone'),
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

  const handleAction = async function (value: MemberProps) {
    console.log(value);

    setLoading(true);

    await createMember(value);
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
        },
      }}
      className="text-slate-100">
      <AutoFormSubmit loading={loading}>Créer un membre</AutoFormSubmit>
    </AutoForm>
  );
}

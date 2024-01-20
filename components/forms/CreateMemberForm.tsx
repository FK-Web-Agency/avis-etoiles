'use client';

import { useState } from 'react';
import { z } from 'zod';
import { clerkClient } from '@clerk/nextjs';

import { AutoFormSubmit, AutoForm } from '@/components/ui';
import { generate } from 'generate-password';

const MemberSchema = z.object({
  information: z.object({
    role: z.enum(['admin', 'member']).default('member'),
    firstName: z.string().describe('Prénom'),
    lastName: z.string().describe('Nom'),
    email: z.string().email(),
    phone: z.string().describe('Numéro de téléphone'),
    companyName: z.string().describe('Nom de la société'),
    siret: z
      .number()
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
      zipCode: z.number().describe('Code postal').max(5),
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

type MemberProps = z.infer<typeof MemberSchema>;

export default function CreateMemberForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async function (value: MemberProps) {
    setLoading(true);

    await clerkClient.users.createUser({
      emailAddress: [value.information.email],
      password: generate({
        length: 10,
        numbers: true,
      }),
      firstName: value.information.firstName,
      lastName: value.information.lastName,
      username: value.information.firstName + value.information.lastName,
      phoneNumber: [value.information.phone],
      privateMetadata: {
        companyName: value.information.companyName,
        siret: value.information.siret,
        role: value.information.role,
        address: {
          street: value.address.street,
          city: value.address.city,
          zipCode: value.address.zipCode,
          country: value.address.country,
        },
        subscription: {
          free: value.subscription.free,
          status: value.subscription.expirationDate ? true : false,
          plan: value.subscription.plan,
          startDate: value.subscription.startDate,
          expirationDate: value.subscription.expirationDate,
        },
      },
    });

    setLoading(false);
  };

  return (
    <AutoForm
      onSubmit={handleSubmit}
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

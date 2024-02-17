'use client';

import { z } from 'zod';
import { AutoForm, AutoFormSubmit, useToast } from '../ui';
import { createMembership, createTeam } from '@/lib/actions/clerk.actions';
import { useCreate, useNavigation } from '@refinedev/core';
import sendEmail from '@/lib/actions/resend.actions';
import { useState } from 'react';
import { Icons } from '@/components/shared';

enum Role {
  Admin = 'admin',
  Commercial = 'commercial(e)',
}

const TeamSchema = z.object({
  role: z.enum([Role.Admin, Role.Commercial]).default(Role.Commercial).describe('Rôle'),
  firstName: z.string().describe('Prénom'),
  lastName: z.string().describe('Nom'),
  phone: z.string().describe('Téléphone'),
  email: z.string().email().describe('Email'),
});

type Team = z.infer<typeof TeamSchema>;
export default function CreateTeamForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { mutate } = useCreate();
  const { list } = useNavigation();

  const handleAction = async (values: Team) => {
    setLoading(true);
    const { clerkId, password } = await createTeam(values);

    const teammate = {
      clerkId,
      createdAt: new Date().toISOString(),
      ...values,
      role: values?.role === Role.Commercial ? 'Commercial' : 'Admin',
      disabled: 'false',
    };

    const role = values?.role === Role.Commercial ? 'org:commercial' : 'org:admin';

   await createMembership(clerkId, role);

    mutate(
      {
        resource: process.env.NEXT_PUBLIC_SANITY_TEAM_COLLABORATORS!,
        values: teammate,
      },
      {
        onSuccess: async () => {
          const { status } = await sendEmail({
            email: values?.email,
            firstName: values?.firstName,
            lastName: values?.lastName,
            subject: "Bienvenue dans l'équipe!",
            emailTemplate: 'welcome',
            password,
          });
          status === 'success'
            ? toast({
                title: 'Colaborateur créé avec succès',
                description: `Un email a été envoyé à ${values?.email} avec les informations de connexion`,
              })
            : toast({
                title: 'Erreur lors de la création du colaborateur',
                description: `Un email n'a pas pu être envoyé à ${values?.email} avec les informations de connexion`,
                variant: 'destructive',
              });
          setLoading(false);

          //  return list('collaborators');
        },
      }
    );
  };

  return (
    <AutoForm onAction={handleAction} formSchema={TeamSchema} className="text-slate-50">
      <AutoFormSubmit loading={loading}>Créer Colaborateur</AutoFormSubmit>
    </AutoForm>
  );
}

'use client';

import { z } from 'zod';
import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { updateMemberEmail } from '@/lib/actions/clerk.actions';
import { useUpdate } from '@refinedev/core';
import { useDashboardStore } from '@/store';

type EditEmailProps = { email: string; firstName: string; lastName: string; clerkId: string; sanityId: string };

export default function EditEmailAndNameForm({ email, firstName, lastName, clerkId, sanityId }: EditEmailProps) {
  const { toast } = useToast();
  const { mutate } = useUpdate();
  const { userIds } = useDashboardStore();
  const EmailSchema = z.object({
    firstName: z.string().default(firstName),
    lastName: z.string().default(lastName),
    email: z.string().email().default(email),
  });

  const handleAction = async function (values: any) {
    const { status, message } = await updateMemberEmail(clerkId, values);

    const successParams = { message: 'Votre email a bien été mis à jour' };

    const errorParams = {
      title: 'Erreur',
      description: message,
      variant: 'destructive',
    };

    if (status === 'success') {
      mutate({
        resource: 'users',
        id: sanityId,
        values: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        },
      });
    }

    const params: any = status === 'success' ? successParams : errorParams;
    toast(params);
  };

  return (
    <section>
      <h4 className="subtile-dashboard">Gestion de compte</h4>

      <AutoForm onAction={handleAction} formSchema={EmailSchema}>
        <AutoFormSubmit variant="secondary" className="text-gray-900">
          Sauvegarder
        </AutoFormSubmit>
      </AutoForm>
    </section>
  );
}

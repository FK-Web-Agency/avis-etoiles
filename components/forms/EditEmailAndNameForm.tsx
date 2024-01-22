import React from 'react';
import { z } from 'zod';
import { AutoForm, AutoFormSubmit } from '../ui';
import { updateMemberEmail } from '@/lib/actions/clerk.actions';

type EditEmailProps = { email: string; firstName: string; lastName: string; clerkId: string };

export default function EditEmailAndNameForm({ email, firstName, lastName, clerkId }: EditEmailProps) {
  const EmailSchema = z.object({
    firstName: z.string().default(firstName),
    lastName: z.string().default(lastName),
    email: z.string().email().default(email),
  });

  const handleAction = async function (values: any) {
    await updateMemberEmail(clerkId, values);
  };

  return (
    <AutoForm onAction={handleAction} formSchema={EmailSchema}>
      <AutoFormSubmit variant="secondary" className="text-gray-900">
        Changer
      </AutoFormSubmit>
    </AutoForm>
  );
}

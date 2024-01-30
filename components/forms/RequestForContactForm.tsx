import React, { PropsWithChildren } from 'react';
import { z } from 'zod';
import { AutoForm, useToast } from '@/components/ui';
import sendEmail from '@/lib/actions/resend.actions';

const RequestForContactSchema = z.object({
  name: z.string().min(2).describe('Nom et prénom'),
  email: z.string().email(),
  phoneNumber: z.string().min(10).describe('Numéro de téléphone'),
  companyName: z.string().min(10).describe("Nom de l'entreprise"),
  jeSouhaiteEtreContactéADesFinsCommerciales: z
    .boolean()
    .describe('Accept terms and conditions.')
    .refine((value) => value, {
      message: 'You must accept the terms and conditions.',
      path: ['acceptTerms'],
    }),
});

type RequestForContactProps = z.infer<typeof RequestForContactSchema>;

export default function RequestForContact({ children }: PropsWithChildren) {
  const { toast } = useToast();

  const handleSubmit = async function (values: RequestForContactProps) {
    const { status, message } = await sendEmail({
      subject: "Demande de contact depuis le formulaire d'avisetoiles.com",
      emailTemplate: 'request-for-contact',
      adminEmail: 'contact@avisetoiles.com',
      ...values,
    });
    console.log('status', message);

    if (status === 'success') {
      toast({
        description: 'Votre demande a bien été envoyée, nous vous contacterons dans les plus brefs délais.',
      });
    } else {
      toast({
        title: 'Une erreur est survenue',
        description: message,
        variant: 'destructive',
      });
    }
  };

  return (
    <AutoForm className="p-4" onSubmit={handleSubmit} formSchema={RequestForContactSchema}>
      {children}
    </AutoForm>
  );
}

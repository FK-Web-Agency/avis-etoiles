'use client';
import { z } from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';

import AutoForm, { AutoFormSubmit } from '../ui/auto-form';
import { useState } from 'react';
import { ToastAction, useToast } from '../ui';

type StringProps = { messageError: string; describe: string };

const string = ({ messageError, describe }: StringProps) =>
  z
    .string({
      required_error: messageError,
    })
    .min(2)
    .max(20)
    .describe(describe);

/**
 * Represents the contact form schema.
 */
const ContactSchema = z.object({
  /**
   * The first name field.
   * @description Represents the user's first name.
   * @messageError 'Merci de fournir votre nom'
   * @describe 'votre prénom'
   */
  firstName: string({ messageError: 'Merci de fournir votre nom', describe: 'prénom' }),

  /**
   * The last name field.
   * @description Represents the user's last name.
   * @messageError 'Merci de fournir votre nom'
   * @describe 'votre nom'
   */
  lastName: string({ messageError: 'Merci de fournir votre nom', describe: 'nom' }),

  /**
   * The company name field.
   * @description Represents the user's company name.
   * @messageError 'Merci de fournir le nom de votre compagnie'
   * @describe 'votre nom'
   */
  companyName: string({
    messageError: 'Merci de fournir le nom de votre compagnie',
    describe: 'nom de société',
  }),

  /**
   * The email field.
   * @description Represents the user's email address.
   * @messageError 'Merci de fournir votre email'
   * @describe 'votre email'
   */
  email: string({ messageError: 'Merci de fournir votre email', describe: 'email' }),

  /**
   * The phone number field.
   * @description Represents the user's phone number.
   * @messageError 'Merci de fournir votre numéro de téléphone'
   * @describe 'votre numéro de téléphone'
   */
  phoneNumber: string({
    messageError: 'Merci de fournir votre numéro de téléphone',
    describe: 'numéro de téléphone',
  }),

  /**
   * The message field.
   * @description Represents the user's message.
   * @messageError 'Merci de fournir votre message'
   * @describe 'votre message'
   */
  message: string({
    messageError: 'Merci de fournir votre message',
    describe: 'message',
  }),
});

type ContactFormProps = z.infer<typeof ContactSchema>;

export default function contactForm() {
  const { toast } = useToast();
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const onChange = (value: any) => setRecaptchaValue(value);

  const handleSubmit = async function (values: ContactFormProps) {
    if (!recaptchaValue) return;

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...values, emailTemplate: 'contact' }),
    });

    if (response.ok) {
      toast({ title: 'Message envoyé', description: 'Votre message a bien été envoyé' });
    } else {
      toast({
        title: 'Erreur 💥',
        description: 'Une erreur est survenue',
        action: <ToastAction altText="Rééassayer plus tard">Rééassayer plus tard</ToastAction>,
      });
    }
  };

  return (
    <AutoForm
      className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
      onSubmit={handleSubmit}
      formSchema={ContactSchema}
      fieldConfig={{
        email: {
          inputProps: {
            type: 'email',
          },
        },
        phoneNumber: {
          inputProps: {
            type: 'tel',
          },
        },
        message: {
          fieldType: 'textarea',
        },
      }}>
      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={onChange} />
      <AutoFormSubmit>Envoyer</AutoFormSubmit>
    </AutoForm>
  );
}

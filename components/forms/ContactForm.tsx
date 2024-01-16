'use client';
import { z } from 'zod';
import ReCAPTCHA from 'react-google-recaptcha';

import AutoForm, { AutoFormSubmit } from '../ui/auto-form';
import { useState } from 'react';

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

export default function contactForm() {
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const onChange = (value: any) => setRecaptchaValue(value);


const handleSubmit = async function(){
  if(!recaptchaValue) return;

  
}


  return (
    <AutoForm
      className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
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

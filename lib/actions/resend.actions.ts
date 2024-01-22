'use server';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { Contact, Welcome, Payment, ResetPassword } from '@/emails';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

function getEmailTemplate(templateName: string, data: any) {
  switch (templateName) {
    case 'contact':
      return Contact(data);
    case 'welcome':
      return Welcome(data);
    case 'payment':
      return Payment(data);
    case 'reset-password':
      return ResetPassword(data);
    default:
      throw new Error(`Email template ${templateName} not found.`);
  }
}

export default async function sendEmail(data: any) {
  try {
    await resend.emails.send({
      from: 'admin@avisetoiles.com',
      to: data.email,
      subject: data.subject,
      react: getEmailTemplate(data.emailTemplate, data),
    });
    console.log('email sent');

    return { status: 'success', message: 'Email envoyé avec succés' };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: "Une erreur s'est produite, merci de réessayer ultérieurement",
    };
  }
}

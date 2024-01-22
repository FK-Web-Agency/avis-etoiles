'use server';

import { getEmailTemplate } from '@/helper';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export default async function sendEmail(data: any) {
  try {
    await resend.emails.send({
      from: '<Avis Étoiles>admin@avisetoiles.com',
      to: data.email,
      subject: data.subject,
      react: getEmailTemplate(data.emailTemplate, data),
    });

    return NextResponse.json({ status: 'success' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 'error',
      message: "Une erreur s'est produite, merci de réessayer ultérieurement",
    });
  }
}

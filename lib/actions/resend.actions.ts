'use server';

import { Resend } from 'resend';

import {
  Contact,
  Welcome,
  Payment,
  ResetPassword,
  RequestForContact,
  Winner,
  WelcomeToTeam,
  SandboxQRCode,
  MutualGiftWinner,
} from '@/emails';
import QrcodeTemplate from '@/emails/qrcode';

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
    case 'request-for-contact':
      return RequestForContact(data);
    case 'winner':
      return Winner(data);
    case 'welcome-to-team':
      return WelcomeToTeam(data);
    case 'sandbox-qrcode':
      return SandboxQRCode(data);
    case 'mutual-gift-winner':
      return MutualGiftWinner(data);
    case 'qrcode':
      return QrcodeTemplate(data);
    default:
      throw new Error(`Email template ${templateName} not found.`);
  }
}

export default async function sendEmail(body: any) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'admin@avisetoiles.com',
      to: [body.adminEmail || body.email],
      subject: body.subject,
      react: getEmailTemplate(body.emailTemplate, body),
    });

    if (error) {
      console.error(error);
      return {
        status: 'error',
        message: "Une erreur s'est produite, merci de réessayer ultérieurement",
        error,
      };
    }
    return { status: 'success', message: 'Email envoyé avec succés', data };
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: "Une erreur s'est produite, merci de réessayer ultérieurement",
      error: err,
    };
  }
}

import { z } from 'zod';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { getEmailTemplate } from '@/helper';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

// Créer un type pour les modèles d'e-mail
type EmailTemplates = {
  [key: string]: (props: any) => React.JSX.Element;
};

export async function POST(request: NextRequest) {
  const body: any = await request.json();

  try {
    await resend.emails.send({
      from: '<Avis Étoiles>admin@avisetoiles.com',
      to: body.email,
      subject: body.subject,
      react: getEmailTemplate(body.emailTemplate, body),
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

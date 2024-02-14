import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from '@react-email/components';
import * as React from 'react';

interface KoalaWelcomeEmailProps {
  companyName: string;
  url: string;
}

export default function PaymentTemplate({ companyName, url }: KoalaWelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Merci d'effectuer le paiement de votre abonnement</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>Avis Étoiles 🎁</Text>

          <Text style={paragraph}>Hi {companyName},</Text>
          <Text style={paragraph}>
            Vous trouverez ci-dessous le lien pour effectuer le paiement de votre abonnement. Ce lien est valable pour
            24 heures.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={url}>
              Payer
            </Button>
          </Section>
          <Text style={paragraph}>
            À bientôt,
            <br />
            L'équipe Avis Étoiles
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

PaymentTemplate.PreviewProps = {
  companyName: 'Alan',
} as KoalaWelcomeEmailProps;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px auto',
  display: 'flex',
  justifyContent: 'center',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: 'hsl(47.9 95.8% 53.1%)',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

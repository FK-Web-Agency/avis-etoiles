import { Body, Button, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components';
import * as React from 'react';
import { z } from 'zod';

const WelcomeSchema = z.object({
  email: z.string(),
  companyName: z.string(),
  password: z.string(),
});

type WelcomeType = z.infer<typeof WelcomeSchema>;

const ResetPasswordTemplate = (customer: WelcomeType) => (
  <Html>
    <Head />
    <Preview>Mot de passe modifié - Avis Étoiles </Preview>

    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Mot de passé réinitiliser </Heading>

        <Text style={{ ...text, marginBottom: '14px' }}>Bonjour {customer.companyName},</Text>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Nous avons reçu une demande pour réinitialiser votre mot de passe. Pour assurer la sécurité de votre compte,
          nous avons généré un nouveau mot de passe temporaire pour vous.
        </Text>

        <Text style={{ ...text, marginBottom: '14px', fontWeight: 'bolder' }}>
          Votre nouveau mot de passe temporaire est :
        </Text>

        <code style={code}>
          <Text style={{ ...text, marginBottom: '14px', marginBlock: '0' }}>{customer.password}</Text>
        </code>

        <Text style={{ ...text, marginInline: '14px' }}>
          Pour votre sécurité, nous vous demandons de vous connecter dès que possible et de changer ce mot de passe
          temporaire. Voici comment procéder :
          <br />
          <ol>
            <li>
              <Text style={{ ...text }}>
                Visitez la page de connexion à{' '}
                <Link style={link} href="https://www.avisetoiles.com/dashboard">
                  votre dashbaord
                </Link>
                . Utilisez le nouveau mot de passe temporaire fourni ci-dessus pour vous connecter.
              </Text>
            </li>
            <li>
              <Text style={{ ...text }}>
                Accédez à votre profil et sélectionnez l'option pour changer votre mot de passe.
              </Text>
            </li>
            <li>
              <Text style={{ ...text }}>Choisissez un nouveau mot de passe fort et unique.</Text>
            </li>
          </ol>
        </Text>

        <Text style={{ ...text, marginInline: '14px' }}>
          Rappelez-vous, pour votre sécurité, ne partagez jamais votre mot de passe avec qui que ce soit et assurez-vous
          qu'il est difficile à deviner.
          <br />
          Si vous rencontrez des difficultés pour vous connecter ou si vous n'avez pas demandé cette réinitialisation,
          veuillez nous contacter immédiatement à{' '}
          <Link style={link} href={`maito:support@avisetoiles.com`}>
            support@avisetoiles.com
          </Link>
          .
          <br />
          Nous sommes ici pour assurer la sécurité de votre compte et vous aider en cas de besoin.
        </Text>

        <Text style={{ ...text, marginInline: '14px' }}>
          Cordialement,
          <br />
          L'équipe Avis Étoiles
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordTemplate;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
};

const link = {
  color: 'hsl(47.9, 95.8%, 53.1%)',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const code = {
  display: 'inline-block',
  padding: '10px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};

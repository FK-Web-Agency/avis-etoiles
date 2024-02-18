import { Body, Button, Container, Head, Heading, Html, Link, Preview, Text } from '@react-email/components';
import * as React from 'react';
import { z } from 'zod';

const NewTeammateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  password: z.string(),
});

type NewTeammateType = z.infer<typeof NewTeammateSchema>;

const NewTeammateTemplate = (customer: NewTeammateType) => (
  <Html>
    <Head />
    <Preview>Bienvenue dans l'équipe Avis Étoiles !</Preview>

    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Bienvenue dans l'équipe </Heading>

        <Text style={{ ...text, marginBottom: '14px' }}>Bonjour {customer.firstName} {customer.lastName},</Text>
        <Text style={{ ...text, marginBottom: '14px' }}>
          Nous sommes ravis de t'accueillir au sein de l'équipe en tant que {customer.role}. Merci d'avoir choisi Avis
          Étoiles. Tu fais désormais partie d'une communauté dédiée à l'évolution des commerces et services via la
          récolte d'avis clients.
        </Text>

        <Text style={{ ...text, marginBottom: '14px', fontWeight: 'bolder' }}>Vos informations de connexion :</Text>

        <code style={code}>
          <Text style={{ ...text, marginBottom: '14px' }}>Email : {customer.email}</Text>
          <Text style={{ ...text, marginBottom: '14px' }}>Mot de passe : {customer.password}</Text>
        </code>

        <Button>
          <Link style={{ ...link, marginTop: '24px' }} href="https://avisetoiles.com/dashboard">
            Se connecter
          </Link>
        </Button>

        <Text style={{ ...text, marginInline: '14px' }}>
          Si vous avez des questions ou besoin d'aide, n'hésitez pas à contacter notre équipe de support à{' '}
          <Link href="mailto:sav@avisetoiles.com">sav@avisetoiles.com</Link>.
        </Text>

        <Text style={{ ...text, marginInline: '14px' }}>
          Nous sommes impatients de vous voir profiter pleinement d'Avis Étoiles. Bienvenue à bord !
        </Text>

        <Text style={{ ...text, marginInline: '14px' }}>
          À bientôt,
          <br />
          L'équipe Avis Étoiles
        </Text>
      </Container>
    </Body>
  </Html>
);

export default NewTeammateTemplate;

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
  padding: '16px 4.5%',
  width: '90.5%',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  border: '1px solid #eee',
  color: '#333',
};

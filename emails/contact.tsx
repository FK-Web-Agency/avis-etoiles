import { Body, Container, Head, Heading, Html,  Link, Preview, Text } from '@react-email/components';
import * as React from 'react';
import { z } from 'zod';

const ContactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  companyName: z.string(),
  message: z.string(),
});

type ContactType = z.infer<typeof ContactSchema>;

const ContactTemplate = (customer: ContactType) => (
  <Html>
    <Head />
    <Preview>Nouveau Message de {customer?.companyName} </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nouveau Message</Heading>

        <Text style={{ ...text, marginBottom: '14px' }}>Vous avez reçu un message : </Text>
        <Text style={{ ...text, marginBottom: '14px' }}>
          De la part de {customer?.firstName} {customer?.lastName} de la société {customer?.companyName}
        </Text>

        <Text style={{ ...text, marginBottom: '14px' }}>Message : {customer?.message}</Text>

        <div style={{ backgroundColor: '#000', padding: '10px', borderRadius: '8px' }}>
          <Text
            style={{
              ...text,
              fontSize: '18px',
              color: '#ababab',
              marginTop: '19px',
              marginBottom: '10px',
            }}>
            Informations de contact :
          </Text>
          <Text
            style={{
              ...text,
              color: '#ababab',
              marginTop: '12px',
              marginBottom: '38px',
            }}>
            Email :{' '}
            <Link style={link} href={`mailto:${customer?.email}`}>
              {customer?.email}
            </Link>
            <br />
            Téléphone :{' '}
            <Link style={link} href={`tel:${customer?.phoneNumber}`}>
              {customer?.phoneNumber}
            </Link>
          </Text>
        </div>
      </Container>
    </Body>
  </Html>
);

export default ContactTemplate;

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

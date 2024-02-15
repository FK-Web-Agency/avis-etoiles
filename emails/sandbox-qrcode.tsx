/* eslint-disable react/no-unescaped-entities */

import { Body, Container, Head, Heading, Html, Img, Link, Preview, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface GiftSubscriptionProps {
  subject: string;
  value: Record<string, string>;
}

export const SandboxQrcode = (values: any) => (
  <Html>
    <Head />
    <Tailwind>
      <Preview>Votre démo gratuit </Preview>
      <Body className="font-sans bg-white">
        <Container className="mx-auto my-0 px-5">
          <Heading className="text-3xl ">Demo d'Avis Étoiles</Heading>
          <Text className="mb-4">
            Vous avez gagné une démo gratuit de 24H grâce à votre participation à notre jeu chez Avis Étoiles. Nous
            sommes ravis de vous offrir cette démo en signe de notre appréciation.
          </Text>

          <Text className="mb-4">Voici votre QR Code :</Text>

          <Img src={values.QRCode} alt="qrcode" width={300} height={300} />
          <Text className="mb-4">
            Vous pouvez utiliser ce QR Code pour accéder à votre démo gratuit pendant 24H après ce délai ce QR code ne
            sera plus fonctionnel. Si vous souhaitez continuer à utiliser notre service, n'hésitez pas à nous contacter
          {' '}  <Link href="mailto:contact@avisetoiles.com">contact@avisetoiles.com</Link>
          </Text>

          <Text>Si vous rencontrez des problèmes pour accéder à votre récompense, n'hésitez pas à nous contacter</Text>

          <Text>
            Nous espérons que vous apprécierez votre récompense et nous vous remercions de votre participation.
          </Text>

          <Text style={footer}>
            <Link href="https://www.avisetoiles.com" target="_blank" className="underline" style={{ color: '#898989' }}>
              Avis Étole
            </Link>
            , tous droit réservés
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default SandboxQrcode;

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

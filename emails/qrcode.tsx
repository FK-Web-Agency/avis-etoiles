/* eslint-disable react/no-unescaped-entities */

import { Body, Container, Head, Heading, Html, Img, Link, Preview, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

function calculate24HoursEnd(date: Date) {
  const givenDate = new Date(date);
  // Ajoute 24 heures à la date donnée
  const endDate = new Date(givenDate.getTime() + 24 * 60 * 60 * 1000);

  // Formate la date et l'heure de fin
  const endDateString = endDate.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return endDateString;
}

export const QrcodeTemplate = (values: any) => (
  <Html>
    <Head />
    <Tailwind>
      <Preview>Votre Qr Code est prêt</Preview>
      <Body className="font-sans bg-white">
        <Container className="mx-auto my-0 px-5 rounded">
          <Heading className="text-3xl ">QR Code est disponible</Heading>
          <Container className="mb-4 bg-yellow-400 p-4">
            <Text className="text-2xl text-center">
              Votre jeu de la roulette a été configuré avec succés vous pouvez utiliser ce Qr code ci-dessous
            </Text>
          </Container>

          <Img src={values.QRCode} alt="qrcode" width={300} height={300} className="mx-auto" />

          <Text style={footer}>
            <Link href="https://www.avisetoiles.com" target="_blank" className="underline" style={{ color: '#898989' }}>
              Avis Étoiles
            </Link>
            , tous droit réservés
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default QrcodeTemplate;

QrcodeTemplate.PreviewProps = {
  values: {
    ownerName: 'Alan',
    QRCode: 'https://cdn.sanity.io/images/ksnzmd32/production/313faceea83cb9bcab42dfef9961b6493d78d02c-164x164.png',
  },
};
const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

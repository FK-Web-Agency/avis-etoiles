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

export const RewardTemplate = (values: any) => (
  <Html>
    <Head />
    <Tailwind>
      <Preview>Vous avez gagné une cadeau</Preview>
      <Body className="font-sans bg-white">
        <Container className="mx-auto my-0 px-5 rounded">
          <Heading className="text-3xl ">Félicitation 🎉 🎉 🎉</Heading>
          <Container className="mb-4 bg-yellow-400 p-4">
            <Text className="text-2xl text-center">Vous avez gagnez 1 Pizza</Text>
          </Container>
          <Text className="mb-4 text-xl">Veillez présenter ce QR Code à la caisse pour réclamer votre cadeau.</Text>
          <Text className="mb-4">Conditions d'utilisation :</Text>
          <ul>
            <li>Vous devez consommer une somme équivalente ou supérieure </li>
            <li>Le QR Code est valable 1 mois </li>
          </ul>

          <Container className="my-4 bg-yellow-400 p-4">
            <Text className="text-lg text-center font-semibold">
              Votre cadeau sera disponible à partir de{' '}
              {calculate24HoursEnd(new Date(Date.now())).split(' ').join(' à ')}
            </Text>
          </Container>

          <Img src={values.QRCode} alt="qrcode" width={300} height={300} className="mx-auto" />

          {values?.address && (
            <Container className="my-4 bg-yellow-400 p-4">
              <Text className="text-lg text-center font-semibold">
                À récupérer à l'adresse suivante :
                <br />
                {values.companyName}
                <br />
                {values.address.street}
                <br />
                {values.address.zipCode} {values.address.city}
              </Text>
            </Container>
          )}

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

export default RewardTemplate;

RewardTemplate.PreviewProps = {
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

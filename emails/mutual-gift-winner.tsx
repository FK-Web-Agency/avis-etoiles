/* eslint-disable react/no-unescaped-entities */

import { Body, Container, Head, Heading, Html, Img, Link, Preview, Tailwind, Text } from '@react-email/components';
import * as React from 'react';



export const RewardTemplate = (values: any) => (
  <Html>
    <Head />
    <Tailwind>
      <Preview>Vous avez gagné le cadeau mutualisé</Preview>
      <Body className="font-sans bg-white">
        <Container className="mx-auto my-0 px-5 rounded">
          <Heading className="text-3xl ">Félicitation 🎉 🎉 🎉</Heading>
          <Container className="mb-4 bg-yellow-400 p-4">
            <Text className="text-2xl text-center">Vous avez gagnez {values.reward}</Text>
          </Container>

          <Text>
            Merci de contacter le service client pour réclamer votre cadeau.{' '}
            <Link
              href="mailto:contact@avisetoiles.com"
              target="_blank"
              className="underline"
              style={{ color: '#898989' }}>
              contact@avisetoiles.com
            </Link>
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

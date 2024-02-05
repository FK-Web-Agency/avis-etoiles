/* eslint-disable react/no-unescaped-entities */

import { Body, Container, Head, Heading, Html, Img, Link, Preview, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

interface GiftSubscriptionProps {
  subject: string;
  value: Record<string, string>;
}

export const RewardTemplate = (values: any) => (
  <Html>
    <Head />
    <Tailwind>
      <Preview>Vous avez gagné une récompense</Preview>
      <Body className="font-sans bg-white">
        <Container className="mx-auto my-0 px-5">
          <Heading className="text-3xl ">Félicitation 🎉 🎉 🎉</Heading>
          <Text className="mb-4">
            Vous avez gagné une récompense grâce à votre participation à notre jeu chez {values.ownerName}. Nous sommes
            ravis de vous offrir cette récompense en signe de notre appréciation.
          </Text>

          <Text className="mb-4">Voici votre QR Code pour réclamer votre récompense :</Text>

          <Img src={values.QRCode} alt="qrcode" width={300} height={300} />
          <Text className="mb-4">
            Pour récupérer votre récompense, suivez simplement ces étapes :
            <ol className="mb-4">
              <li>
                <Text className="m-0">Rendez-vous dans notre Boutique</Text>
              </li>
              <li>
                <Text className="m-0">
                  Montrez votre QR Code : À votre arrivée, présentez ce QR Code à un membre de notre équipe ou à la
                  caisse.
                </Text>
              </li>
              <li>
                <Text>
                  Recevez votre Récompense : Nous vous remettrons votre récompense. Il ne vous reste plus qu'à en
                  profiter ! 🌟🎁
                </Text>
              </li>
            </ol>
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

export default RewardTemplate;

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
};

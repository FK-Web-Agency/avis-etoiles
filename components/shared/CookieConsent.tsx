'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui';

const name = 'cookieConsent';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Vérifier l'état de consentement dans le stockage local
    const isAgreed = localStorage.getItem(name) === 'true';
    setShowConsent(!isAgreed);
  }, []);

  if (!showConsent) return null;

  const consentHandler = () => {
    // Enregistrer le consentement dans le stockage local
    localStorage.setItem(name, 'true');
    setShowConsent(false);
  };

  return (
    <section className="fixed max-w-96 md:max-w-[90vw] p-4 mx-auto border border-gray-50 left-0 right-0 bottom-2 rounded-2xl bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60">
      <span className="block h4-medium">🍪</span>
      <h2 className="p-medium-20 text-gray-900">Activer les cookies</h2>

      <p className="mt-4 p-medium-14 text-gray-900">
        Ce site web utilise des cookies pour améliorer votre expérience. En continuant à naviguer sur le site, vous
        acceptez notre utilisation des cookies. Veuillez consulter notre{' '}
        <Link href="/policies.txt">politique de confidentialité </Link> pour en savoir plus sur la manière dont nous
        utilisons les cookies et comment vous pouvez les désactiver.
      </p>

      <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
        {/*         <button className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
          Gérez vos préférences
        </button> */}

        <Button className="text-xs" onClick={consentHandler}>
          {' '}
          Accepter
        </Button>
      </div>
    </section>
  );
}

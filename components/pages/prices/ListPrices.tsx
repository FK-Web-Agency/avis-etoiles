'use client';

// TODO - Toggle the frequency between monthly and annually
// TODO - Stripe checkout

import { PricesProps } from '@/interfaces/sanity';
import { Icons } from '@/components/shared';
import CheckoutButton from '@/components/shared/CheckButton';
import { useState } from 'react';
import { classNames } from '@/helper';

// Define the frequency options
const frequencies = [
  { value: 'month', label: 'Mois', priceSuffix: '/mois' },
  { value: 'year', label: 'Annuel', priceSuffix: '/an' },
];

type ListPricesType = {
  prices_list_section: PricesProps;
};

export default function ListPrices({ prices_list_section }: ListPricesType) {
  const [frequency, setFrequency] = useState(frequencies[0]);

  // Function to handle frequency change
  const handleFrequencyChange = () => {
 
    setFrequency((prev) => (prev.value === 'month' ? frequencies[1] : frequencies[0]));
  };

  return (
    <>
      {/* Frequency buttons */}
      <div className="mb-10 flex justify-center">
        <div className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center p-semibold-14 ring-1 ring-inset ring-gray-200">
          {/* Monthly button */}
          <button
            onClick={handleFrequencyChange}
            className={classNames(
              'cursor-pointer rounded-full px-2.5 py-1',
              frequency.value === 'month' ? 'bg-primary text-white' : 'text-gray-500'
            )}>
            <span>Mois</span>
          </button>
          {/* Annually button */}
          <button
            onClick={handleFrequencyChange}
            className={classNames(
              'cursor-pointer rounded-full px-2.5 py-1',
              frequency.value === 'year' ? 'bg-primary text-white' : 'text-gray-500'
            )}>
            <span>Annuel</span>
          </button>
        </div>
      </div>
      {/* Prices grid */}
      <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {prices_list_section.map((price) => {
          const priceSubscribe = frequency.value === 'month' ? price.price : price.price * 12;
          return (
            <div
              key={price._id}
              className={classNames(
                !price.price ? 'bg-gray-800 ring-gray-800' : 'bg-gray-200 ring-gray-200',
                'rounded-3xl p-8 ring-1 xl:p-10'
              )}>
              {/* Price title */}
              <h3
                id={price._id}
                className={classNames(
                  !price.price ? 'text-white' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                )}>
                {price.title}
              </h3>
              {/* Price description */}
              <p className={classNames(!price.price ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6')}>
                {price.description}
              </p>
              {/* Price value */}
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={classNames(
                    !price.price ? 'text-white' : 'text-gray-900',
                    'text-4xl font-bold tracking-tight mb-8'
                  )}>
                  {price.price ? priceSubscribe : 'Personnaliser'}
                </span>
                {/* Price suffix */}
                {price.price ? (
                  <span
                    className={classNames(
                      !price.price ? 'text-gray-300' : 'text-gray-600',
                      'text-sm font-semibold leading-6'
                    )}>
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
              {/* Checkout button */}
              <CheckoutButton key={price?._id} plan={{...price, frequency: frequency.value, price: priceSubscribe}} />
              {/* Features list */}
              <ul
                role="list"
                className={classNames(
                  !price.price ? 'text-gray-300' : 'text-gray-600',
                  'mt-8 space-y-3 text-sm leading-6 xl:mt-10'
                )}>
                {price?.features.map((feature: string) => (
                  <li key={feature} className="flex gap-x-3">
                    {/* Checked icon */}
                    <Icons.Checked
                      className={classNames(!price.price ? 'text-white' : 'text-yellow-500', 'h-6 w-5 flex-none')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

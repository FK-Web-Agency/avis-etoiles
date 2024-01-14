import { PortableText } from '@portabletext/react';

import { PricesProps } from '@/Type';
import { Icons } from '@/components/shared';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  TextGradient,
} from '@/components/ui';
import { ContainerCard } from '@/components/ui/custom-card';
import { client, queries } from '@/sanity/lib';
import CheckoutButton from '@/components/shared/CheckButton';


export default async function Prices() {
  const { introduction_section, prices_list_section, faqs__section } = await client.fetch(
    queries.GET_PRICES_PAGE
  );

  return (
    <main className="wrapper main">
      {/* ------------------------------ Introduction ------------------------------ */}
      <section>
        <TextGradient component="h1" className="h1-bold" segments={introduction_section?.title} />
        <p className="mt-5">{introduction_section?.subtitle}</p>
      </section>

      {/* ------------------------------- List Prices ------------------------------ */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {prices_list_section?.map(
            ({ title, description, price, features, _id }: PricesProps, index: number) => (
              <ContainerCard className="max-w-sm mx-auto" key={index}>
                <div className="p-5 flex flex-col gap-5 animate-fade-left animate-once animate-duration-1000 group h-full max-w-sm mx-auto ">
                  <h3 className="h4-medium">{title}</h3>
                  <p>{description}</p>

                  {/* ---------------------------------- Price --------------------------------- */}
                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-5xl font-extrabold text-zinc-200">
                      {price ? `${price} €` : 'Custom'}{' '}
                    </span>
                  </div>

                  {/* -------------------------------- Features -------------------------------- */}
                  <ul className="flex flex-col gap-2 mb-8">
                    {features?.map((feature: string, index: number) => (
                      <li key={index} className="flex gap-2">
                        <Icons.Checked className="w-5 h-5 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <CheckoutButton plan={{title, price, _id: 8}} />
                </div>
              </ContainerCard>
            )
          )}
        </div>
      </section>

      {/* ---------------------------------- FAQs ---------------------------------- */}
      <section id="faqs">
        <div className="grid lg:grid-cols-2 lg:gap-10 gap-5">
          {/* ------------------------------ Text content ------------------------------ */}
          <div>
            <h2 className="h1-bold mb-5">{faqs__section?.title} </h2>

            {faqs__section?.description.map((item: any, index: number) => (
              <PortableText key={index} value={item} />
            ))}
          </div>

          {/* ------------------------------ Questions list ----------------------------- */}
          <Accordion type="single" collapsible>
            {faqs__section?.faqs?.map(
              ({ question, answer }: { question: string; answer: string }) => (
                <AccordionItem key={question} value={question}>
                  <AccordionTrigger>
                    <h3 className="text-white">{question}</h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-400">{answer} </p>
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  TextGradient,
} from '@/components/ui';
import { client, queries } from '@/sanity/lib';
import { ListPrices } from '@/components/pages/prices';
import { generateMetadataWithSanity } from '@/helper';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataWithSanity('GET_PRICES_PAGE');
}

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
        <ListPrices {...{ prices_list_section }} />
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

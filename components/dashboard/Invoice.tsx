import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { client, queries } from '@/sanity/lib';
import { z } from 'zod';

const InvoiceSchema = z.object({
    plan: z.string(),
    price: z.number(),
    buyerId: z.string()
})


type InvoiceProps = z.infer<typeof InvoiceSchema>

function generateInvoiceNumber() {
  const prefix = 'AE-';
  const suffix = Math.floor(1000 + Math.random() * 9000); // generates a 4 digit random number
  return prefix + suffix;
}

export default async function Invoice({ plan = 'essentiel', price = 80, buyerId = 'GwOYc1wtiCKmR3M3HHAO0r' }: InvoiceProps) {
  const invoiceNumber = generateInvoiceNumber();

  const { address, phone, logo, email, vat } = await client.fetch(queries.GET_GENERAL);

  const buyer = await client.fetch(
    `*[_type == "${process.env.NEXT_PUBLIC_SANITY_SUBSCRIBERS}" && _id == "${buyerId}"][0]`
  );

  return (
    <div className="py-4 bg-white">
      <div className="px-14 py-6">
        <Table className="w-full border-collapse border-spacing-0">
          <TableBody className="flex justify-between">
            <TableRow>
              <h1 className="h4-medium text-gray-900">Avis Étoiles 🎁</h1>
            </TableRow>

            <TableRow className="flex gap-4">
              <div className="border-r pr-4">
                <p className="whitespace-nowrap text-slate-400 text-right">Date</p>
                <p className="whitespace-nowrap font-bold text-main text-right">April 26, 2023</p>
              </div>

              <div>
                <p className="whitespace-nowrap text-slate-400 text-right">Facture #</p>
                <p className="whitespace-nowrap font-bold text-main text-right">{invoiceNumber}</p>
              </div>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-slate-100 px-14 py-6 text-sm">
        <Table className="w-full border-collapse border-spacing-0">
          <TableBody>
            <TableRow>
              <TableHead>
                <div className="text-sm text-neutral-600">
                  <p className="font-bold">Avis étoiles</p>
                  <p>Téléphone : {phone} </p>
                  <p>email: {email} </p>
                  <p>TVA: {vat}</p>
                  <p>{address.street} </p>
                  <p>
                    {address.city}, {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </TableHead>

              <TableHead className="text-right">
                <div className="text-sm text-neutral-600">
                  <p className="font-bold">{buyer?.companyName} </p>
                  <p>Téléphone: {buyer?.phone} </p>
                  <p>TVA: {buyer?.vat || 'N/A'} </p>
                  <p>{buyer?.address?.street} </p>
                  <p>
                    {buyer?.address?.city}, {buyer?.address?.zipCode}
                  </p>
                  <p>{buyer?.address?.country}</p>
                </div>
              </TableHead>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="px-14 py-10 text-sm text-neutral-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 font-semibold text-center">#</TableHead>
              <TableHead className="text-gray-900 font-semibold text-center">Details du produit</TableHead>
              <TableHead className="text-gray-900 font-semibold text-center">Prix</TableHead>
              <TableHead className="text-gray-900 font-semibold text-center">Quantité</TableHead>
              <TableHead className="text-gray-900 font-semibold text-center">TVA</TableHead>
              <TableHead className="text-gray-900 font-semibold text-center">Sous-total</TableHead>
              <TableHead className="text-gray-900 font-semibold text-center">Sous-total + TVA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-center">
              <TableCell>1.</TableCell>
              <TableCell>Abonnement {plan || 'Avis Étoiles'}</TableCell>
              <TableCell>{price} €</TableCell>
              <TableCell>1</TableCell>
              <TableCell>20%</TableCell>
              <TableCell>{price} €</TableCell>
              <TableCell>{price * 0.2 + price} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className="w-52 mt-10">
          <TableHeader>
            <TableRow>
              <TableHead>Total Net</TableHead>
              <TableHead>TVA</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>{price * 0.2 + price} €</TableCell>
              <TableCell>{price * 0.2} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="px-14 text-sm text-neutral-700">
        <p className="text-main font-bold">DETAILS DU PAIEMENT</p>
        <p>{price * 0.2 + price}€ par Carte bancaire </p>
      </div>

      <div className="px-14 py-10 text-sm text-neutral-700">
        <p className="text-main font-bold">Notes</p>
        <p className="italic p-medium-12">
          Une question ? contactez contact@avisetoiles.com pour toutes demandes d'informations complémentaires
        </p>
      </div>

      <footer className="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
        Avis Étoiles
        <span className="text-slate-300 px-2">|</span>
        {email}
        <span className="text-slate-300 px-2">|</span>
        {phone}
      </footer>
    </div>
  );
}

import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.SANITY_REVALIDATE_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  const body = await readBody(req); // Read the body into a string

  if (req.method !== 'POST') {
    return res.status(401).json({ message: 'Must be a POST request' });
  }

  console.log('Received request', body, signature, secret);
  if (!isValidSignature(body, signature, secret)) {
    return res.status(401).json({ message: 'Invalid signature' });
  }

  try {
    const { _type: type, slug } = JSON.parse(body);

    return res.json({ message: `Revalidated "${type}" with slug "${slug.current}"` });
  } catch (err) {
    return res.status(500).send({ message: 'Error revalidating' });
  }
}

async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

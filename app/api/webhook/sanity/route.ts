// pages/api/hook.js
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req:any, res:any) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readBody(req); // Read the body into a string
  console.log(body);

  if (!(await isValidSignature(body, signature, secret))) {
    res.status(401).json({ success: false, message: 'Invalid signature' });
    return;
  }

  const jsonBody = JSON.parse(body);
  console.log(jsonBody);
  res.json({ success: true });
}

// Next.js will by default parse the body, which can lead to invalid signatures
async function readBody(readable:any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

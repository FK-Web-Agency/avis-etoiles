// pages/api/hook.js
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const secret = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req:any, res:any) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await req.json(); // Read the body into a string
  console.log(body);

  if (!(await isValidSignature(body, signature, secret))) {
    res.status(401).json({ success: false, message: 'Invalid signature' });
    return;
  }


  res.json({ success: true });
}


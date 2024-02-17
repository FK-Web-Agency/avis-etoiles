import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type Data = {
  message: string;
};

const secret = process.env.SANITY_REVALIDATE_SECRET!;

export async function POST(req: NextRequest) {
  console.log('Received request');

  const signature = req.headers.get(SIGNATURE_HEADER_NAME) as string;
  console.log(signature);

  const body = await readBody(req); // Read the body into a string

  if (!isValidSignature(body, signature, secret)) {
    return NextResponse.json({ message: 'Invalid signature' });
  }

  revalidatePath('/');
  return NextResponse.json({ message: 'Revalidation started' });
}

async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

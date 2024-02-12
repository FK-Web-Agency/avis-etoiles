import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

type Data = {
  message: string;
};

const secret = process.env.SANITY_REVALIDATE_SECRET!;

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) as string;
  //.headers[SIGNATURE_HEADER_NAME]
  const body = await readBody(req); // Read the body into a string

  if (!isValidSignature(body, signature, secret)) {
    NextResponse.json({ message: 'Invalid signature', status: 401 });
    return;
  }

  try {
    const { _type: type, slug } = JSON.parse(body);

    switch (type) {
      case 'post':
        await revalidatePath(`/projects/${slug.current}`); // The particular project
        await revalidatePath(`/projects`); // The Projects page
        await revalidatePath(`/`, 'page'); // The landing page featured projects
        return NextResponse.json({ message: `Revalidated "${type}" with slug "${slug.current}"` });
    }

    return NextResponse.json({ message: 'No managed type' });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' });
  }
}

async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

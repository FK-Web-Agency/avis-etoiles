import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type Data = {
  message: string;
};

const secret = process.env.SANITY_REVALIDATE_SECRET!;

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) as string;
  const body = await readBody(req); // Read the body into a string

  if (!isValidSignature(body, signature, secret)) {
    return NextResponse.json({ message: 'Invalid signature' });
  }

  try {
    const { _type: type, slug } = await req.json();

    console.log('Revalidating', type, slug);

    /* switch (type) {
      case 'post':
        await res.revalidate(`/projects/${slug.current}`); // The particular project
        await res.revalidate(`/projects`); // The Projects page
        await res.revalidate(`/`); // The landing page featured projects
        return res.json({ message: `Revalidated "${type}" with slug "${slug.current}"` });
    }
 */
    revalidatePath('/');
    return NextResponse.json({ revalidated: true, now: Date.now() });

    //  return res.json({ message: 'No managed type' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}

async function readBody(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

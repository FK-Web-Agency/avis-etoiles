export async function POST(req: Request) {
  console.log('webhook sanity');

  return new Response('', { status: 200 });
}

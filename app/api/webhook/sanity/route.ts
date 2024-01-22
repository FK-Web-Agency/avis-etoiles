import { checkoutOrder } from "@/lib/actions/order.actions";

export async function POST(req: Request) {
  const body = await req.text();

  const query = await req.json();

  console.log('query', query);
  console.log('body', body);
  
  
//  await checkoutOrder(order);

  return new Response('', { status: 200 });
}

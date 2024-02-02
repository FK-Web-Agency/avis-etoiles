import { NextResponse } from 'next/server';
import { auth, clerkClient, currentUser } from '@clerk/nextjs';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const members = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: process.env.NEXT_PUBLIC_CLERK_ORGANIZATION_ID!,
  });

  const member = members.find((m: any) => m.publicUserData.userId === userId);

  console.log(member);
  

  if (!member) {
    return NextResponse.json({ role: 'member' });
  }

  return NextResponse.json({ role: 'admin' });
}

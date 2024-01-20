'use server';

import { MemberProps } from '@/components/forms/CreateMemberForm';
import { clerkClient } from '@clerk/nextjs';
import { generate } from 'generate-password';

export async function createMember(value: MemberProps) {
  
  await clerkClient.users.createUser({
    emailAddress: [value.information.email],
    password: generate({
      length: 10,
      numbers: true,
    }),
    firstName: value.information.firstName,
    lastName: value.information.lastName,
    username: value.information.firstName + value.information.lastName,
    phoneNumber: [value.information.phone],
    privateMetadata: {
      companyName: value.information.companyName,
      siret: value.information.siret,
      role: value.information.role,
      address: {
        street: value.address.street,
        city: value.address.city,
        zipCode: value.address.zipCode,
        country: value.address.country,
      },
      subscription: {
        free: value.subscription.free,
        status: value.subscription.expirationDate ? true : false,
        plan: value.subscription.plan,
        startDate: value.subscription.startDate,
        expirationDate: value.subscription.expirationDate,
      },
    },
  });
}

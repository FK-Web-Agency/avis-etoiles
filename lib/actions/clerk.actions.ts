'use server';

import { clerkClient } from '@clerk/nextjs';
import { generate } from 'generate-password';
import { MemberProps } from '@/components/forms/CreateMemberForm';
import { formatDate } from '@/helper';
import sendEmail from './resend.actions';

export async function createMember(value: MemberProps) {
  const password = generate({
    length: 10,
    numbers: true,
  });
  try {
    // Create user
    await clerkClient.users.createUser({
      emailAddress: [value.information?.email],
      password,
      firstName: value.information?.firstName,
      lastName: value.information?.lastName,
      // username: value.information?.firstName + value.information?.lastName,
      publicMetadata: {
        phoneNumber: value.information?.phone,
        companyName: value.information?.companyName,
        siret: value.information?.siret,
        role: value.information?.role,
        address: {
          street: value.address?.street,
          city: value.address?.city,
          zipCode: value.address?.zipCode,
          country: value.address?.country,
        },
        subscription: {
          free: value.subscription?.free,
          status: value.subscription?.expirationDate ? true : false,
          plan: value.subscription?.plan,
          startDate: formatDate(value.subscription?.startDate),
          expirationDate: formatDate(value.subscription?.expirationDate),
        },
      },
    });

    // Send email
    await sendEmail({
      email: value.information?.email,
      subject: "Confirmation d'adhesion",
      emailTemplate: 'welcome',
      password,
    });

    return { status: 'success', message: 'Le membre a été créé avec succès.', password };
  } catch (error: any) {
    console.log(error);

    return { status: 'error', message: JSON.stringify(error) };
  }
}

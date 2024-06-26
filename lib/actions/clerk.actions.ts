'use server';

import { clerkClient } from '@clerk/nextjs';
import { generate } from 'generate-password';
import { formatDate } from '@/helper';
import sendEmail from './resend.actions';

const password = generate({
  length: 10,
  numbers: true,
});
// Create member
export async function createMember(value: any) {
  try {
    // Create user
    const response = await clerkClient.users.createUser({
      emailAddress: [value.information?.email],
      password,
      firstName: value.information?.firstName,
      lastName: value.information?.lastName,
      // username: value.information?.firstName + value.information?.lastName,
      publicMetadata: {
        phoneNumber: value.information?.phoneNumber,
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
          status: value.subscription?.free ? true : false,
          plan: value.subscription?.plan,
          startDate: value.subscription?.startDate
            ? formatDate(value.subscription?.startDate)
            : null,
          //  expirationDate: value.subscription?.expirationDate ? formatDate(value.subscription?.expirationDate) : null,
        },
        seller: value.seller,
      },
    });

    console.log(response);

    // Send email
    await sendEmail({
      email: value.information?.email,
      subject: "Confirmation d'adhesion",
      emailTemplate: 'welcome',
      password,
    });

    return {
      status: 'success',
      message: 'Le membre a été créé avec succès.',
      clerkId: response.id,
      photo: response.imageUrl,
      password,
    };
  } catch (error: any) {
    console.log(error);
    if (error.status === 422)
      return { status: 'error', message: "L'adresse email existe déjà." };
    return { status: 'error', message: JSON.stringify(error) };
  }
}

export async function updateUserMetadata(id: string, sanityId: string) {
  await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      userId: sanityId,
    },
  });
}

// Create teams
export async function createTeam(value: any) {
  try {
    // Create user
    const teamMember = await clerkClient.users.createUser({
      emailAddress: [value.email],
      password,
      firstName: value.firstName,
      lastName: value.lastName,
      publicMetadata: {
        phoneNumber: value.phoneNumber,
        role: value.information?.role,
      },
    });

    return { clerkId: teamMember.id, password };
  } catch (error) {
    console.log(error);

    return { status: 'error', message: JSON.stringify(error) };
  }
}
// Update email address
export async function updateMemberEmail(id: string, user: any) {
  try {
    const { emailAddresses } = await clerkClient.users.getUser(id);
    let emailId;

    const emailExist = emailAddresses.find(
      (email) => email.emailAddress === user.email
    );
    emailId = emailExist?.id;

    // Create new email address, this method will return an object with the id of the new email address
    if (!emailExist) {
      const newEmail = await clerkClient.emailAddresses.createEmailAddress({
        userId: id,
        emailAddress: user.email,
        verified: true,
      });

      emailId = newEmail.id;
    }
    const params = {
      primaryEmailAddressID: emailId,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await clerkClient.users.updateUser(id, params);

    return {
      status: 'success',
      message: "L'adresse email a été modifiée avec succès.",
    };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

// Change password
export async function changeMemberPassword(id: string, password: string) {
  try {
    await clerkClient.users.updateUser(id, { password });

    return {
      status: 'success',
      message: 'Le mot de passe a été modifié avec succès.',
    };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

// Update member information public_metadata
export async function updateMemberInformation(id: string, user: any) {
  try {
    const params = {
      publicMetadata: {
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        siret: user.siret,
        role: user.role,
        address: user.address,
      },
    };

    await clerkClient.users.updateUserMetadata(id, params);

    return {
      status: 'success',
      message: 'Les informations ont été modifiées avec succès.',
    };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

// update member role
export async function updateMemberRole(id: string, role: string) {
  try {
    if (role === 'admin') {
      await clerkClient.organizations.createOrganizationMembership({
        userId: id,
        role: 'Admin',
        organizationId: process.env.NEXT_PUBLIC_CLERK_ORGANIZATION_ID!,
      });
    } else {
      await clerkClient.organizations.deleteOrganizationMembership({
        userId: id,
        organizationId: process.env.NEXT_PUBLIC_CLERK_ORGANIZATION_ID!,
      });
    }
    return { status: 'success', message: 'Le role a été modifié avec succès.' };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

export async function createMembership(id: string, role: string) {
  try {
    await clerkClient.organizations.createOrganizationMembership({
      userId: id,
      role,
      organizationId: process.env.NEXT_PUBLIC_CLERK_ORGANIZATION_ID!,
    });

    return { status: 'success', message: 'Le role a été modifié avec succès.' };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

// Update member subscription
export async function toggleRoleMembership(id: string, role: string) {
  try {
    await clerkClient.organizations.updateOrganizationMembership({
      userId: id,
      role,
      organizationId: process.env.NEXT_PUBLIC_CLERK_ORGANIZATION_ID!,
    });

    return { status: 'success', message: 'Le role a été modifié avec succès.' };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

// Delete member
export async function deleteMember(id: string) {
  try {
    await clerkClient.users.deleteUser(id);

    return {
      status: 'success',
      message: 'Le membre a été supprimé avec succès.',
    };
  } catch (error: any) {
    return { status: 'error', message: JSON.stringify(error) };
  }
}

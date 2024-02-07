import { z } from 'zod';
import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { updateMemberInformation } from '@/lib/actions/clerk.actions';

export default function EditInformation({ user }: { user: any }) {
  const { toast } = useToast();

  // Schema for the form
  const EditInformationSchema = z.object({
    role: z.enum(['admin', 'member']).default(user?.role).optional(),
    companyName: z.string().min(2).max(100).describe('Nom de la société').default(user?.companyName).optional(),
    phoneNumber: z
      .string()
      .describe('Numéro de téléphone')
      .max(22, {
        message: 'Le numéro de téléphone est trop long',
      })
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de téléphone doit être une valeur numérique',
      })
      .describe('Numéro de téléphone')
      .optional()
      .default(user?.phone),
    siret: z
      .string()
      .min(9, {
        message: 'Le numéro SIRET doit contenir 14 chiffres',
      })
      .max(14, {
        message: 'Le numéro SIRET doit contenir 14 chiffres',
      })
      .describe('Numéro SIRET ou SIREN')
      .refine((value) => !isNaN(Number(value)), {
        message: 'Le numéro de SIRET/SIREN doit être une valeur numérique',
      })
      .optional()
      .default(user?.siret),
    address: z
      .object({
        street: z.string().describe('Rue').optional().default(user?.address?.street),
        city: z.string().describe('Ville').optional().default(user?.address?.city),
        zipCode: z
          .string()
          .describe('Code postal')
          .max(5)
          .refine((value) => !isNaN(Number(value)), {
            message: 'Le numéro de code postal doit être une valeur numérique',
          })
          .optional()
          .default(user?.address?.zipCode),
        country: z.string().describe('Pays').optional().default(user?.address?.country),
      })
      .describe('Adresse Postale')
      .optional(),
  });

  // Handle update data in sanity and clerk public_metadata
  const handleAction = async function (values: any) {
    const { status, message } = await updateMemberInformation(user?.clerkId, values);

    status === 'success'
      ? toast({
          description: 'Votre profil a été mis à jour',
        })
      : toast({
          variant: 'destructive',
          title: 'Uh oh! Quelque chose a mal tourné.',
          description: message,
        });
  };

  return (
    <section className="pb-8 mb-8 border-b border-gray-600">
      <h4 className="subtile-dashboard">Profil</h4>

      <AutoForm onAction={handleAction} formSchema={EditInformationSchema}>
        <AutoFormSubmit variant={'secondary'} className="text-gray-900">
          Mettre à jour
        </AutoFormSubmit>
      </AutoForm>
    </section>
  );
}

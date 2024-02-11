'use client';
import { z } from 'zod';
import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { checkoutOrder } from '@/lib/actions/order.actions';
import sendEmail from '@/lib/actions/resend.actions';
enum Recurring {
  monthly = 'Mois',
  yearly = 'Année',
  punctual = 'Ponctuel',
}

export default function EditSubscription({ user }: any) {
  const { toast } = useToast();

  const EditSubscriptionSchema = z.object({
    free: z.boolean().default(false).describe('Abonnement gratuit').default(user?.subscription?.free).optional(),
    plan: z.enum(['essential', 'premium', 'enterprise']).default(user?.subscription?.plan).optional(),
    // @ts-ignore
    recurring: z.nativeEnum(Recurring).default(Recurring[user?.subscription?.recurring]).describe('Renouvellement'),
    startDate: z.date().describe('Date de début').default(new Date(user?.subscription?.startDate)),
    expirationDate: z.date().describe('Date de fin').default(new Date(user?.subscription?.expirationDate)),
    price: z.string().default(user?.subscription?.price).describe('Prix').default(user?.subscription?.price),
  });

  type EditSubscriptionProps = z.infer<typeof EditSubscriptionSchema>;

  // Handle form actions
  const handleAction = async function (values: EditSubscriptionProps) {
    let resend;

    if (!values.free) {
      // Create A link Stripe for payment
      const order = {
        id: user._id,
        title: values?.plan,
        price: values?.price,
      };

      const url = await checkoutOrder(order);

      // Send a email to the user with the link Stripe
      resend = await sendEmail({
        email: user?.email,
        subject: 'Paiement de votre abonnement',
        emailTemplate: 'payment',
        companyName: user?.companyName,
        url,
      });
    } else {
      // Send a email to the user for confirm the subscription
      resend = await sendEmail({
        email: user?.email,
        subject: 'Confirmation de votre abonnement',
        emailTemplate: 'confirm-subscription',
        companyName: user?.companyName,
      });
    }

    // Return a toast with the result of the request
    return resend?.status === 'success'
      ? toast({
          title: 'Abonnement mis à jour',
          description: values?.free ? 'Un email de paiement a été envoyé' : 'Un email de confirmation a été envoyé',
        })
      : toast({
          variant: 'destructive',
          title: 'Uh oh! Quelque chose a mal tourné.',
          description: resend?.message,
        });
  };

  return (
    <section>
      <h4 className="subtile-dashboard">Gérer l'abonnement</h4>
      <AutoForm
        onAction={handleAction as unknown as (values: EditSubscriptionProps) => Promise<void>}
        formSchema={EditSubscriptionSchema}>
        <AutoFormSubmit variant={'secondary'} className="text-gray-900">
          Mettre à jour
        </AutoFormSubmit>
      </AutoForm>
    </section>
  );
}

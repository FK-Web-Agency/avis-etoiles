'use client';
import { z } from 'zod';
import { AutoForm, AutoFormSubmit, useToast } from '@/components/ui';
import { checkoutOrder, updateSubscription } from '@/lib/actions/order.actions';
import sendEmail from '@/lib/actions/resend.actions';
import { client } from '@/sanity/lib';
enum Recurring {
  monthly = 'Mois',
  yearly = 'Année',
  punctual = 'Ponctuel',
}

export default function EditSubscription({ user }: any) {
  const { toast } = useToast();

  const EditSubscriptionSchema = z.object({
    free: z
      .boolean()
      .default(false)
      .describe('Abonnement gratuit')
      .default(user?.subscription?.free)
      .optional(),
    plan: z
      .enum(['essential', 'premium', 'etoile'])
      .default(user?.subscription?.plan)
      .optional(),
    // @ts-ignore
    recurring: z
      .nativeEnum(Recurring)

      // @ts-ignore
      .default(Recurring[user?.subscription?.recurring])
      .describe('Renouvellement'),
    //startDate: z.date().describe('Date de début').default(new Date(user?.subscription?.startDate)),
    //expirationDate: z.date().describe('Date de fin').default(new Date(user?.subscription?.expirationDate)),
    price: z
      .string()
      .default(user?.subscription?.price)
      .describe('Prix')
      .default(user?.subscription?.price),
  });

  type EditSubscriptionProps = z.infer<typeof EditSubscriptionSchema>;

  // Handle form actions
  const handleAction = async function (values: EditSubscriptionProps) {
    let resend;

    try {
      if (!values.free) {
        const order = {
          customer_id: user?.stripeId,
          price: values?.price,
          recurring: values?.recurring === 'Mois' ? 'month' : 'year',
          title: values?.plan === 'essential' ? 'essentiel' : values?.plan,
        };

        await updateSubscription(order);

        const plan = values?.plan === 'essential' ? 'essentiel' : values?.plan;

        await client
          .patch(user._id)
          .set({
            subscription: {
              ...user?.subscription,
              plan,
              recurring: values?.recurring === 'Mois' ? 'mois' : 'an',
              price: Number(values?.price),
            },
          })
          .commit();

        // Send a email to the user with the link Stripe
     /*    resend = await sendEmail({
          email: user?.email,
          subject: 'Paiement de votre abonnement',
          emailTemplate: 'payment',
          companyName: user?.companyName,
          url,
        }); */
      } else {
        const order = {
          customer_id: user?.stripeId,
          price: 0,
          recurring: values?.recurring === 'Mois' ? 'month' : 'year',
          title: values?.plan === 'essential' ? 'essentiel' : values?.plan,
        };

        await updateSubscription(order);
        // Send a email to the user for confirm the subscription

        // TODO create a new email template for this
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
            description: values?.free
              ? 'Un email de paiement a été envoyé'
              : 'Un email de confirmation a été envoyé',
          })
        : toast({
            variant: 'destructive',
            title: 'Uh oh! Quelque chose a mal tourné.',
            description: resend?.message,
          });
    } catch (error) {
      console.log('====================================');
      console.log('update subscription error', error);
      console.log('====================================');
    }
  };

  return (
    <section>
      <h4 className="subtile-dashboard">Gérer l'abonnement</h4>
      <AutoForm
        onAction={
          handleAction as unknown as (
            values: EditSubscriptionProps
          ) => Promise<void>
        }
        formSchema={EditSubscriptionSchema}>
        <AutoFormSubmit variant={'secondary'} className="text-gray-900">
          Mettre à jour
        </AutoFormSubmit>
      </AutoForm>
    </section>
  );
}

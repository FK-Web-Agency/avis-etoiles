import { Icons } from '@/components/shared';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex-center min-h-screen w-full background-body gap-4 flex-col">
      <Icons.Logo />

      <SignIn
        appearance={{
          variables: {
            colorPrimary: 'hsl(47.9, 95.8% ,53.1%)',
          },
          elements: {
            footer: 'hidden',
          },
        }}
      />
    </div>
  );
}

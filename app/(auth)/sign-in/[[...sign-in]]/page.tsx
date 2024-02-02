import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Page() {
  return (
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
  );
}

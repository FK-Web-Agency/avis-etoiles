import { CreateMemberForm } from '@/components/forms';
import { GoBack } from '@/components/shared';

export default function CreateMember() {
  return (
    <>
      <GoBack resource="members" action="list" label="Créer un membre" />

      <CreateMemberForm />
    </>
  );
}

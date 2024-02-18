import { Icons } from '@/components/shared';

export default function Spinner() {
  return (
    <div className="flex-center h-screen">
      <Icons.Spinner  className="w-8 h-8 animate-spin"/>
    </div>
  );
}

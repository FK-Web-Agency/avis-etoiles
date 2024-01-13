'use client';

import { InformationFooterProps } from '@/Type';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useState } from 'react';
import { PortableText } from '@portabletext/react';

export default function InformationFooter({ informations }: any) {
  const [contentSelected, setContentSelected] = useState<InformationFooterProps | null>(null);

  console.log(informations);

  return (
    <Dialog>
      {informations?.map(
        (information: any) =>
          (
            <li className='p-5-regular'>
              <DialogTrigger className='text-left' onClick={() => setContentSelected(information)}>
                {information?.title}
              </DialogTrigger>
            </li>
          )
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{contentSelected?.title} </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            {contentSelected?.content?.map((item: any, index: number) => (
              <PortableText key={index} value={item} />
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

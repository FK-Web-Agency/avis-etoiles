import { PropsWithChildren } from 'react';
import { PortableText } from '@portabletext/react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Dialog,
  DialogContent,
  DialogTrigger,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui';
import { classNames } from '@/helper';
import { useList } from '@refinedev/core';
import { Icons } from '@/components/shared';
import { RequestForContactForm } from '@/components/forms';

function LegalItem({ children, content }: PropsWithChildren<{ content: any }>) {
  return (
    <Dialog>
      <DialogTrigger className="flex justify-start items-center gap-2">{children}</DialogTrigger>
      <DialogContent className="overflow-y-auto h-3/4 m-auto pt-5">
        <PortableText value={content} />
      </DialogContent>
    </Dialog>
  );
}

export default function Footer({ color }: { color: string }) {
  const { data } = useList({
    resource: 'general',
  });

  const general = data?.data[0];

  return (
    <footer
      style={{ backgroundColor: color }}
      className={classNames(
        color ? null : 'bg-gray-900',
        'p-2 flex items-center gap-4 justify-evenly  p-medium-12 underline mt-10'
      )}>
      <Drawer>
        <DrawerTrigger className="invert">CGU</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Les informations légales</DrawerTitle>
            <DrawerDescription className="mt-4">
              <div className="flex flex-col gap-5">
                <LegalItem content={general?.termsAndConditions.content}>
                  <Icons.Document className="w-4 h-4 invert" />
                  <span className="invert">{general?.termsAndConditions.title} </span>
                </LegalItem>

                <LegalItem content={general?.privacyPolicy.content}>
                  <Icons.Document className="w-4 h-4 invert" />
                  <span className="invert">{general?.privacyPolicy.title} </span>
                </LegalItem>

                <LegalItem content={general?.legalNotice.content}>
                  <Icons.Document className="w-4 h-4 invert" />
                  <span className="invert">{general?.legalNotice.title} </span>
                </LegalItem>

                <LegalItem content={general?.termsOfUse.content}>
                  <Icons.Document className="w-4 h-4 invert" />
                  <span className="invert">{general?.termsOfUse.title} </span>
                </LegalItem>
              </div>
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Fermer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger className="invert">Contact Pro</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Vous souhaitez mettre en place un jeu similaire dans votre entreptise</DrawerTitle>
            <DrawerDescription>Laissez-nous vos coordonnées et nous vous recontacterons rapidement.</DrawerDescription>
          </DrawerHeader>

          <RequestForContactForm>
            <DrawerFooter className="flex items-center flex-row justify-start">
              <DrawerClose>
                <Button>Envoyer</Button>
              </DrawerClose>
              <DrawerClose>
                <Button variant="outline">Annuler</Button>
              </DrawerClose>
            </DrawerFooter>
          </RequestForContactForm>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger className="invert">Aide</DrawerTrigger>
        <DrawerContent>
          <Accordion className="p-4" type="single" collapsible>
            <AccordionItem value={'1'}>
              <AccordionTrigger>
                <h3>Je n'arrive pas à jouer après avoir noté l'établissement sur Google. Que dois-je faire ?</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-400">
                  Assurez-vous que votre compte de jeu est bien lié à votre compte Google. Si le problème persiste,
                  vérifiez votre connexion internet et essayez de redémarrer l'application.{' '}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value={'2'}>
              <AccordionTrigger>
                <h3>
                  Je rencontre des difficultés à jouer après avoir visité les réseaux sociaux de l'établissement.
                  Comment résoudre cela ?
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-400">
                  Vérifiez si l'accès aux réseaux sociaux n'a pas entraîné une déconnexion de votre compte de jeu.
                  Essayez de vous reconnecter à votre compte de jeu et de rafraîchir la page.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value={'2'}>
              <AccordionTrigger>
                <h3>
                  Je rencontre des difficultés à jouer après avoir visité les réseaux sociaux de l'établissement.
                  Comment résoudre cela ?
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-400">
                  Assurez-vous que l'application de jeu est mise à jour. Si le problème survient après avoir utilisé
                  Facebook, essayez de fermer toutes les applications en arrière-plan et relancez le jeu.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Fermer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </footer>
  );
}

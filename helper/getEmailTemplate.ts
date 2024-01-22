import { Contact, Welcome } from '@/emails';

export default function getEmailTemplate(templateName: string, data: any) {
  switch (templateName) {
    case 'contact':
      return Contact(data);
    case 'welcome':
      return Welcome(data);
    default:
      throw new Error(`Email template ${templateName} not found.`);
  }
}

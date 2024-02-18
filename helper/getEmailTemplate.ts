import { Contact } from '@/emails';

export default function getEmailTemplate(templateName: string, data: any) {
  switch (templateName) {
    case 'contact':
      return Contact(data);
    default:
      throw new Error(`Email template ${templateName} not found.`);
  }
}

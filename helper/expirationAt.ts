import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale/fr';

export default function expirationAt(date: Date | undefined) {
  console.log(date);
  
  if (date) {
    if (typeof date === 'string') {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
    }
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  }
}

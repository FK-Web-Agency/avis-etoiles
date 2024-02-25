export function formatDate(isoDate: Date) {
  const newDate = new Date(isoDate);
  const formattedDate = new Intl.DateTimeFormat('fr-FR').format(newDate);

  return formattedDate;
}


export function formatToISOString(dateString: Date): string {
  const formattedDate = dateString.toISOString().split('T')[0];
  return formattedDate;
}

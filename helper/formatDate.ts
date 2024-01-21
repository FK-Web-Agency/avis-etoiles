export default function formatDate(isoDate: Date) {
  const newDate = new Date(isoDate);
  const formattedDate = new Intl.DateTimeFormat('fr-FR').format(newDate);

  return formattedDate;
}

export  function formatDate(isoDate: Date) {
  const newDate = new Date(isoDate);
  const formattedDate = new Intl.DateTimeFormat('fr-FR').format(newDate);

  return formattedDate;
}

export function getTimeBeforeExpiration(expirationDate: Date) {
  const currentDate = new Date();
  console.log(expirationDate );
  
  const timeDifference = expirationDate?.getTime() - currentDate.getTime();
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const daysBeforeExpiration = Math.ceil(timeDifference / millisecondsInDay);

  return daysBeforeExpiration;
}

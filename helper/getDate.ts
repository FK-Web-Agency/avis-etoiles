// Get year from date
export function getYear(date: Date) {
  const newDate = new Date(date);
  const year = newDate.toLocaleString('fr-FR', { year: 'numeric' });

  return Number(year);
}

// Get month from date
export function getMonth(date: Date) {
  const newDate = new Date(date);
  const month = newDate.toLocaleString('fr-FR', { month: 'long' });

  return month;
}

// Fonction pour vérifier si 24 heures se sont écoulées depuis une date donnée
// et pour calculer le temps restant si ce n'est pas le cas
export function check24HoursPast(date: Date) {
  const givenDate = new Date(date);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - givenDate.getTime();
  const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
  const differenceInMinutes = Math.floor((differenceInTime % (1000 * 3600)) / (1000 * 60));

  if (differenceInTime >= 86400000) {
    // 86400000 millisecondes = 24 heures
    console.log('24 heures se sont écoulées depuis la date donnée.');
    return '24 heures se sont écoulées depuis la date donnée.';
  } else {
    const hoursRemaining = 23 - differenceInHours; // 23 parce qu'on calcule le reste jusqu'à la prochaine heure complète
    const minutesRemaining = 59 - differenceInMinutes; // 59 pour obtenir le nombre de minutes restantes jusqu'à l'heure suivante
    console.log(`${hoursRemaining} heures et ${minutesRemaining} minutes restantes avant 24 heures.`);

    return `${hoursRemaining} heures et ${minutesRemaining} minutes restantes avant 24 heures.`;
  }
}

export function calculate24HoursEnd(date: Date) {
  const givenDate = new Date(date);
  // Ajoute 24 heures à la date donnée
  const endDate = new Date(givenDate.getTime() + 24 * 60 * 60 * 1000);

  // Formate la date et l'heure de fin
  const endDateString = endDate.toLocaleString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return endDateString;
}

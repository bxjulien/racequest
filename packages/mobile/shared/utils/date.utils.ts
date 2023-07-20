export function getDaysFromNowToDate(date: Date) {
  date = new Date(date);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24));

  return days;
}

export function getDateUntilNumberOfDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return date;
}

export function getShortDate(date: Date) {
  const month = date.toLocaleString('fr-FR', { month: 'long' });
  const day = date.getDate();

  return `${day} ${month}`;
}

export function getVerboseDate(date: Date) {
  const days = getDaysFromNowToDate(date);

  if (days < 0) {
    return 'Date passée';
  }

  if (days === 0) {
    return "Aujourd'hui";
  }

  if (days === 1) {
    return 'Demain';
  }

  if (days === 2) {
    return 'Après-demain';
  }

  return `Dans ${days} jours`;
}

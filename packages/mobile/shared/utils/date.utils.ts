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

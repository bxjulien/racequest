export const getTodayAtMidnight = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getDayFromTodayPlusNbDaysAtEndOfDay = (days: number) => {
  const today = new Date();
  today.setDate(today.getDate() + days);
  today.setHours(23, 59, 59, 999);
  return today;
};

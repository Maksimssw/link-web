export const dateFormat = (date?: Date) => {
  if (!date)
    return

  const dateUp = new Date(date);
  const day = dateUp.getDate();
  const month = dateUp.getMonth() + 1;
  const year = dateUp.getFullYear();

  return day + "-" + month + "-" + year;
}

export const getDateRange = (period: string): [Date, Date] => {
  const now = new Date();

  switch (period) {
    case 'today':
      // Начало и конец текущего дня
      const startOfToday = new Date(now.setHours(0, 0, 0, 0));
      const endOfToday = new Date(now.setHours(23, 59, 59, 999));
      return [startOfToday, endOfToday];

    case 'yesterday':
      // Начало и конец вчерашнего дня
      const startOfYesterday = new Date(now);
      startOfYesterday.setDate(now.getDate() - 1);
      startOfYesterday.setHours(0, 0, 0, 0);

      const endOfYesterday = new Date(now);
      endOfYesterday.setDate(now.getDate() - 1);
      endOfYesterday.setHours(23, 59, 59, 999);
      return [startOfYesterday, endOfYesterday];

    case 'current-week':
      // Начало и конец текущей недели (предполагаем, что неделя начинается с понедельника)
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Суммируем с 1 - понедельник
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(now);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Плюс 6 дней
      endOfWeek.setHours(23, 59, 59, 999);
      return [startOfWeek, endOfWeek];

    case 'seven-days':
      // Начало и конец последних 7 дней
      const startOfSevenDays = new Date(now);
      startOfSevenDays.setDate(now.getDate() - 6); // Получаем 7-дневный период
      startOfSevenDays.setHours(0, 0, 0, 0);

      const endOfSevenDays = new Date(now);
      endOfSevenDays.setHours(23, 59, 59, 999);
      return [startOfSevenDays, endOfSevenDays];

    case 'current-month':
      // Начало и конец текущего месяца
      const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999); // Последний день текущего месяца
      return [startOfCurrentMonth, endOfCurrentMonth];

    case 'previous-month':
      // Начало и конец предыдущего месяца
      const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // Последний день предыдущего месяца
      return [startOfPreviousMonth, endOfPreviousMonth];

    case 'last-month':
      // Начало и конец последних 30 дней
      const startOfLast30Days = new Date(now);
      startOfLast30Days.setDate(now.getDate() - 29); // 30 дней назад
      startOfLast30Days.setHours(0, 0, 0, 0);

      const endOfLast30Days = new Date(now);
      endOfLast30Days.setHours(23, 59, 59, 999);
      return [startOfLast30Days, endOfLast30Days];

    case 'current-year':
      // Начало и конец текущего года
      const startOfCurrentYear = new Date(now.getFullYear(), 0, 1);
      const endOfCurrentYear = new Date(now.getFullYear() + 1, 0, 0, 23, 59, 59, 999); // Последний день текущего года
      return [startOfCurrentYear, endOfCurrentYear];

    default:
      throw new Error("Unknown date range period");
  }
}

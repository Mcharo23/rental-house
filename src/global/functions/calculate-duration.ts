export type CalculateDurationProps = {
  years: number;
  months: number;
  days: number;
} | null;

export const CalculateDuration = (date: string): CalculateDurationProps => {
  // Define the two dates
  const startDate = new Date(date);
  const endDate = new Date(); // This will default to the current date

  // Calculate the difference in years, months, and days
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const startDay = startDate.getDate();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const endDay = endDate.getDate();

  let years = endYear - startYear;
  let months = endMonth - startMonth;
  let days = endDay - startDay;

  // Adjust for negative months and days
  if (days < 0) {
    months--;
    const lastMonthEndDate = new Date(endYear, endMonth, 0);
    days += lastMonthEndDate.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

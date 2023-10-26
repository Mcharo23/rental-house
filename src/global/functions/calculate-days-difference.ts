export type CalculateDurationProps = {
  days: number;
};

type Props = {
  start_date: string;
  end_date: string;
};

export const CalculateDaysDifference = ({
  start_date,
  end_date,
}: Props): CalculateDurationProps => {
  const StartDate = new Date(start_date);
  const EndtDate = new Date(end_date);

  const timeDifference = EndtDate.getTime() - StartDate.getTime();
  const days = Math.floor(timeDifference / (1000 * 3600 * 24));

  return { days };
};

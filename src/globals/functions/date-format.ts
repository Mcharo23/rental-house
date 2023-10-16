import { format } from "date-fns";

const FormatDate = (date: Date): string => {
  return format(date, "MM/dd/yyyy");
};

export default FormatDate;

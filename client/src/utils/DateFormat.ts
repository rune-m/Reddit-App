import dayjs from "dayjs";

export const formatDate = (date: string): string => {
  // DD MM YYYY HH mm ss
  const dayjsObj = dayjs(date);
  // dayjsObj.locale("no");

  const oneDayMillis: number = 24 * 60 * 60 * 1000;

  const now: Date = new Date();
  const actualDate: Date = new Date(date);

  // Less than a day, one display hours and minutes
  if (now.getTime() - actualDate.getTime() < oneDayMillis) {
    return dayjsObj.format("HH:mm");
  }

  return dayjsObj.format("DD.MM.YYYY HH:mm");
};

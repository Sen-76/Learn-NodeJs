import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';
import utcPluginFunc from 'dayjs/plugin/utc';
dayjs.extend(utcPluginFunc);
export { dayjs };

export function formatDate(date: string | Date | Dayjs) {
  return dayjs(date).format('DD MMM YYYY') ?? '';
}

export function formatDateTime(date: string | Date | Dayjs) {
  return dayjs(date).format('DD MMM YYYY HH:mm') ?? '';
}

export const cn = (...input: Parameters<typeof clsx>) => {
  return twMerge(clsx(input));
};

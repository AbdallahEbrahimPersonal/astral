import { format, isToday as isTodayFn } from 'date-fns';
import { Event } from '@/types/events';

export const formatDate = (date: string) => {
  const dayName = format(new Date(date), 'EEE');
  const dayNumber = format(new Date(date), 'd');

  const isToday = isTodayFn(new Date(date));

  return { dayName, dayNumber, isToday };
};

export const sortByTime = (a: Event, b: Event) => {
  return (
    new Date(`1970/01/01 ${a.time}`).getTime() -
    new Date(`1970/01/01 ${b.time}`).getTime()
  );
};

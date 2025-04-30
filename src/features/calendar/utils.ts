import { Event } from '@/types/events';

const getEventForDay = (events: Record<string, Event[]>, day: string) => {
  return events[day] || [];
};

export { getEventForDay };

import Calendar from '@/features/calendar';
import { api } from '@/lib/api';
import { EventsByDate } from '@/types/events';

export default async function Home() {
  const events = await getEvents();

  return <Calendar events={events} />;
}

const getEvents = async (): Promise<EventsByDate> => {
  return await api.getEvents();
};

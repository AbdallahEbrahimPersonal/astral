import { EventDetails } from '@/features/event-details';
import { api } from '@/lib/api';

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const event = await getEvent(eventId);

  return <EventDetails event={event} />;
}

const getEvent = async (eventId: string) => {
  return await api.getEventById(eventId);
};

export const dynamic = 'force-dynamic';

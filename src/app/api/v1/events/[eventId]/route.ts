import { NextResponse } from 'next/server';
import events from '@/events.json';

export async function GET(
  _: Request,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params;

  for (const dateEvents of Object.values(events)) {
    const event = dateEvents.find((event) => event.id === eventId);

    if (event) {
      return NextResponse.json(event);
    }
  }

  return NextResponse.json({ error: 'Event not found' }, { status: 404 });
}

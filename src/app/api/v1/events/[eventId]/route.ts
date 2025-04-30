import { NextResponse } from 'next/server';
import events from '@/events.json';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split('/');
  const eventId = pathSegments[pathSegments.length - 1];

  for (const dateEvents of Object.values(events)) {
    const event = dateEvents.find((event) => event.id === eventId);

    if (event) {
      return NextResponse.json(event);
    }
  }

  return NextResponse.json({ error: 'Event not found' }, { status: 404 });
}

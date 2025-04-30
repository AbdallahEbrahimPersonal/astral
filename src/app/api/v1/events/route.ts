import events from '@/events.json';
import { NextResponse } from 'next/server';

/**
 * A simple API route to get all events mocking a real api integration
 * Get all events
 */
export async function GET() {
  return NextResponse.json(events);
}

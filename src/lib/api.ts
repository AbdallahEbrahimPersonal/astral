import { env } from './env';

export const api = {
  getEvents: async () => {
    const response = await fetch(`${env.apiUrl}/api/v1/events`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    return response.json();
  },
  getEventById: async (eventId: string) => {
    const response = await fetch(`${env.apiUrl}/api/v1/events/${eventId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    return response.json();
  },
};

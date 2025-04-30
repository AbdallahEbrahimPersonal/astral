/**
 * @description API URL
 * should be replaced with env variable
 */
const API_URL = 'http://localhost:3000/api/v1';

export const api = {
  getEvents: async () => {
    const response = await fetch(`${API_URL}/events`);

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.statusText}`);
    }

    return response.json();
  },
  getEventById: async (eventId: string) => {
    const response = await fetch(`${API_URL}/events/${eventId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch event: ${response.statusText}`);
    }

    return response.json();
  },
};

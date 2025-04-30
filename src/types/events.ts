interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  time: string;
}

interface EventsByDate {
  [date: string]: Event[];
}

export type { Event, EventsByDate };

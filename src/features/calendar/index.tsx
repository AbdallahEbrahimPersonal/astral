'use client';

import { CalendarProvider } from '@/contexts/calendar';
import { EventsByDate } from '@/types/events';
import { CalendarHeader } from './components/calendar-header';
import { CalendarGrid } from './components/calendar-grid';
interface CalendarProps {
  events: EventsByDate;
}

const Calendar = ({ events }: CalendarProps) => {
  return (
    <CalendarProvider events={events}>
      <div className='flex flex-col h-screen'>
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </CalendarProvider>
  );
};

export default Calendar;

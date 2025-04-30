import { useDroppable } from '@dnd-kit/core';
import { getEventForDay } from '@/features/calendar/utils';
import { useCalendarContext } from '@/contexts/calendar';
import { EventCard } from '@/components/event-card';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date';

interface CalendarColumnProps {
  day: string;
}

export const CalendarColumn = ({ day }: CalendarColumnProps) => {
  const { events } = useCalendarContext();
  const eventsForDay = getEventForDay(events, day) || [];
  const { dayName, dayNumber } = formatDate(day);
  const isMobile = useIsMobile();

  const { setNodeRef, isOver } = useDroppable({
    id: day,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'bg-white shadow-md p-3 view-transition-name-column',
        isMobile ? 'rounded-none mb-0' : 'rounded-lg mb-3',
        isOver && 'ring-2 ring-purple-400'
      )}
    >
      {isMobile && (
        <div className='mb-4'>
          <div
            className={cn('flex items-center gap-2 text-gray-600 font-bold')}
          >
            <p className='text-lg'>{dayName}</p>
            <p className='text-lg mr-2'>{dayNumber}</p>
            <div className='w-full h-[2px] bg-gray-200 bg-gradient-to-r from-blue-200 to-purple-400' />
          </div>
        </div>
      )}
      <div
        className={cn(
          'flex flex-col gap-5',
          !eventsForDay.length && 'justify-center items-center h-full'
        )}
      >
        {eventsForDay.map((event) => (
          <EventCard key={event.id} event={event} day={day} />
        ))}

        {!eventsForDay.length && (
          <div className='text-gray-400 font-medium text-sm capitalize'>
            No events
          </div>
        )}
      </div>
    </div>
  );
};

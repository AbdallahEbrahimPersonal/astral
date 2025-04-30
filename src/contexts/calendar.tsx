import { useCalendar } from '@/hooks/use-calendar';
import { EventsByDate } from '@/types/events';
import { createContext, useContext, useMemo } from 'react';

type CalendarContextType = ReturnType<typeof useCalendar>;

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({
  children,
  events,
}: {
  children: React.ReactNode;
  events: EventsByDate;
}) => {
  const calendar = useCalendar({ events });

  const values = useMemo(() => ({ ...calendar }), [calendar]);

  return (
    <CalendarContext.Provider value={values}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider'
    );
  }

  return context;
};

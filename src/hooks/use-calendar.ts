import { useEffect, useMemo, useState } from 'react';
import { addDays, startOfWeek, format } from 'date-fns';
import { useIsMobile } from './use-is-mobile';
import { EventsByDate } from '@/types/events';
import { localStorageKeys } from '@/lib/local-storage';

interface CalendarProps {
  events: EventsByDate;
}

export enum ViewModes {
  WEEK = 'week',
  DAY = 'day',
}

const useCalendar = ({ events: initialEvents }: CalendarProps) => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.WEEK);

  const isMobile = useIsMobile();

  useEffect(() => {
    setViewMode(isMobile ? ViewModes.DAY : ViewModes.WEEK);

    const lastSelectedDate = localStorage.getItem(
      localStorageKeys.mobileLastSelectedDate
    );

    if (lastSelectedDate) {
      setSelectedDate(lastSelectedDate);

      // we do clear the storage after assigning the date, this is a temporary state for navigation on mobile
      localStorage.removeItem(localStorageKeys.mobileLastSelectedDate);
    }
  }, [isMobile]);

  const currentWeek = useMemo(() => {
    const date = new Date(selectedDate);
    const monday = startOfWeek(date, { weekStartsOn: 1 });

    return Array(7)
      .fill(0)
      .map((_, i) => {
        const newDate = addDays(monday, i);
        return format(newDate, 'yyyy-MM-dd');
      });
  }, [selectedDate]);

  const currentMonth = useMemo(() => {
    if (!selectedDate) return '';

    if (viewMode === ViewModes.DAY) {
      return format(new Date(selectedDate), 'MMMM yyyy');
    } else {
      if (currentWeek.length === 0) return '';

      const firstDate = new Date(currentWeek[0]);
      const lastDate = new Date(currentWeek[currentWeek.length - 1]);

      const firstMonth = format(firstDate, 'MMMM');
      const lastMonth = format(lastDate, 'MMMM');
      const year = format(lastDate, 'yyyy');

      if (firstMonth === lastMonth) {
        return `${firstMonth} ${year}`;
      } else {
        return `${firstMonth} - ${lastMonth} ${year}`;
      }
    }
  }, [selectedDate, viewMode, currentWeek]);

  const navigate = (direction: 'next' | 'previous') => {
    const currentDate = new Date(selectedDate);
    const offset = viewMode === ViewModes.WEEK ? 7 : 1;
    const daysToAdd = direction === 'next' ? offset : -offset;

    const newDate = addDays(currentDate, daysToAdd).toISOString().split('T')[0];
    setSelectedDate(newDate);
  };

  const navigateTransition = (direction: 'next' | 'previous') => {
    if (!document.startViewTransition) {
      navigate(direction);
      return;
    }

    document.startViewTransition(() => {
      navigate(direction);
    });
  };

  const navigateToToday = () => {
    setSelectedDate(new Date().toISOString());
  };

  return {
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    navigateDate: navigateTransition,
    currentWeek,
    navigateToToday,
    currentMonth,
    events,
    setEvents,
  };
};

export { useCalendar };

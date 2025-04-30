import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragOverlay,
} from '@dnd-kit/core';
import { useCalendarContext } from '@/contexts/calendar';
import { ViewModes } from '@/hooks/use-calendar';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Event } from '@/types/events';
import { sortByTime } from '@/lib/date';
import { useRef, useState } from 'react';
import { EventCard } from '@/components/event-card';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation';
import { CalendarColumn } from './calendar-column';

interface DragData {
  event: Event;
  day: string;
}

export const CalendarGrid = () => {
  const {
    currentWeek,
    selectedDate,
    viewMode,
    setEvents,
    events,
    navigateDate,
  } = useCalendarContext();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedEventData, setDraggedEventData] = useState<DragData | null>(
    null
  );
  const edgeTimeoutRef = useRef<NodeJS.Timeout>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
        delay: 200,
      },
    })
  );

  useSwipeNavigation({
    ref: containerRef,
    onSwipeLeft: () => navigateDate('next'),
    onSwipeRight: () => navigateDate('previous'),
    isEnabled: isMobile && !isDragging,
  });

  const days = viewMode === ViewModes.WEEK ? currentWeek : [selectedDate];

  const onDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    setDraggedEventData(event.active.data.current as DragData);
  };

  const onDragMove = (event: DragMoveEvent) => {
    if (!isDragging) return;

    const { delta } = event;

    const edgeThreshold = isMobile ? 0 : 150;

    if (edgeTimeoutRef.current) {
      clearTimeout(edgeTimeoutRef.current);
    }

    if (delta.x > edgeThreshold) {
      edgeTimeoutRef.current = setTimeout(() => {
        navigateDate('next');
      }, 200);
    } else if (delta.x < -edgeThreshold) {
      edgeTimeoutRef.current = setTimeout(() => {
        navigateDate('previous');
      }, 200);
    }
  };

  const onDragEnd = (dragEvent: DragEndEvent) => {
    setIsDragging(false);
    if (edgeTimeoutRef.current) {
      clearTimeout(edgeTimeoutRef.current);
    }

    const { over } = dragEvent;

    if (!over || !draggedEventData) return;

    const { event, day: sourceDay } = draggedEventData;
    const targetDay = over.id as string;

    if (sourceDay === targetDay) {
      setDraggedEventData(null);
      return;
    }

    const currentEvents = { ...events };

    const from = (currentEvents[sourceDay] || []).filter(
      (e) => e.id !== event.id
    );

    const to = currentEvents[targetDay] || [];

    setEvents((prevEvents) => ({
      ...prevEvents,
      [sourceDay]: from,
      [targetDay]: [...to, event].sort(sortByTime),
    }));

    setDraggedEventData(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      modifiers={[restrictToWindowEdges]}
    >
      <main
        ref={containerRef}
        className={cn(
          'grid bg-gradient-to-b from-gray-100 to-gray-200 min-h-full h-full overflow-auto calendar-container',
          isMobile
            ? 'grid-cols-1 gap-0'
            : 'grid-cols-7 gap-4 container-spacing py-4'
        )}
      >
        {days.map((day) => (
          <CalendarColumn key={day} day={day} />
        ))}
      </main>

      <DragOverlay>
        {draggedEventData ? (
          <EventCard
            event={draggedEventData.event}
            day={draggedEventData.day}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

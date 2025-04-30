'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useNavigation } from '@/hooks/use-navigation';
import { Event } from '@/types/events';
import { cn } from '@/lib/utils';
import React from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { localStorageKeys } from '@/lib/local-storage';

interface EventCardProps {
  event: Event;
  day: string;
}

export const EventCard = ({ event, day }: EventCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: event.id,
      data: { event, day },
    });

  const { navigate } = useNavigation();
  const isMobile = useIsMobile();

  const handleClick = () => {
    if (isMobile) {
      localStorage.setItem(localStorageKeys.mobileLastSelectedDate, day);
    }

    navigate(`/events/${event.id}`, { transitionType: 'nav-forward' });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'flex flex-col w-full bg-white rounded-lg shadow-md cursor-pointer',
        isDragging ? 'z-10 shadow-lg cursor-grabbing touch-none' : 'touch-pan-y'
      )}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      onClick={handleClick}
    >
      <ViewTransition name={`event-image-${event.id}`} default={'auto'}>
        <div
          className='relative w-full aspect-video rounded-t-md overflow-hidden bg-cover bg-center'
          style={{ backgroundImage: `url(${event.imageUrl})` }}
        >
          <div className='absolute top-2 left-2 bg-button-gradient text-white text-xs px-2 py-1 rounded-full'>
            {event.time}
          </div>
        </div>
      </ViewTransition>
      <div className='p-3'>
        <h3 className='font-medium line-clamp-1'>{event.title}</h3>
        <p className='text-sm text-gray-600 line-clamp-2 mt-1'>
          {event.description}
        </p>
      </div>
    </div>
  );
};

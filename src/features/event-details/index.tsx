'use client';

import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { Event } from '@/types/events';
import { useNavigation } from '@/hooks/use-navigation';
import { Button } from '@/components/ui/button';

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const { navigate } = useNavigation();

  return (
    <div className='flex flex-col h-full'>
      <Button
        variant='outline'
        className='flex items-center gap-2 absolute top-0 left-0 m-4 z-10 bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 focus-visible:ring-none focus-visible:ring-offset-0 text-white hover:text-white'
        onClick={() => navigate('/', { transitionType: 'nav-back' })}
      >
        <ArrowLeftIcon className='w-6 h-6' />
      </Button>

      <ViewTransition name={`event-image-${event.id}`} default={'auto'}>
        <div
          className='relative w-full aspect-video overflow-hidden bg-cover bg-center'
          style={{ backgroundImage: `url(${event.imageUrl})` }}
        ></div>
      </ViewTransition>

      <div className='flex-1 p-6 overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold'>{event.title}</h2>
          <div className='flex items-center gap-2'>
            <CalendarIcon className='w-4 h-4' />
            <p className='text-gray-600 text-sm font-bold'>{event.time}</p>
          </div>
        </div>
        <p className='text-gray-600'>{event.description}</p>
      </div>
    </div>
  );
}

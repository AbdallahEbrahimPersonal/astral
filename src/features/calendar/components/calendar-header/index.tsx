'use client';

import { formatDate } from '@/lib/date';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCalendarContext } from '@/contexts/calendar';
import { useIsMobile } from '@/hooks/use-is-mobile';

const CalendarHeaderDay = ({ day }: { day: string }) => {
  const { dayName, dayNumber, isToday } = formatDate(day);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-md p-2 font-bold text-white gap-1.5 bg-white/10 backdrop-blur-sm flex-1',
        isToday && 'bg-button-gradient',
        isMobile ? 'text-sm' : 'text-2xl'
      )}
    >
      <p className={cn('text-sm', isMobile && 'text-xs')}>{dayName}</p>
      <p className={cn('text-lg', isMobile && 'text-base')}>{dayNumber}</p>
    </div>
  );
};

export const CalendarHeader = () => {
  const { currentWeek, navigateDate, currentMonth } = useCalendarContext();
  const isMobile = useIsMobile();

  return (
    <header
      className={cn(
        'sticky top-0 z-10 py-2 bg-header-gradient',
        isMobile ? 'px-2' : 'container-spacing'
      )}
    >
      <div className='flex items-center justify-between'>
        <h2
          className={cn(
            'font-bold text-white',
            isMobile ? 'text-lg' : 'text-xl'
          )}
        >
          Your Schedule
        </h2>
        <div className='flex items-center gap-2'>
          <span
            className={cn(
              'text-white font-bold view-transition-name-month',
              isMobile ? 'text-sm' : 'text-base'
            )}
          >
            {currentMonth}
          </span>
          <Button
            size='icon'
            variant='outline'
            className='bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 focus-visible:ring-none focus-visible:ring-offset-0 text-white hover:text-white'
            onClick={() => navigateDate('previous')}
            aria-label='Previous day'
          >
            <ChevronLeft className={cn(isMobile ? 'h-4 w-4' : 'h-5 w-5')} />
          </Button>
          <Button
            size='icon'
            variant='outline'
            className='bg-white/10 backdrop-blur-sm border-none hover:bg-white/20 focus-visible:ring-none focus-visible:ring-offset-0 text-white hover:text-white'
            onClick={() => navigateDate('next')}
            aria-label='Next day'
          >
            <ChevronRight className={cn(isMobile ? 'h-4 w-4' : 'h-5 w-5')} />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          'flex w-full items-center justify-between mt-4',
          isMobile ? 'gap-2 py-2' : 'gap-4 py-4'
        )}
      >
        {currentWeek.map((day) => (
          <CalendarHeaderDay key={day} day={day} />
        ))}
      </div>
    </header>
  );
};

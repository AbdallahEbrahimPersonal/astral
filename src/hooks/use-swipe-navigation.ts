import { useRef, useEffect, useCallback } from 'react';

interface UseSwipeNavigationProps {
  ref: React.RefObject<HTMLDivElement | null>;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isEnabled?: boolean;
}

export const useSwipeNavigation = ({
  ref,
  onSwipeLeft,
  onSwipeRight,
  isEnabled,
}: UseSwipeNavigationProps) => {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isEnabled) return;

    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isEnabled) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const deltaX = endX - startX.current;
      const deltaY = endY - startY.current;

      // Only consider it a swipe if the horizontal movement is greater than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const swipeThreshold = 50;
        if (Math.abs(deltaX) > swipeThreshold) {
          if (deltaX > 0) {
            onSwipeRight();
          } else {
            onSwipeLeft();
          }
        }
      }
    },
    [onSwipeLeft, onSwipeRight]
  );

  useEffect(() => {
    // Get the element from the passed ref inside the effect
    const element = ref.current;

    if (!isEnabled || !element) return;

    // Use the element directly from the ref
    // Make listeners passive again to guarantee they don't block scroll
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      // Use the same element variable for cleanup
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [
    isEnabled,
    onSwipeLeft,
    onSwipeRight,
    ref,
    handleTouchStart,
    handleTouchEnd,
  ]);
};

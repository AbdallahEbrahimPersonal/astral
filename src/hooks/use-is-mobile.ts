import { useEffect, useState } from 'react';

const MOBILE_WIDTH = 768;

/**
 * @description Hook to check if the device is mobile
 * @returns {boolean} isMobile
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_WIDTH
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

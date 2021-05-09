import { useState, useEffect } from 'react';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
  screenWidth: number;
  screenHeight: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: Math.floor(window.innerWidth),
    innerHeight: Math.floor(window.innerHeight),
    screenWidth: Math.floor(window.screen.width),
    screenHeight: Math.floor(window.screen.height),
  });

  useEffect(() => {
    const handleWindowResize = () => {
      const {
        innerWidth,
        innerHeight,
        screen: { width, height },
      } = window;

      setWindowSize({
        innerWidth: Math.floor(innerWidth),
        innerHeight: Math.floor(innerHeight),
        screenWidth: Math.floor(width),
        screenHeight: Math.floor(height),
      });
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
}

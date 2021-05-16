import { useState, useEffect } from 'react';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

interface WindowSize {
  innerWidth: number;
  innerHeight: number;
  screenWidth: number;
  screenHeight: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      const {
        innerWidth,
        innerHeight,
        screen: { width, height },
      } = window;
      setWindowSize({
        innerWidth: innerWidth,
        innerHeight: innerHeight,
        screenWidth: width,
        screenHeight: height,
      });
    };

    addWindowEventListener('resize', handleWindowResize);
    return () => {
      removeWindowEventListener('resize', handleWindowResize);
    };
  }, []);

  return windowSize;
}

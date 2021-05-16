import { useState, useEffect } from 'react';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

interface WindowPosition {
  pageXOffset: number;
  pageYOffset: number;
  scrollX: number;
  scrollY: number;
  mousePosition: WindowMousePosition | null;
  touchPositions: WindowTouchPosition[];
}
interface WindowMousePosition {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}
interface WindowTouchPosition {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

export function useWindowPosition(): WindowPosition {
  const [windowPosition, setWindowPosition] = useState<WindowPosition>({
    pageXOffset: window.pageXOffset,
    pageYOffset: window.pageYOffset,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    mousePosition: null,
    touchPositions: [],
  });

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, pageX, pageY } = event;

      setWindowPosition((state) => ({
        ...state,
        touchPositions: [],
        mousePosition: {
          clientX: clientX,
          clientY: clientY,
          pageX: pageX,
          pageY: pageY,
        },
      }));
    };
    const handleTouchMove = (event: TouchEvent) => {
      setWindowPosition((state) => ({
        ...state,
        touchPositions: Array.from(event.touches).map((touch) => {
          const { clientX, clientY, pageX, pageY } = touch;
          return {
            clientX: clientX,
            clientY: clientY,
            pageX: pageX,
            pageY: pageY,
          };
        }),
      }));
    };
    const handleWindowScroll = () => {
      const { pageXOffset, pageYOffset, scrollX, scrollY } = window;

      setWindowPosition((state) => ({
        ...state,
        pageXOffset: pageXOffset,
        pageYOffset: pageYOffset,
        scrollX: scrollX,
        scrollY: scrollY,
      }));
    };

    addWindowEventListener('mousemove', handleWindowMouseMove);
    addWindowEventListener('touchmove', handleTouchMove);
    addWindowEventListener('scroll', handleWindowScroll);
    return () => {
      removeWindowEventListener('mousemove', handleWindowMouseMove);
      removeWindowEventListener('touchmove', handleTouchMove);
      removeWindowEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return windowPosition;
}

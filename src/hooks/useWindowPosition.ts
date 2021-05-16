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
    pageXOffset: Math.floor(window.pageXOffset),
    pageYOffset: Math.floor(window.pageYOffset),
    scrollX: Math.floor(window.scrollX),
    scrollY: Math.floor(window.scrollY),
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
          clientX: Math.floor(clientX),
          clientY: Math.floor(clientY),
          pageX: Math.floor(pageX),
          pageY: Math.floor(pageY),
        },
      }));
    };
    const handleTouchMove = (event: TouchEvent) => {
      setWindowPosition((state) => ({
        ...state,
        touchPositions: Array.from(event.touches).map((touch) => {
          const { clientX, clientY, pageX, pageY } = touch;
          return {
            clientX: Math.floor(clientX),
            clientY: Math.floor(clientY),
            pageX: Math.floor(pageX),
            pageY: Math.floor(pageY),
          };
        }),
      }));
    };
    const handleWindowScroll = () => {
      const { pageXOffset, pageYOffset, scrollX, scrollY } = window;

      setWindowPosition((state) => ({
        ...state,
        pageXOffset: Math.floor(pageXOffset),
        pageYOffset: Math.floor(pageYOffset),
        scrollX: Math.floor(scrollX),
        scrollY: Math.floor(scrollY),
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

import { useState, useEffect } from 'react';

export type WindowCoordinate = {
  innerWidth: number;
  innerHeight: number;
  pageX: number;
  pageY: number;
  pageXOffset: number;
  pageYOffset: number;
  scrollX: number;
  scrollY: number;
  clientX: number;
  clientY: number;
};

export default function useWindowCoordinate(): WindowCoordinate {
  const [state, setState] = useState<WindowCoordinate>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    pageXOffset: window.pageXOffset,
    pageYOffset: window.pageYOffset,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    pageX: 0,
    pageY: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, pageX, pageY } = event;
      setState((state) => ({ ...state, clientX, clientY, pageX, pageY }));
    };

    const handleWindowScroll = () => {
      const { pageXOffset, pageYOffset, scrollX, scrollY } = window;
      setState((state) => ({
        ...state,
        pageXOffset,
        pageYOffset,
        scrollX,
        scrollY,
      }));
    };

    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      setState((state) => ({ ...state, innerWidth, innerHeight }));
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('scroll', handleWindowScroll);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('scroll', handleWindowScroll);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return state;
}

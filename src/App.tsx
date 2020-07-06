import React, { useState, useEffect } from 'react';
import Coordinate from './Coordinate';
import Box from './Box';

export type Boundary = {
  width: number;
  height: number;
};

export function App(): React.ReactElement {
  const [state, setState] = useState({
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
    boundary: {
      width: 3000,
      height: 3000,
    },
  });
  const {
    innerWidth,
    innerHeight,
    pageXOffset,
    pageYOffset,
    scrollX,
    scrollY,
    clientX,
    clientY,
    pageX,
    pageY,
    boundary,
  } = state;

  useEffect(() => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, pageX, pageY } = event;
      setState((state) => ({ ...state, clientX, clientY, pageX, pageY }));
    };

    const handleWindowScroll = () => {
      const { pageXOffset, pageYOffset, scrollX, scrollY } = window;
      setState((state) => ({
        ...state,
        pageX: state.clientX + pageXOffset,
        pageY: state.clientY + pageYOffset,
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

  return (
    <div
      style={{
        width: `${boundary.width}px`,
        height: `${boundary.height}px`,
      }}
    >
      <Coordinate {...boundary} />
      {/* Window dimension guide */}
      <div
        style={{
          margin: '50px',
          position: 'absolute',
          transform: `translate(${pageXOffset}px, ${pageYOffset}px)`,
        }}
      >
        innerWidth: <span className="num">{innerWidth}</span>
        <br />
        innerHeight: <span className="num">{innerHeight}</span>
        <br />
        pageXOffset: <span className="num">{pageXOffset}</span>
        <br />
        pageYoffset: <span className="num">{pageYOffset}</span>
        <br />
        scrollX: <span className="num">{scrollX}</span>
        <br />
        scrollY: <span className="num">{scrollY}</span>
        <br />
        mouse clientX: <span className="num">{clientX}</span>
        <br />
        mouse clientY: <span className="num">{clientY}</span>
        <br />
        mouse pageX: <span className="num">{pageX}</span>
        <br />
        mouse pageY: <span className="num">{pageY}</span>
      </div>
      <Box
        boundary={boundary}
        pageXOffset={pageXOffset}
        pageYOffset={pageYOffset}
        width={200}
        height={200}
        margin={60}
        border={50}
        padding={40}
      />
    </div>
  );
}

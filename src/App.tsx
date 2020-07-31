import React, { useState, useEffect } from 'react';
import Coordinate from './Coordinate';
import Box from './Box';

export type Boundary = {
  width: number;
  height: number;
};

function getWindowSize() {
  return {
    documentElementClientWidth: document.documentElement.clientWidth,
    documentElementOffsetWidth: document.documentElement.offsetWidth,
    documentElementScrollWidth: document.documentElement.scrollWidth,
    documentElementClientHeight: document.documentElement.clientHeight,
    documentElementOffsetHeight: document.documentElement.offsetHeight,
    documentElementScrollHeight: document.documentElement.scrollHeight,
    bodyClientWidth: document.body.clientWidth,
    bodyOffsetWidth: document.body.offsetWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientHeight: document.body.clientHeight,
    bodyOffsetHeight: document.body.offsetHeight,
    bodyScrollHeight: document.body.scrollHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  };
}

export function App(): React.ReactElement {
  const [state, setState] = useState({
    ...getWindowSize(),
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
    documentElementClientWidth,
    documentElementOffsetWidth,
    documentElementScrollWidth,
    documentElementClientHeight,
    documentElementOffsetHeight,
    documentElementScrollHeight,
    bodyClientWidth,
    bodyOffsetWidth,
    bodyScrollWidth,
    bodyClientHeight,
    bodyOffsetHeight,
    bodyScrollHeight,
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
    setState((state) => ({ ...state, ...getWindowSize() }));
  }, []);

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
      setState((state) => ({ ...state, ...getWindowSize() }));
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
      {/* Window values guide */}
      <div
        style={{
          margin: '50px',
          position: 'fixed',
        }}
      >
        documentElementClientWidth:{' '}
        <span className="num">{documentElementClientWidth}</span>
        <br />
        documentElementOffsetWidth:{' '}
        <span className="num">{documentElementOffsetWidth}</span>
        <br />
        documentElementScrollWidth:{' '}
        <span className="num">{documentElementScrollWidth}</span>
        <br />
        documentElementClientHeight:{' '}
        <span className="num">{documentElementClientHeight}</span>
        <br />
        documentElementOffsetHeight:{' '}
        <span className="num">{documentElementOffsetHeight}</span>
        <br />
        documentElementScrollHeight:{' '}
        <span className="num">{documentElementScrollHeight}</span>
        <br />
        bodyClientWidth: <span className="num">{bodyClientWidth}</span>
        <br />
        bodyOffsetWidth: <span className="num">{bodyOffsetWidth}</span>
        <br />
        bodyScrollWidth: <span className="num">{bodyScrollWidth}</span>
        <br />
        bodyClientHeight: <span className="num">{bodyClientHeight}</span>
        <br />
        bodyOffsetHeight: <span className="num">{bodyOffsetHeight}</span>
        <br />
        bodyScrollHeight: <span className="num">{bodyScrollHeight}</span>
        <br />
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

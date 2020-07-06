import React, { useEffect, useState, useRef } from 'react';
import { Boundary } from './App';

type CoordinateProps = Boundary;

function Coordinate(props: CoordinateProps) {
  const { width, height } = props;
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pageOffset, setPageOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const { current: element } = canvas;
    if (!element) {
      return;
    }

    const ctx = element.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);
    [
      { color: '#eeeeee', unit: 10 },
      { color: '#cccccc', unit: 100 },
    ].forEach(({ color, unit }) => {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;

      Array.from({ length: Math.ceil(height / unit) }).forEach((_, index) => {
        const y = index * unit;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      });

      Array.from({ length: Math.ceil(width / unit) }).forEach((_, index) => {
        const x = index * unit;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      });

      ctx.stroke();
      ctx.restore();
    });
  }, [width, height]);

  useEffect(() => {
    const handleWindowScroll = () => {
      const { pageXOffset, pageYOffset } = window;
      setPageOffset({ x: pageXOffset, y: pageYOffset });
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <canvas
        style={{ position: 'absolute' }}
        width={width}
        height={height}
        ref={canvas}
      />
      {/* X coordinate unit */}
      <div>
        {Array.from({ length: width / 100 }).map((_, index) => {
          return (
            <span
              style={{
                position: 'absolute',
                color: '#aaaaaa',
                display: 'inline-block',
                transform: `translate(${index * 100}px, ${pageOffset.y}px)`,
              }}
              key={index}
            >
              {index * 100}
            </span>
          );
        })}
      </div>
      {/* Y coordinate unit */}
      <div>
        {Array.from({ length: height / 100 }).map((_, index) => {
          return (
            <span
              style={{
                position: 'absolute',
                color: '#aaaaaa',
                display: 'inline-block',
                transform: `translate(${pageOffset.x}px, ${index * 100}px)`,
              }}
              key={index}
            >
              {index * 100}
            </span>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default React.memo(Coordinate);

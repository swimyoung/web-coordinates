import React, { useEffect, useState, useMemo } from 'react';
import { Boundary } from './App';

type CoordinateProps = Boundary;

function CoordinateUnitText(props: {
  width: number;
  height: number;
}): React.ReactElement {
  const { width, height } = props;
  const [pageOffset, setPageOffset] = useState({ x: 0, y: 0 });

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
      <div
        style={{
          position: 'absolute',
          transform: `translate(0px, ${pageOffset.y}px)`,
        }}
      >
        {useMemo(
          () =>
            Array.from({ length: width / 100 }).map((_, index) => {
              return (
                <span
                  style={{
                    color: '#999999',
                    position: 'absolute',
                    display: 'inline-block',
                    transform: `translate(${index * 100}px, 0px)`,
                  }}
                  key={index}
                >
                  {index * 100}
                </span>
              );
            }),
          [width],
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          transform: `translate(${pageOffset.x}px, 0px)`,
        }}
      >
        {useMemo(
          () =>
            Array.from({ length: height / 100 }).map((_, index) => {
              return (
                <span
                  style={{
                    color: '#999999',
                    position: 'absolute',
                    display: 'inline-block',
                    transform: `translate(0px, ${index * 100}px)`,
                  }}
                  key={index}
                >
                  {index * 100}
                </span>
              );
            }),
          [height],
        )}
      </div>
    </React.Fragment>
  );
}

function Coordinate(props: CoordinateProps) {
  const { width, height } = props;

  return (
    <React.Fragment>
      <svg style={{ position: 'absolute' }} width={width} height={height}>
        {[
          { color: '#eeeeee', unit: 10 },
          { color: '#cccccc', unit: 100 },
        ].map(({ color, unit }, index) => {
          return (
            <React.Fragment key={index}>
              {Array.from({ length: Math.ceil(height / unit) }).map(
                (_, index) => {
                  const y = index * unit;
                  return (
                    <line
                      key={`${'0'}${y}${width}${y}`}
                      x1={'0'}
                      y1={y}
                      x2={width}
                      y2={y}
                      style={{
                        stroke: color,
                        strokeWidth: '1',
                      }}
                    />
                  );
                },
              )}
              {Array.from({ length: Math.ceil(width / unit) }).map(
                (_, index) => {
                  const x = index * unit;
                  return (
                    <line
                      key={`${x}${'0'}${x}${height}`}
                      x1={x}
                      y1={'0'}
                      x2={x}
                      y2={height}
                      style={{
                        stroke: color,
                        strokeWidth: '1',
                      }}
                    />
                  );
                },
              )}
            </React.Fragment>
          );
        })}
      </svg>
      <CoordinateUnitText width={width} height={height} />
    </React.Fragment>
  );
}

export default React.memo(Coordinate);

import React, { useEffect, useMemo, useState } from 'react';
import { useBoundary } from '~/hooks/useBoundary';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

type CoordinateProps = {
  unit?: number;
};

function CoordinateNumbers(props: CoordinateProps) {
  const { unit = 100 } = props;
  const { width, height } = useBoundary();
  const [windowPosition, setWindowPosition] = useState<{ [k: string]: number }>(
    {
      pageXOffset: window.pageXOffset,
      pageYOffset: window.pageYOffset,
    },
  );

  useEffect(() => {
    const handleWindowScroll = () => {
      setWindowPosition({
        pageXOffset: window.pageXOffset,
        pageYOffset: window.pageYOffset,
      });
    };

    addWindowEventListener('scroll', handleWindowScroll);
    return () => {
      removeWindowEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return (
    <>
      {/* x coordinate line numbers */}
      <div
        style={{
          position: 'fixed',
        }}
      >
        {useMemo(
          () =>
            Array.from({ length: Math.ceil(width / unit) }).map((_, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    transform: `translate(${
                      index * unit -
                      (windowPosition.pageXOffset < 0
                        ? 0
                        : windowPosition.pageXOffset)
                    }px, 0px)`,
                    color: '#999999',
                  }}
                >
                  {index === 0 ? null : index * unit}
                </div>
              );
            }),
          [width, windowPosition.pageXOffset, unit],
        )}
      </div>

      {/* y coordinate line numbers */}
      <div
        style={{
          position: 'fixed',
        }}
      >
        {useMemo(
          () =>
            Array.from({ length: Math.ceil(height / unit) }).map((_, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    transform: `translate(0px, ${
                      index * unit -
                      (windowPosition.pageYOffset < 0
                        ? 0
                        : windowPosition.pageYOffset)
                    }px)`,
                    color: '#999999',
                  }}
                >
                  {index === 0 ? null : index * unit}
                </div>
              );
            }),
          [height, windowPosition.pageYOffset, unit],
        )}
      </div>
    </>
  );
}

export { CoordinateNumbers };

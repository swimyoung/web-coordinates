import React, { useEffect, useState, useMemo } from 'react';

type CoordinateProps = {
  width: number;
  height: number;
  unit?: number;
};

function CoordinateNumbers(props: CoordinateProps): React.ReactElement {
  const { width, height, unit = 100 } = props;

  const [pageOffset, setPageOffset] = useState({
    x: window.pageXOffset,
    y: window.pageYOffset,
  });

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
                      index * unit - (pageOffset.x < 0 ? 0 : pageOffset.x)
                    }px, 0px)`,
                    color: '#999999',
                  }}
                >
                  {index === 0 ? null : index * unit}
                </div>
              );
            }),
          [pageOffset.x],
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
                      index * unit - (pageOffset.y < 0 ? 0 : pageOffset.y)
                    }px)`,
                    color: '#999999',
                  }}
                >
                  {index === 0 ? null : index * unit}
                </div>
              );
            }),
          [pageOffset.y],
        )}
      </div>
    </>
  );
}

export { CoordinateNumbers };

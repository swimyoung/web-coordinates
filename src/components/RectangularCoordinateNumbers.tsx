import React, { useMemo, useContext } from 'react';
import { AppBoundaryContext } from '~/App';
import { useWindowPosition } from '~/hooks/useWindowPosition';

type CoordinateProps = {
  unit?: number;
};

function CoordinateNumbers(props: CoordinateProps): React.ReactElement {
  const { unit = 100 } = props;
  const { width, height } = useContext(AppBoundaryContext);
  const { pageXOffset, pageYOffset } = useWindowPosition();

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
                      index * unit - (pageXOffset < 0 ? 0 : pageXOffset)
                    }px, 0px)`,
                    color: '#999999',
                  }}
                >
                  {index === 0 ? null : index * unit}
                </div>
              );
            }),
          [width, pageXOffset],
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
                      index * unit - (pageYOffset < 0 ? 0 : pageYOffset)
                    }px)`,
                    color: '#999999',
                  }}
                >
                  {index === 0 ? null : index * unit}
                </div>
              );
            }),
          [height, pageYOffset],
        )}
      </div>
    </>
  );
}

export { CoordinateNumbers };

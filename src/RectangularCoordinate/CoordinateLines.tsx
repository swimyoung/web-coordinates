import React from 'react';

type CoordinateLinesProps = {
  width: number;
  height: number;
};

function CoordinateLines(props: CoordinateLinesProps): React.ReactElement {
  const { width, height } = props;
  return (
    <svg style={{ position: 'absolute' }} width={width} height={height}>
      {[
        { color: '#eeeeee', unit: 10 },
        { color: '#cccccc', unit: 100 },
      ].map(({ color, unit }, index) => {
        return (
          <React.Fragment key={index}>
            {/* x coordinate lines */}
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
                      strokeWidth: 1,
                    }}
                  />
                );
              },
            )}
            {/* y coordinate lines */}
            {Array.from({ length: Math.ceil(width / unit) }).map((_, index) => {
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
                    strokeWidth: 1,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </svg>
  );
}

export { CoordinateLines };

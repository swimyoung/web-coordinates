import React from 'react';
import { CoordinateLines } from './CoordinateLines';
import { CoordinateNumbers } from './CoordinateNumbers';

type RectangularCoordinateProps = {
  width: number;
  height: number;
};

function RectangularCoordinate(
  props: RectangularCoordinateProps,
): React.ReactElement {
  const { width, height } = props;
  return (
    <React.Fragment>
      <CoordinateLines width={width} height={height} />
      <CoordinateNumbers width={width} height={height} />
    </React.Fragment>
  );
}

export { RectangularCoordinate };

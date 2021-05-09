import React from 'react';
import { CoordinateLines } from './CoordinateLines';
import { CoordinateNumbers } from './CoordinateNumbers';

type RectangularCoordinateProps = {
  //
};

const RectangularCoordinate = React.memo(function RectangularCoordinate(
  props: RectangularCoordinateProps,
): React.ReactElement {
  return (
    <>
      <CoordinateLines />
      <CoordinateNumbers />
    </>
  );
});

export { RectangularCoordinate };

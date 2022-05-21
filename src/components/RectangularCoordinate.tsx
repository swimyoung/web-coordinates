import React from 'react';
import { CoordinateLines } from '~/components/RectangularCoordinateLines';
import { CoordinateNumbers } from '~/components/RectangularCoordinateNumbers';

function RectangularCoordinate(): React.ReactElement {
  return (
    <>
      <CoordinateLines />
      <CoordinateNumbers />
    </>
  );
}

export { RectangularCoordinate };

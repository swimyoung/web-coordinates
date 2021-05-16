import React, { memo } from 'react';
import { CoordinateLines } from '~/components/RectangularCoordinateLines';
import { CoordinateNumbers } from '~/components/RectangularCoordinateNumbers';

type RectangularCoordinateProps = {
  //
};

const RectangularCoordinate = memo(function RectangularCoordinate(
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

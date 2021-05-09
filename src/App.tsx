import React, { useState } from 'react';
import { RectangularCoordinate } from './RectangularCoordinate';
import { Box } from './Box';

function calculateBoundary(): Boundary {
  return {
    width: Math.floor(window.innerWidth * 1.5),
    height: Math.floor(window.innerHeight * 1.5),
  };
}

type Boundary = {
  width: number;
  height: number;
};

function App(): React.ReactElement {
  const [boundary] = useState(() => calculateBoundary());

  return (
    <>
      <RectangularCoordinate {...boundary} />
      <Box boundary={boundary} />
    </>
  );
}

export { Boundary, App };

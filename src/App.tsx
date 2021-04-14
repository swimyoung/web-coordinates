import React, { useState } from 'react';
import styled from 'styled-components';
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

const Container = styled.div<Boundary>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

function App(): React.ReactElement {
  const [boundary] = useState(() => calculateBoundary());

  return (
    <Container {...boundary}>
      <RectangularCoordinate {...boundary} />
      <Box boundary={boundary} />
    </Container>
  );
}

export { Boundary, App };

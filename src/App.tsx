import React, { useState } from 'react';
import useWindowCoordinate from './useWindowCoordinate';
import Box from './Box';

export type Boundary = {
  width: number;
  height: number;
};

export function App(): React.ReactElement {
  const { pageXOffset, pageYOffset } = useWindowCoordinate();
  const [boundary] = useState<Boundary>({
    width: 2000,
    height: 2000,
  });

  return (
    <div
      style={{
        width: `${boundary.width}px`,
        height: `${boundary.height}px`,
      }}
    >
      <Box
        boundary={boundary}
        pageXOffset={pageXOffset}
        pageYOffset={pageYOffset}
        width={200}
        height={200}
        margin={40}
        border={50}
        padding={60}
      />
    </div>
  );
}

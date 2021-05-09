import React, { useMemo } from 'react';
import { RectangularCoordinate } from './RectangularCoordinate';
import { Box } from './Box';
import { Console } from './Console';
import { useWindowSize } from './useWindowSize';

type Boundary = {
  width: number;
  height: number;
};

export const AppBoundaryContext = React.createContext<Boundary>({
  width: 0,
  height: 0,
});

function App(): React.ReactElement {
  const windowSize = useWindowSize();
  const boundary = useMemo(
    () => ({
      width: windowSize.innerWidth * 1.5,
      height: windowSize.innerHeight * 1.5,
    }),
    [windowSize.innerWidth, windowSize.innerHeight],
  );

  return (
    <AppBoundaryContext.Provider value={boundary}>
      <RectangularCoordinate />
      <Box />
      <Console />
    </AppBoundaryContext.Provider>
  );
}

export { Boundary, App };

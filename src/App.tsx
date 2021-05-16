import React, { useMemo, createContext } from 'react';
import { RectangularCoordinate } from '~/components/RectangularCoordinate';
import { Box } from '~/components/Box';
import { Console } from '~/components/Console';
import { useWindowSize } from '~/hooks/useWindowSize';

type Boundary = {
  width: number;
  height: number;
};

export const AppBoundaryContext = createContext<Boundary>({
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

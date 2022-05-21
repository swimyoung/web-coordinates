import React, { useMemo, createContext, useState, useEffect } from 'react';
import { RectangularCoordinate } from '~/components/RectangularCoordinate';
import { Box, BoxCoordinateValues } from '~/components/Box';
import { MemorizedConsole } from '~/components/Console';
import { useWindowSize } from '~/hooks/useWindowSize';
import { ConsoleContentBox } from './components/ConsoleContentBox';

type AppState = {
  boxesCoordinateValues: {
    [name: string]: BoxCoordinateValues;
  };
  boundary: {
    width: number;
    height: number;
  };
};

export const AppStateContext = createContext<{
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}>({
  appState: {
    boxesCoordinateValues: {},
    boundary: {
      width: 0,
      height: 0,
    },
  },
  setAppState: (appState) => {
    return appState;
  },
});

function App(): React.ReactElement {
  const windowSize = useWindowSize();
  const [appState, setAppState] = useState<AppState>({
    boxesCoordinateValues: {},
    boundary: {
      width: windowSize.innerWidth * 1.5,
      height: windowSize.innerHeight * 1.5,
    },
  });
  const boxes = useMemo(() => ['Box1'], []);
  const boxTabs = useMemo(
    () =>
      boxes.map((name) => ({
        tab: name,
        render: <ConsoleContentBox boxName={name} />,
      })),
    [boxes],
  );

  useEffect(() => {
    setAppState((state) => ({
      ...state,
      boundary: {
        width: windowSize.innerWidth * 1.5,
        height: windowSize.innerHeight * 1.5,
      },
    }));
  }, [windowSize]);

  return (
    <AppStateContext.Provider
      value={useMemo(() => ({ appState, setAppState }), [appState])}
    >
      <RectangularCoordinate />
      {useMemo(
        () =>
          boxes.map((name) => {
            return (
              <Box
                key={name}
                name={name}
                onChangeBoxCoordinateValues={(coordinateValues) => {
                  setAppState((state) => ({
                    ...state,
                    boxesCoordinateValues: {
                      ...state.boxesCoordinateValues,
                      [name]: coordinateValues,
                    },
                  }));
                }}
              />
            );
          }),
        [boxes],
      )}
      <MemorizedConsole additionalTabs={boxTabs} />
    </AppStateContext.Provider>
  );
}

export { App };

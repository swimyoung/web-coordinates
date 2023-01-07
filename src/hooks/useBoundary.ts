import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Boundary, boundaryState } from '~/state/boundary';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

export function useBoundary(): Boundary {
  const [boundary, setBoundary] = useRecoilState(boundaryState);
  const [windowSize, setWindowSize] = useState<{ [k: string]: number }>({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    addWindowEventListener('resize', handleWindowResize);
    return () => {
      removeWindowEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    setBoundary({
      width: windowSize.innerWidth * 1.5,
      height: windowSize.innerHeight * 1.5,
    });
  }, [windowSize]);

  return boundary;
}

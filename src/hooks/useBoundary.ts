import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Boundary, boundaryState } from '~/state/boundary';
import { useWindowSize } from './useWindowSize';

export function useBoundary(): Boundary {
  const [boundary, setBoundary] = useRecoilState(boundaryState);
  const windowSize = useWindowSize();

  useEffect(() => {
    setBoundary({
      width: windowSize.innerWidth * 1.5,
      height: windowSize.innerHeight * 1.5,
    });
  }, [windowSize]);

  return boundary;
}

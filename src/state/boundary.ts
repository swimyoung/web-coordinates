import { atom } from 'recoil';

export interface Boundary {
  width: number;
  height: number;
}

export const boundaryState = atom<Boundary>({
  key: 'boundary',
  default: {
    width: 0,
    height: 0,
  },
});

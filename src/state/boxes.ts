import { atom } from 'recoil';

export interface Box {
  name: string;
  boundingClientRect?: DOMRect;
  clientLeft?: number;
  clientTop?: number;
  clientWidth?: number;
  clientHeight?: number;
  scrollWidth?: number;
  scrollHeight?: number;
  scrollLeft?: number;
  scrollTop?: number;
  offsetWidth?: number;
  offsetHeight?: number;
}

export const boxesState = atom<Array<Box>>({
  key: 'boxes',
  default: [
    {
      name: 'box1',
    },
  ],
});

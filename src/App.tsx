import React, { memo } from 'react';
import { RectangularCoordinate } from '~/components/RectangularCoordinate';
import { BoxElement } from '~/components/BoxElement';
import { Console } from '~/components/Console';
import { useRecoilState } from 'recoil';
import { Box, boxesState } from './state/boxes';

const MemorizedConsole = memo(Console);

function App() {
  const [boxes, setBoxes] = useRecoilState(boxesState);

  const handleChangeBox = (changedBox: Box) => {
    setBoxes((boxes) => {
      const index = boxes.findIndex((box) => box.name === changedBox.name);
      if (index === -1) return boxes;
      return [...boxes.slice(0, index), changedBox, ...boxes.slice(index + 1)];
    });
  };

  return (
    <>
      <RectangularCoordinate />
      {boxes.map((box) => (
        <BoxElement key={box.name} box={box} onChangeBox={handleChangeBox} />
      ))}
      <MemorizedConsole />
    </>
  );
}

export { App };

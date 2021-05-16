import React from 'react';
import { useWindowPosition } from '~/hooks/useWindowPosition';
import { useWindowSize } from '~/hooks/useWindowSize';

export function ConsoleContentWindow(): React.ReactElement {
  const { innerWidth, innerHeight, screenWidth, screenHeight } =
    useWindowSize();
  const {
    pageXOffset,
    pageYOffset,
    scrollX,
    scrollY,
    mousePosition,
    touchPositions,
  } = useWindowPosition();

  return (
    <>
      <div>innerWidth: {innerWidth}</div>
      <div>innerHeight: {innerHeight}</div>
      <div>screenWidth: {screenWidth}</div>
      <div>screenHeight: {screenHeight}</div>
      <div>pageXOffset: {pageXOffset}</div>
      <div>pageYOffset: {pageYOffset}</div>
      <div>scrollX: {scrollX}</div>
      <div>scrollY: {scrollY}</div>
      {touchPositions.length > 0 ? (
        touchPositions.map((touchPosition, index) => {
          return (
            <React.Fragment key={`touch${index}`}>
              <div>
                touch{index}.pageX: {touchPosition.pageX}
              </div>
              <div>
                touch{index}.pageY: {touchPosition.pageY}
              </div>
              <div>
                touch{index}.clientX: {touchPosition.clientX}
              </div>
              <div>
                touch{index}.clientY: {touchPosition.clientY}
              </div>
            </React.Fragment>
          );
        })
      ) : mousePosition ? (
        <>
          <div>mouse.pageX: {mousePosition.pageX}</div>
          <div>mouse.pageY: {mousePosition.pageY}</div>
          <div>mouse.clientX: {mousePosition.clientX}</div>
          <div>mouse.clientY: {mousePosition.clientY}</div>
        </>
      ) : null}
    </>
  );
}

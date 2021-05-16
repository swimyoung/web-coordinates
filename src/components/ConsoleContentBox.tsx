import React, { useContext } from 'react';
import { AppStateContext } from '~/App';

type ConsoleContentBoxProps = {
  boxName: string;
};

export function ConsoleContentBox(
  props: ConsoleContentBoxProps,
): React.ReactElement {
  const {
    appState: { boxesCoordinateValues },
  } = useContext(AppStateContext);

  const { boxBoundingRect, boxSize, boxPosition } =
    boxesCoordinateValues[props.boxName];
  return (
    <>
      <div>clientBoundingRect.x: {boxBoundingRect.x}</div>
      <div>clientBoundingRect.y {boxBoundingRect.y}</div>
      <div>clientBoundingRect.top {boxBoundingRect.top}</div>
      <div>clientBoundingRect.right {boxBoundingRect.right}</div>
      <div>clientBoundingRect.bottom {boxBoundingRect.bottom}</div>
      <div>clientBoundingRect.left {boxBoundingRect.left}</div>
      <div>clientBoundingRect.width {boxBoundingRect.width}</div>
      <div>clientBoundingRect.height {boxBoundingRect.height}</div>
      <div>scrollLeft {boxPosition.scrollLeft}</div>
      <div>scrollTop {boxPosition.scrollTop}</div>
      <div>clientLeft {boxPosition.clientLeft}</div>
      <div>clientTop {boxPosition.clientTop}</div>
      <div>clientWidth {boxSize.clientWidth}</div>
      <div>clientHeight {boxSize.clientHeight}</div>
      <div>offsetWidth {boxSize.offsetWidth}</div>
      <div>offsetHeight {boxSize.offsetHeight}</div>
      <div>scrollWidth {boxSize.scrollWidth}</div>
      <div>scrollHeight {boxSize.scrollHeight}</div>
    </>
  );
}

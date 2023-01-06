import React from 'react';
import { Box } from '~/state/boxes';

type ConsoleContentBoxProps = {
  box: Box;
};

export function ConsoleContentBox(props: ConsoleContentBoxProps) {
  const { box } = props;
  const {
    boundingClientRect,
    clientLeft,
    clientTop,
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
    scrollLeft,
    scrollTop,
    offsetWidth,
    offsetHeight,
  } = box;

  return (
    <>
      <div>boundingClientRect.x: {boundingClientRect.x}</div>
      <div>boundingClientRect.y {boundingClientRect.y}</div>
      <div>boundingClientRect.top {boundingClientRect.top}</div>
      <div>boundingClientRect.right {boundingClientRect.right}</div>
      <div>boundingClientRect.bottom {boundingClientRect.bottom}</div>
      <div>boundingClientRect.left {boundingClientRect.left}</div>
      <div>boundingClientRect.width {boundingClientRect.width}</div>
      <div>boundingClientRect.height {boundingClientRect.height}</div>
      <div>scrollLeft {scrollLeft}</div>
      <div>scrollTop {scrollTop}</div>
      <div>clientLeft {clientLeft}</div>
      <div>clientTop {clientTop}</div>
      <div>clientWidth {clientWidth}</div>
      <div>clientHeight {clientHeight}</div>
      <div>offsetWidth {offsetWidth}</div>
      <div>offsetHeight {offsetHeight}</div>
      <div>scrollWidth {scrollWidth}</div>
      <div>scrollHeight {scrollHeight}</div>
    </>
  );
}

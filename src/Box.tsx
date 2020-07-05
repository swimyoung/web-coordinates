import React, { useEffect, useState, useRef } from 'react';
import { Boundary } from './App';

const GUIDE_BORDER_SIZE = 2;
const LARGE_CONTENT =
  '🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈';

type BoxProps = {
  boundary: Boundary;
  pageXOffset: number;
  pageYOffset: number;
  width: number;
  height: number;
  border: number;
  margin: number;
  padding: number;
};

type BoxDimension = {
  offsetWidth: number;
  offsetHeight: number;
  clientWidth: number;
  clientHeight: number;
  clientTop: number;
  clientLeft: number;
  scrollTop: number;
  scrollLeft: number;
};

export default function Box(props: BoxProps): React.ReactElement {
  const box = useRef<HTMLDivElement>(null);
  const [boxBoundingClientRect, setBoxBoundingClientRect] = useState<DOMRect>();
  const [boxDimension, setBoxDimension] = useState<BoxDimension>();
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });
  const {
    boundary,
    pageXOffset,
    pageYOffset,
    width,
    height,
    border = 0,
    padding = 0,
    margin = 0,
  } = props;

  useEffect(() => {
    const { current: element } = box;
    if (!element) {
      return;
    }

    const boundingClientRect = element.getBoundingClientRect();
    setBoxBoundingClientRect(boundingClientRect);
  }, [pageXOffset, pageYOffset]);

  useEffect(() => {
    const { current: element } = box;
    if (!element) {
      return;
    }

    const {
      offsetWidth,
      offsetHeight,
      clientWidth,
      clientHeight,
      clientTop,
      clientLeft,
      scrollTop,
      scrollLeft,
    } = element;
    setBoxDimension({
      offsetWidth,
      offsetHeight,
      clientWidth,
      clientHeight,
      clientTop,
      clientLeft,
      scrollTop,
      scrollLeft,
    });
  }, [width, height, border, padding, margin]);

  function handleScroll() {
    const { current: element } = box;
    if (!element) {
      return;
    }

    const { scrollTop, scrollLeft } = element;
    setBoxDimension(
      (state) => ({ ...state, scrollTop, scrollLeft } as BoxDimension),
    );
  }

  function handleMouseDown(event: React.MouseEvent<HTMLElement>) {
    const { current: element } = box;
    if (!element) {
      return;
    }

    const { pageX, pageY } = event;
    const boundingClientRect = element.getBoundingClientRect();
    const baseX = boundingClientRect.x + pageXOffset - margin - pageX;
    const baseY = boundingClientRect.y + pageYOffset - margin - pageY;

    const handleWindowMouseMove = (event: MouseEvent) => {
      const { pageX, pageY } = event;
      const boxAreaWidth = width + margin * 2;
      const boxAreaHeight = height + margin * 2;

      let x = baseX + pageX;
      if (x + boxAreaWidth > boundary.width) {
        x = boundary.width - boxAreaWidth;
      } else if (x < 0) {
        x = 0;
      }

      let y = baseY + pageY;
      if (y + boxAreaHeight > boundary.height) {
        y = boundary.height - boxAreaHeight;
      } else if (y < 0) {
        y = 0;
      }

      setBoxPosition({ x, y });
      setBoxBoundingClientRect(boundingClientRect);
    };

    const handleWindowMouseUp = () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };

    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Content Guide */}
      <div
        style={{
          position: 'absolute',
          width: `${width - GUIDE_BORDER_SIZE}px`,
          height: `${height - GUIDE_BORDER_SIZE}px`,
          border: `${GUIDE_BORDER_SIZE}px solid gray`,
          transform: `translate(${
            margin + padding + border + boxPosition.x
          }px, ${margin + padding + border + boxPosition.y}px)`,
        }}
      ></div>
      {/* Padding Guide */}
      <div
        style={{
          position: 'absolute',
          width: `${width - GUIDE_BORDER_SIZE + padding * 2}px`,
          height: `${height - GUIDE_BORDER_SIZE + padding * 2}px`,
          border: `${GUIDE_BORDER_SIZE}px dashed gray`,
          transform: `translate(${margin + border + boxPosition.x}px, ${
            margin + border + boxPosition.y
          }px)`,
        }}
      ></div>
      {/* Boarder Guide */}
      <div
        style={{
          position: 'absolute',
          width: `${width - GUIDE_BORDER_SIZE + border * 2 + padding * 2}px`,
          height: `${height - GUIDE_BORDER_SIZE + border * 2 + padding * 2}px`,
          border: `${GUIDE_BORDER_SIZE}px solid black`,
          transform: `translate(${margin + boxPosition.x}px, ${
            margin + boxPosition.y
          }px)`,
        }}
      ></div>
      {/* Margin ares */}
      <div
        style={{
          position: 'absolute',
          width: `${
            width - GUIDE_BORDER_SIZE + margin * 2 + border * 2 + padding * 2
          }px`,
          height: `${
            height - GUIDE_BORDER_SIZE + margin * 2 + border * 2 + padding * 2
          }px`,
          border: `${GUIDE_BORDER_SIZE}px dashed black`,
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        }}
        onMouseDown={handleMouseDown}
      ></div>
      <div
        ref={box}
        style={{
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          border: `${border}px solid rgba(0, 0, 0, 0)`,
          padding: `${padding}px`,
          margin: `${margin}px`,
          overflow: 'auto',
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        }}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
      >
        {LARGE_CONTENT}
        <span
          style={{
            display: 'inline-block',
            top: '300px',
            left: '500px',
            position: 'absolute',
          }}
        >
          🙈
        </span>
      </div>
    </div>
  );
}

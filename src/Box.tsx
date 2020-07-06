import React, { useEffect, useState, useRef } from 'react';
import { Boundary } from './App';
import { LARGE_CONTENT } from './constants';

const GUIDE_BORDER_SIZE = 3;

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
  const monkey = useRef<HTMLSpanElement>(null);
  const [monkeyOffset, setMonkeyOffset] = useState({ top: 0, left: 0 });
  const [boxBoundingClientRect, setBoxBoundingClientRect] = useState<DOMRect>();
  const [boxDimension, setBoxDimension] = useState<BoxDimension>();
  const [boxPosition, setBoxPosition] = useState({ x: 300, y: 300 });
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
    const { current: monkeyElement } = monkey;
    if (!monkeyElement) {
      return;
    }

    setMonkeyOffset({
      top: monkeyElement.offsetTop,
      left: monkeyElement.offsetLeft,
    });
  }, []);

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
      const boxAreaWidth = width + border * 2 + padding * 2 + margin * 2;
      const boxAreaHeight = height + border * 2 + padding * 2 + margin * 2;

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
      setBoxBoundingClientRect(element.getBoundingClientRect());
    };

    const handleWindowMouseUp = () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };

    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
    event.preventDefault();
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
      >
        padding:<span className="num">{padding}</span>
      </div>
      {/* Border Guide */}
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
      >
        border:<span className="num">{border}</span>
      </div>
      {/* Margin Guide */}
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
      >
        margin:<span className="num">{margin}</span>
      </div>
      {/* Box dimension */}
      <div
        style={{
          width: '250px',
          position: 'absolute',
          transform: `translate(${boxPosition.x - 250}px, ${boxPosition.y}px)`,
        }}
      >
        width: <span className="num">{width}</span>
        <br />
        height: <span className="num">{height}</span>
        <br />
        offsetWidth: <span className="num">{boxDimension?.offsetWidth}</span>
        <br />
        offsetHeight: <span className="num">{boxDimension?.offsetHeight}</span>
        <br />
        clientWidth: <span className="num">{boxDimension?.clientWidth}</span>
        <br />
        clientHeight: <span className="num">{boxDimension?.clientHeight}</span>
        <br />
        clientTop: <span className="num">{boxDimension?.clientTop}</span>
        <br />
        clientLeft: <span className="num">{boxDimension?.clientLeft}</span>
        <br />
        scrollTop: <span className="num">{boxDimension?.scrollTop}</span>
        <br />
        scrollLeft: <span className="num">{boxDimension?.scrollLeft}</span>
        <br />
        ClientRect X: <span className="num">{boxBoundingClientRect?.x}</span>
        <br />
        ClientRect Y: <span className="num">{boxBoundingClientRect?.y}</span>
        <br />
        ClientRect width:{' '}
        <span className="num">{boxBoundingClientRect?.width}</span>
        <br />
        ClientRect height:{' '}
        <span className="num">{boxBoundingClientRect?.height}</span>
        <br />
        ClientRect top:{' '}
        <span className="num">{boxBoundingClientRect?.top}</span>
        <br />
        ClientRect left:{' '}
        <span className="num">{boxBoundingClientRect?.left}</span>
        <br />
        ClientRect bottom:{' '}
        <span className="num">{boxBoundingClientRect?.bottom}</span>
        <br />
        ClientRect right:{' '}
        <span className="num">{boxBoundingClientRect?.right}</span>
        <br />
        Monkey offsetTop: <span className="num">{monkeyOffset.top}</span>
        <br />
        Monkey offsetLeft: <span className="num">{monkeyOffset.left}</span>
      </div>
      {/* Box */}
      <div
        ref={box}
        style={{
          position: 'absolute',
          color: '#aaaaaa',
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
          ref={monkey}
          style={{
            display: 'inline-block',
            top: '150px',
            left: '220px',
            position: 'absolute',
          }}
        >
          🐵
        </span>
      </div>
    </div>
  );
}

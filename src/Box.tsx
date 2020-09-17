import React, { useEffect, useState, useRef } from 'react';
import { Boundary } from './App';
import { LARGE_CONTENT } from './constants';

export type BoxPosition = {
  x: number;
  y: number;
};

type BoxProps = {
  width: number;
  height: number;
  border: number;
  margin: number;
  padding: number;
  boundary: Boundary;
  pageXOffset: number;
  pageYOffset: number;
};

type BoxElementValues = {
  offsetWidth: number;
  offsetHeight: number;
  offsetTop: number;
  offsetLeft: number;
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
  const [boxElementValues, setBoxElementValues] = useState<BoxElementValues>();
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({
    x: 600,
    y: 200,
  });
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
      offsetTop,
      offsetLeft,
      clientWidth,
      clientHeight,
      clientTop,
      clientLeft,
      scrollTop,
      scrollLeft,
    } = element;
    setBoxElementValues({
      offsetWidth,
      offsetHeight,
      offsetTop,
      offsetLeft,
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
    setBoxElementValues(
      (state) => ({ ...state, scrollTop, scrollLeft } as BoxElementValues),
    );
  }

  function handleMouseDown(
    event: React.MouseEvent<SVGElement | HTMLDivElement>,
  ) {
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

  const marginBoundaryArea = {
    x: 0,
    y: 0,
    width: width + margin * 2 + border * 2 + padding * 2,
    height: height + margin * 2 + border * 2 + padding * 2,
  };
  const borderBoundaryArea = {
    x: margin,
    y: margin,
    width: width + border * 2 + padding * 2,
    height: height + border * 2 + padding * 2,
  };
  const paddingBoundaryArea = {
    x: margin + border,
    y: margin + border,
    width: width + padding * 2,
    height: height + padding * 2,
  };
  const contentBoundaryArea = {
    x: margin + border + padding,
    y: margin + border + padding,
    width,
    height,
  };
  return (
    <div style={{ position: 'relative' }}>
      <svg
        style={{
          position: 'absolute',
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        }}
        width={marginBoundaryArea.width}
        height={marginBoundaryArea.height}
        onMouseDown={handleMouseDown}
      >
        <rect
          x={marginBoundaryArea.x + 1}
          y={marginBoundaryArea.y + 1}
          width={marginBoundaryArea.width - 2}
          height={marginBoundaryArea.height - 2}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
            strokeDasharray: '10 10',
          }}
        />
        <text dominantBaseline="hanging" x={10} y="10">
          margin: {margin}
        </text>
        <rect
          {...borderBoundaryArea}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
          }}
        />
        <text
          dominantBaseline="hanging"
          x={borderBoundaryArea.x + 10}
          y={borderBoundaryArea.y + 10}
        >
          border: {border}
        </text>
        <rect
          {...paddingBoundaryArea}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
          }}
        />
        <text
          dominantBaseline="hanging"
          x={paddingBoundaryArea.x + 10}
          y={paddingBoundaryArea.y + 10}
        >
          padding: {padding}
        </text>
        <rect
          {...contentBoundaryArea}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
          }}
        />
      </svg>
      {/* Box */}
      <div
        ref={box}
        style={{
          cursor: 'move',
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
      {/* Box element values */}
      <div
        style={{
          width: '250px',
          position: 'absolute',
          transform: `translate(${boxPosition.x - 250}px, ${boxPosition.y}px)`,
        }}
      >
        <div>
          width: <span className="num">{width}</span>
        </div>
        <div>
          height: <span className="num">{height}</span>
        </div>
        <div>
          offsetTop: <span className="num">{boxElementValues?.offsetTop}</span>
        </div>
        <div>
          offsetLeft:{' '}
          <span className="num">{boxElementValues?.offsetLeft}</span>
        </div>
        <div>
          offsetWidth:{' '}
          <span className="num">{boxElementValues?.offsetWidth}</span>
        </div>
        <div>
          offsetHeight:{' '}
          <span className="num">{boxElementValues?.offsetHeight}</span>
        </div>
        <div>
          clientWidth:{' '}
          <span className="num">{boxElementValues?.clientWidth}</span>
        </div>
        <div>
          clientHeight:
          <span className="num">{boxElementValues?.clientHeight}</span>
        </div>
        <div>
          clientTop: <span className="num">{boxElementValues?.clientTop}</span>
        </div>
        <div>
          clientLeft:{' '}
          <span className="num">{boxElementValues?.clientLeft}</span>
        </div>
        <div>
          scrollTop: <span className="num">{boxElementValues?.scrollTop}</span>
        </div>
        <div>
          scrollLeft:{' '}
          <span className="num">{boxElementValues?.scrollLeft}</span>
        </div>
        <div>
          ClientRect X: <span className="num">{boxBoundingClientRect?.x}</span>
        </div>
        <div>
          ClientRect Y: <span className="num">{boxBoundingClientRect?.y}</span>
        </div>
        <div>
          ClientRect width:{' '}
          <span className="num">{boxBoundingClientRect?.width}</span>
        </div>
        <div>
          ClientRect height:{' '}
          <span className="num">{boxBoundingClientRect?.height}</span>
        </div>
        <div>
          ClientRect top:{' '}
          <span className="num">{boxBoundingClientRect?.top}</span>
        </div>
        <div>
          ClientRect left:{' '}
          <span className="num">{boxBoundingClientRect?.left}</span>
        </div>
        <div>
          ClientRect bottom:{' '}
          <span className="num">{boxBoundingClientRect?.bottom}</span>
        </div>
        <div>
          ClientRect right:{' '}
          <span className="num">{boxBoundingClientRect?.right}</span>
        </div>
        <div>
          Monkey offsetTop: <span className="num">{monkeyOffset.top}</span>
        </div>
        <div>
          Monkey offsetLeft: <span className="num">{monkeyOffset.left}</span>
        </div>
      </div>
    </div>
  );
}

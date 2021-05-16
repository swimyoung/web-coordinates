import React, { useState, useRef, useContext } from 'react';
import { AppBoundaryContext } from '~/App';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

type BoxPosition = {
  x: number;
  y: number;
};

function Box(): React.ReactElement {
  const box = useRef<HTMLDivElement>(null);
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({
    x: 100,
    y: 100,
  });
  const boundary = useContext(AppBoundaryContext);

  const width = 150;
  const height = 150;
  const padding = 30;
  const border = 30;
  const margin = 30;

  function handleMouseDown(
    event: React.MouseEvent<SVGElement | HTMLDivElement>,
  ) {
    const { current: element } = box;
    if (!element) {
      return;
    }

    const { pageX, pageY } = event;
    const boundingClientRect = element.getBoundingClientRect();
    const baseX = boundingClientRect.x + window.pageXOffset - margin - pageX;
    const baseY = boundingClientRect.y + window.pageYOffset - margin - pageY;

    const handleWindowMouseMove = (event: MouseEvent) => {
      event.preventDefault();
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
    };

    const handleWindowMouseUp = () => {
      removeWindowEventListener('mouseup', handleWindowMouseUp);
      removeWindowEventListener('mousemove', handleWindowMouseMove);
    };
    addWindowEventListener('mouseup', handleWindowMouseUp);
    addWindowEventListener('mousemove', handleWindowMouseMove);
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
          margin
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
          border
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
          padding
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
      <div
        ref={box}
        style={{
          cursor: 'move',
          position: 'absolute',
          width: `${width}px`,
          height: `${height}px`,
          border: `${border}px solid rgba(0, 0, 0, 0)`,
          padding: `${padding}px`,
          margin: `${margin}px`,
          boxSizing: 'content-box',
          overflow: 'scroll',
          transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`,
        }}
        onMouseDown={handleMouseDown}
      >
        <h1>BOX</h1>
        box-sizing: content-box
        <br />
        width: {width}px
        <br />
        height: {height}px
        <br />
        border: {border}px
        <br />
        padding: {padding}px
        <br />
        margin: {margin}px
        <div
          style={{
            position: 'relative',
            width: `${width * 4}px`,
            height: `${height * 4}px`,
          }}
        >
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
            scroll 👉👉👉
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}>👍</div>
        </div>
      </div>
    </div>
  );
}

export { Box };

import React, { useState, useRef, useContext, useEffect, memo } from 'react';
import { AppStateContext } from '~/App';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

interface BoxBoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface BoxSize {
  clientWidth: number;
  clientHeight: number;
  offsetWidth: number;
  offsetHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}

interface BoxPosition {
  clientLeft: number;
  clientTop: number;
  scrollLeft: number;
  scrollTop: number;
}

export interface BoxCoordinateValues {
  boxBoundingRect: BoxBoundingRect;
  boxSize: BoxSize;
  boxPosition: BoxPosition;
}

type BoxLocation = {
  x: number;
  y: number;
};

type BoxProps = {
  name?: string;
  onChangeBoxCoordinateValues?: (
    boxCoordinateValues: BoxCoordinateValues,
  ) => void;
};

function Box(props: BoxProps): React.ReactElement {
  const { name = 'Box', onChangeBoxCoordinateValues } = props;
  const boxElementRef = useRef<HTMLDivElement>(null);
  const [boxLocation, setBoxLocation] = useState<BoxLocation>({
    x: 100,
    y: 100,
  });
  const {
    appState: { boundary },
  } = useContext(AppStateContext);
  const getBoxCoordinateValues = () => {
    const { current: element } = boxElementRef;
    if (!element) {
      return;
    }

    return {
      boxBoundingRect: element.getBoundingClientRect(),
      boxSize: {
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
      },
      boxPosition: {
        clientLeft: element.clientLeft,
        clientTop: element.clientTop,
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop,
      },
    };
  };

  useEffect(() => {
    const params = getBoxCoordinateValues();
    params && onChangeBoxCoordinateValues(params);
  }, [boxLocation]);
  useEffect(
    () => {
      const params = getBoxCoordinateValues();
      params && onChangeBoxCoordinateValues(params);
    },
    [
      // there isn't changing of box size
      // will be added in the future
    ],
  );

  const handleBoxElementScroll = () => {
    const params = getBoxCoordinateValues();
    params && onChangeBoxCoordinateValues(params);
  };

  const handleBoxElementAndBoxSVGMouseDown = (
    event: React.MouseEvent<SVGElement | HTMLDivElement>,
  ) => {
    const { current: element } = boxElementRef;
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

      setBoxLocation({ x, y });
    };

    const handleWindowMouseUp = () => {
      removeWindowEventListener('mouseup', handleWindowMouseUp);
      removeWindowEventListener('mousemove', handleWindowMouseMove);
    };
    addWindowEventListener('mouseup', handleWindowMouseUp);
    addWindowEventListener('mousemove', handleWindowMouseMove);
  };

  const width = 150;
  const height = 150;
  const padding = 35;
  const border = 30;
  const margin = 25;
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
          transform: `translate(${boxLocation.x}px, ${boxLocation.y}px)`,
        }}
        width={marginBoundaryArea.width}
        height={marginBoundaryArea.height}
        onMouseDown={handleBoxElementAndBoxSVGMouseDown}
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
        ref={boxElementRef}
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
          transform: `translate(${boxLocation.x}px, ${boxLocation.y}px)`,
        }}
        onMouseDown={handleBoxElementAndBoxSVGMouseDown}
        onScroll={handleBoxElementScroll}
      >
        <h1>{name}</h1>
        box-sizing: content-box
        <br />
        padding: {padding}px
        <br />
        border: {border}px
        <br />
        margin: {margin}px
        <br />
        width: {width}px
        <br />
        height: {height}px
        <div
          style={{
            position: 'relative',
            width: `${width * 4}px`,
            height: `${height * 4}px`,
          }}
        >
          <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
            scroll to left
          </div>
          <div style={{ position: 'absolute', right: 0, bottom: 0 }}>!!</div>
        </div>
      </div>
    </div>
  );
}

const MemorizedBox = memo(Box);
export { Box, MemorizedBox };

import React, { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';
import { useBoundary } from '~/hooks/useBoundary';
import { Box } from '~/state/boxes';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

type BoxElementLocation = {
  x: number;
  y: number;
};

type BoxElementProps = {
  box: Box;
  width?: number;
  height?: number;
  padding?: number;
  border?: number;
  margin?: number;
  onChangeBox?: (box: Box) => void;
};

function BoxElement(props: BoxElementProps) {
  const {
    box,
    width = 150,
    height = 150,
    padding = 30,
    border = 35,
    margin = 40,
    onChangeBox,
  } = props;
  const marginArea = {
    x: 0,
    y: 0,
    width: width + margin * 2 + border * 2 + padding * 2,
    height: height + margin * 2 + border * 2 + padding * 2,
  };
  const borderArea = {
    x: margin,
    y: margin,
    width: width + border * 2 + padding * 2,
    height: height + border * 2 + padding * 2,
  };
  const paddingArea = {
    x: margin + border,
    y: margin + border,
    width: width + padding * 2,
    height: height + padding * 2,
  };
  const contentArea = {
    x: margin + border + padding,
    y: margin + border + padding,
    width,
    height,
  };
  const elementRef = useRef<HTMLDivElement>(null);
  const boundary = useBoundary();
  const [boxElementLocation, setBoxElementLocation] =
    useState<BoxElementLocation>(() => {
      return {
        x: Math.random() * (window.innerWidth / 2),
        y: Math.random() * (window.innerHeight / 2),
      };
    });

  useEffect(() => {
    changeBox();
  }, []);

  const changeBox = () => {
    const { current: element } = elementRef;
    throttledOnChangeBox?.({
      ...box,
      boundingClientRect: element.getBoundingClientRect(),
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight,
      clientLeft: element.clientLeft,
      clientTop: element.clientTop,
      scrollWidth: element.scrollWidth,
      scrollHeight: element.scrollHeight,
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight,
    });
  };
  const throttledOnChangeBox = throttle(onChangeBox, 50);

  const changeLocation = ({
    pageX,
    pageY,
    baseX,
    baseY,
  }: {
    pageX: number;
    pageY: number;
    baseX: number;
    baseY: number;
  }) => {
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

    setBoxElementLocation({ x, y });
    changeBox();
  };

  const changeLocationByMouseMove = ({
    startX,
    startY,
  }: {
    startX: number;
    startY: number;
  }) => {
    const { current: element } = elementRef;
    const boundingClientRect = element.getBoundingClientRect();
    const baseX = boundingClientRect.x + window.pageXOffset - margin - startX;
    const baseY = boundingClientRect.y + window.pageYOffset - margin - startY;

    const handleWindowMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      const { pageX, pageY } = event;
      changeLocation({ pageX, pageY, baseX, baseY });
    };

    const handleWindowMouseUp = () => {
      removeWindowEventListener('mouseup', handleWindowMouseUp);
      removeWindowEventListener('mousemove', handleWindowMouseMove);
    };
    addWindowEventListener('mouseup', handleWindowMouseUp);
    addWindowEventListener('mousemove', handleWindowMouseMove);
  };

  const handleBoxElementScroll = () => {
    changeBox();
  };

  const handleBoxElementMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const { pageX, pageY } = event;
    changeLocationByMouseMove({ startX: pageX, startY: pageY });
  };

  const handleBoxSVGMouseDown = (event: React.MouseEvent<SVGElement>) => {
    const { pageX, pageY } = event;
    changeLocationByMouseMove({ startX: pageX, startY: pageY });
  };

  return (
    <div style={{ position: 'relative' }}>
      <svg
        style={{
          position: 'absolute',
          transform: `translate(${boxElementLocation.x}px, ${boxElementLocation.y}px)`,
        }}
        width={marginArea.width}
        height={marginArea.height}
        onMouseDown={handleBoxSVGMouseDown}
      >
        <rect
          x={marginArea.x + 1}
          y={marginArea.y + 1}
          width={marginArea.width - 2}
          height={marginArea.height - 2}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
            strokeDasharray: '10 10',
          }}
        />
        <text dominantBaseline="hanging" x={10} y="10">
          margin: {margin}px
        </text>
        <rect
          {...borderArea}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
          }}
        />
        <text
          dominantBaseline="hanging"
          x={borderArea.x + 10}
          y={borderArea.y + 10}
        >
          border: {border}px
        </text>
        <rect
          {...paddingArea}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
          }}
        />
        <text
          dominantBaseline="hanging"
          x={paddingArea.x + 10}
          y={paddingArea.y + 10}
        >
          padding: {padding}px
        </text>
        <rect
          {...contentArea}
          style={{
            fill: 'transparent',
            stroke: '#000000',
            strokeWidth: '2',
          }}
        />
      </svg>

      {/* Actual element */}
      <div
        ref={elementRef}
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
          transform: `translate(${boxElementLocation.x}px, ${boxElementLocation.y}px)`,
        }}
        onMouseDown={handleBoxElementMouseDown}
        onScroll={handleBoxElementScroll}
      >
        <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{box.name}</div>
        <div>width: {width}px</div>
        <div>height: {height}px</div>
        {/* Make scroll */}
        <div
          style={{
            position: 'relative',
            width: `${width * 4}px`,
            height: `${height * 4}px`,
          }}
        ></div>
      </div>
    </div>
  );
}

export { BoxElement };

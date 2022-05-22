import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowUpShort } from '~/components/ArrowUpShort';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

const StyledDiv = styled.div`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  opacity: 0.8;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .console-resize-bar {
    width: 100%;
    height: 5px;
    background: 0 0;
    cursor: ns-resize;

    svg {
      display: none;
    }

    @media only screen and (max-width: 375px) {
      height: 30px;

      svg {
        margin: 0 auto;
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
      }
    }
  }

  .console-content-container {
    padding: 10px;
    overflow: auto;
    flex: 1;
  }
`;

type ConsoleProps = {
  children: React.ReactNode;
};

function ConsoleContainer(props: ConsoleProps) {
  const [height, setHeight] = useState(innerHeight * 0.3);

  const resizeConsoleHeight = (nextHeight: number) => {
    const minHeight = innerHeight * 0.1;
    const maxHeight = innerHeight * 0.9;

    setHeight(
      nextHeight < minHeight
        ? minHeight
        : nextHeight > maxHeight
        ? maxHeight
        : nextHeight,
    );
  };
  const handleTouchStartResize = (event: React.TouchEvent) => {
    const anchoredPageY = event.touches[0].pageY;
    const anchoredHeight = height;

    const handleWindowTouchMove = (event: TouchEvent) => {
      resizeConsoleHeight(
        anchoredHeight + anchoredPageY - event.touches[0].pageY,
      );
    };
    const handleWindowTouchEnd = () => {
      removeWindowEventListener('touchend', handleWindowTouchEnd);
      removeWindowEventListener('touchmove', handleWindowTouchMove);
    };
    addWindowEventListener('touchend', handleWindowTouchEnd);
    addWindowEventListener('touchmove', handleWindowTouchMove);
  };
  const handleMouseDownResize = (event: React.MouseEvent) => {
    event.preventDefault();
    const anchoredPageY = event.pageY;
    const anchoredHeight = height;

    const handleWindowMouseMove = (event: MouseEvent) => {
      resizeConsoleHeight(anchoredHeight + anchoredPageY - event.pageY);
    };
    const handleWindowMouseUp = (event: MouseEvent) => {
      resizeConsoleHeight(anchoredHeight + anchoredPageY - event.pageY);
      removeWindowEventListener('mouseup', handleWindowMouseUp);
      removeWindowEventListener('mousemove', handleWindowMouseMove);
    };
    addWindowEventListener('mouseup', handleWindowMouseUp);
    addWindowEventListener('mousemove', handleWindowMouseMove);
  };

  return (
    <StyledDiv style={{ height: `${height}px`, width: '100%' }}>
      <div className="console-resize-bar" onMouseDown={handleMouseDownResize}>
        <ArrowUpShort onTouchStart={handleTouchStartResize} />
      </div>
      {props.children}
    </StyledDiv>
  );
}
export { ConsoleContainer };

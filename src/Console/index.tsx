import React, { useState } from 'react';
import styled from 'styled-components';
import { ConsoleTabs } from './ConsoleTabs';
import { useWindowSize } from '../useWindowSize';
import { useWindowPosition } from '../useWindowPosition';

const TAB_HEIGHT = 30;
const TAB_RESIZE_BAR_HEIGHT = 5;

enum ConsolTabItem {
  Window = 'Window',
  Document = 'Document',
  Box = 'Box',
}

const StyledDiv = styled.div`
  background-color: #fff;
  opacity: 0.8;
  position: fixed;
  border: 1px solid;
  bottom: 0;
  left: 0;

  .console-resize-bar {
    width: 100%;
    height: ${() => TAB_RESIZE_BAR_HEIGHT}px;
    background: 0 0;
    cursor: ns-resize;
  }

  .console-content-container {
    padding: 10px;
    overflow: auto;
  }
`;

export function Console() {
  const {
    innerWidth,
    innerHeight,
    screenWidth,
    screenHeight,
  } = useWindowSize();
  const {
    pageXOffset,
    pageYOffset,
    scrollX,
    scrollY,
    mousePosition,
    touchPositions,
  } = useWindowPosition();
  const [selectedTab, setSelectedTab] = useState(ConsolTabItem.Window);
  const [height, setHeight] = useState(innerHeight * 0.3);
  const minHeight = innerHeight * 0.1;
  const maxHeight = innerHeight * 0.9;

  const handleMouseDownResizeCursor = (event: React.MouseEvent) => {
    event.preventDefault();
    const anchoredPageY = event.pageY;
    const anchoredHeight = height;
    const resizeConsoleHeight = (event: MouseEvent) => {
      const nextHeight = anchoredHeight + anchoredPageY - event.pageY;
      setHeight(
        nextHeight < minHeight
          ? minHeight
          : nextHeight > maxHeight
          ? maxHeight
          : nextHeight,
      );
    };
    const handleWindowMouseMove = (event: MouseEvent) => {
      resizeConsoleHeight(event);
    };
    const handleWindowMouseUp = (event: MouseEvent) => {
      resizeConsoleHeight(event);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };

    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('mousemove', handleWindowMouseMove);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case ConsolTabItem.Window: {
        return renderWindowTabContent();
      }
      case ConsolTabItem.Box: {
        return renderBoxTabContent();
      }
    }
  };

  const renderWindowTabContent = () => {
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
        ) : (
          <>
            <div>mouse.pageX: {mousePosition.pageX}</div>
            <div>mouse.pageY: {mousePosition.pageY}</div>
            <div>mouse.clientX: {mousePosition.clientX}</div>
            <div>mouse.clientY: {mousePosition.clientY}</div>
          </>
        )}
      </>
    );
  };

  const renderBoxTabContent = () => {
    return <>WIP:</>;
  };

  return (
    <StyledDiv style={{ height: `${height}px`, width: '100%' }}>
      <div
        className="console-resize-bar"
        onMouseDown={handleMouseDownResizeCursor}
      />
      <ConsoleTabs
        height={TAB_HEIGHT}
        items={[ConsolTabItem.Window, ConsolTabItem.Box]}
        selectedItem={selectedTab}
        onSelect={(item) => setSelectedTab(item as ConsolTabItem)}
      />
      <div
        style={{ height: height - TAB_HEIGHT - TAB_RESIZE_BAR_HEIGHT }}
        className="console-content-container"
      >
        {renderContent()}
      </div>
    </StyledDiv>
  );
}

import React, { useState } from 'react';
import styled from 'styled-components';
import { ConsoleTabs } from './ConsoleTabs';
import { useWindowSize } from '../useWindowSize';
import { useWindowPosition } from '../useWindowPosition';
import ArrowDownUpIcon from '../icons/ArrowDownUpIcon';

enum ConsolTabItem {
  Window = 'Window',
  Document = 'Document',
  Box = 'Box',
}

const StyledDiv = styled.div`
  background-color: #fff;
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
  }

  .console-content-container {
    padding: 10px;
    overflow: auto;
    flex: 1;
  }
`;

export function Console(): React.ReactElement {
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
      window.removeEventListener('touchend', handleWindowTouchEnd);
      window.removeEventListener('touchmove', handleWindowTouchMove);
    };
    window.addEventListener('touchend', handleWindowTouchEnd);
    window.addEventListener('touchmove', handleWindowTouchMove);
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
      case ConsolTabItem.Document: {
        return renderDocumentTabContent();
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

  const renderDocumentTabContent = () => {
    return <>WIP:</>;
  };

  const renderBoxTabContent = () => {
    return <>WIP:</>;
  };

  return (
    <StyledDiv style={{ height: `${height}px`, width: '100%' }}>
      <div className="console-resize-bar" onMouseDown={handleMouseDownResize} />
      <ArrowDownUpIcon
        onMouseDown={handleMouseDownResize}
        onTouchStart={handleTouchStartResize}
        style={{
          position: 'absolute',
          right: 0,
          margin: '10px',
          cursor: 'pointer',
          touchAction: 'none',
        }}
      />
      <ConsoleTabs
        items={[
          ConsolTabItem.Window,
          ConsolTabItem.Document,
          ConsolTabItem.Box,
        ]}
        selectedItem={selectedTab}
        onSelect={(item) => setSelectedTab(item as ConsolTabItem)}
      />
      <div className="console-content-container">{renderContent()}</div>
    </StyledDiv>
  );
}

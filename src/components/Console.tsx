import React, { useState } from 'react';
import styled from 'styled-components';
import { ConsoleTabs } from '~/components/ConsoleTabs';
import { ArrowDownUpIcon } from '~/components/icons/ArrowDownUpIcon';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';
import { ConsoleContentDocument } from './ConsoleContentDocument';
import { ConsoleContentWindow } from './ConsoleContentWindow';

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

  const renderContent = () => {
    switch (selectedTab) {
      case ConsolTabItem.Window: {
        return <ConsoleContentWindow />;
      }
      case ConsolTabItem.Document: {
        return <ConsoleContentDocument />;
      }
      case ConsolTabItem.Box: {
        return <>WIP:</>;
      }
    }
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

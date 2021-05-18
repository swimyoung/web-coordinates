import React, { useMemo, useState, memo } from 'react';
import styled from 'styled-components';
import { ConsoleTabs } from '~/components/ConsoleTabs';
import { ArrowUpShort } from '~/components/icons/ArrowUpShort';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';
import { ConsoleContentDocument } from './ConsoleContentDocument';
import { ConsoleContentWindow } from './ConsoleContentWindow';

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

interface ConsoleTab {
  tab: string;
  render: React.ReactElement | string | (() => React.ReactElement | string);
}

type ConsoleProps = {
  additionalTabs?: ConsoleTab[];
};

function Console(props: ConsoleProps): React.ReactElement {
  const { additionalTabs } = props;
  const tabs = useMemo<ConsoleTab[]>(() => {
    return [
      {
        tab: 'Window',
        render: <ConsoleContentWindow />,
      },
      {
        tab: 'Document',
        render: <ConsoleContentDocument />,
      },
      ...additionalTabs,
    ];
  }, [additionalTabs]);
  const [selectedTab, setSelectedTab] = useState('Window');
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
    const consoleTab = tabs.find(({ tab }) => tab === selectedTab);
    if (!consoleTab) {
      return;
    }

    const { render } = consoleTab;
    return typeof render === 'function' ? render() : render;
  };

  return (
    <StyledDiv style={{ height: `${height}px`, width: '100%' }}>
      <div className="console-resize-bar" onMouseDown={handleMouseDownResize}>
        <ArrowUpShort onTouchStart={handleTouchStartResize} />
      </div>

      <ConsoleTabs
        selectedItem={selectedTab}
        items={tabs.map(({ tab }) => tab)}
        onSelect={(item) => setSelectedTab(item)}
      />
      <div className="console-content-container">{renderContent()}</div>
    </StyledDiv>
  );
}
const MemorizedConsole = memo(Console);
export { Console, MemorizedConsole };

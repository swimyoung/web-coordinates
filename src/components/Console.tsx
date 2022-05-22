import React, { useMemo, useState } from 'react';
import { ConsoleTabs } from '~/components/ConsoleTabs';
import { ConsoleContainer } from '~/components/ConsoleContainer';
import { ConsoleContentDocument } from './ConsoleContentDocument';
import { ConsoleContentWindow } from './ConsoleContentWindow';
interface ConsoleTab {
  tab: string;
  render: React.ReactElement | string | (() => React.ReactElement | string);
}

type ConsoleProps = {
  additionalTabs?: ConsoleTab[];
};

export function Console(props: ConsoleProps) {
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

  const renderContent = () => {
    const consoleTab = tabs.find(({ tab }) => tab === selectedTab);
    if (!consoleTab) {
      return;
    }

    const { render } = consoleTab;
    return typeof render === 'function' ? render() : render;
  };

  return (
    <ConsoleContainer>
      <ConsoleTabs
        selectedItem={selectedTab}
        items={tabs.map(({ tab }) => tab)}
        onSelect={(item) => setSelectedTab(item)}
      />
      <div className="console-content-container">{renderContent()}</div>
    </ConsoleContainer>
  );
}

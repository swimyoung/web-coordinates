import React, { useMemo } from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #eee;
  list-style-type: none;

  li {
    cursor: pointer;
    text-align: center;
    padding: 5px 30px;
    border-bottom: 2px solid transparent;

    &.selected {
      border-bottom-color: #000;
    }
  }
`;

type ConsoleTabsProps = {
  height: number;
  items: string[];
  selectedItem: string;
  onSelect: (selected: string) => void;
};
export function ConsoleTabs(props: ConsoleTabsProps) {
  const { height, items, selectedItem, onSelect } = props;

  return (
    <StyledUl style={{ height: `${height}px` }}>
      {useMemo(
        () =>
          items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className={`${selectedItem === item ? 'selected' : ''}`}
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          )),
        [items],
      )}
    </StyledUl>
  );
}

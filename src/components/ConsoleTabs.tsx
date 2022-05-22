import React from 'react';
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
    padding: 5px 20px;
    border-bottom: 2px solid transparent;

    &.selected {
      border-bottom-color: #000;
    }
  }
`;

type ConsoleTabsProps = {
  items: string[];
  selectedItem: string;
  onSelect: (selected: string) => void;
};
export function ConsoleTabs(props: ConsoleTabsProps) {
  const { items, selectedItem, onSelect } = props;

  return (
    <StyledUl>
      {items.map((item, index) => (
        <li
          key={`${index}-${item}`}
          className={`${selectedItem === item ? 'selected' : ''}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </StyledUl>
  );
}

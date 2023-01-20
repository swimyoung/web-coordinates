import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { boxesState } from '~/state/boxes';
import {
  addWindowEventListener,
  removeWindowEventListener,
} from '~/utils/windowEventListen';

const Container = styled.div`
  background-color: #eee;
  opacity: 0.8;
  position: fixed;
  width: 600px;
  height: 100%;
  right: 0;
  padding: 20px;
  overflow: scroll;
  word-break: break-all;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media only screen and (max-width: 375px) {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    width: 100%;
    height: 250px;
    bottom: 0;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export function Console() {
  const [log, setLog] = useState<{ [k: string]: number }>({});
  const [filter, setFilter] = useState<string>('');
  const boxes = useRecoilValue(boxesState);

  useEffect(() => {
    setLog((log) => ({
      ...log,
      ...boxes.reduce((obj: { [k: string]: number }, box) => {
        const {
          name,
          boundingClientRect,
          clientLeft,
          clientTop,
          clientWidth,
          clientHeight,
          scrollWidth,
          scrollHeight,
          scrollTop,
          scrollLeft,
          offsetWidth,
          offsetHeight,
        } = box;
        obj[`${name}.element.boundingClientRect.x`] = boundingClientRect?.x;
        obj[`${name}.element.boundingClientRect.y`] = boundingClientRect?.y;
        obj[`${name}.element.boundingClientRect.top`] = boundingClientRect?.top;
        obj[`${name}.element.boundingClientRect.right`] =
          boundingClientRect?.right;
        obj[`${name}.element.boundingClientRect.bottom`] =
          boundingClientRect?.bottom;
        obj[`${name}.element.boundingClientRect.left`] =
          boundingClientRect?.left;
        obj[`${name}.element.boundingClientRect.width`] =
          boundingClientRect?.width;
        obj[`${name}.element.boundingClientRect.height`] =
          boundingClientRect?.height;
        obj[`${name}.element.clientLeft`] = clientLeft;
        obj[`${name}.element.clientTop`] = clientTop;
        obj[`${name}.element.clientWidth`] = clientWidth;
        obj[`${name}.element.clientHeight`] = clientHeight;
        obj[`${name}.element.offsetWidth`] = offsetWidth;
        obj[`${name}.element.offsetHeight`] = offsetHeight;
        obj[`${name}.element.scrollWidth`] = scrollWidth;
        obj[`${name}.element.scrollHeight`] = scrollHeight;
        obj[`${name}.element.scrollTop`] = scrollTop;
        obj[`${name}.element.scrollLeft`] = scrollLeft;
        return obj;
      }, {}),
    }));
  }, [boxes]);

  useEffect(() => {
    const updateLog = () => {
      setLog((log) => ({
        ...log,
        // document
        ['document.documentElement.clientWidth']:
          document.documentElement.clientWidth,
        ['document.documentElement.clientHeight']:
          document.documentElement.clientHeight,
        ['document.documentElement.offsetWidth']:
          document.documentElement.offsetWidth,
        ['document.documentElement.offsetHeight']:
          document.documentElement.offsetHeight,
        ['document.documentElement.scrollWidth']:
          document.documentElement.scrollWidth,
        ['document.documentElement.scrollHeight']:
          document.documentElement.scrollHeight,
        ['document.body.clientWidth']: document.body.clientWidth,
        ['document.body.clientHeight']: document.body.clientHeight,
        ['document.body.offsetWidth']: document.body.offsetWidth,
        ['document.body.offsetHeight']: document.body.offsetHeight,
        ['document.body.scrollWidth']: document.body.scrollWidth,
        ['document.body.scrollHeight']: document.body.scrollHeight,
        ['document.documentElement.scrollLeft']:
          document.documentElement.scrollLeft,
        ['document.documentElement.scrollTop']:
          document.documentElement.scrollTop,
        ['document.body.scrollLeft']: document.body.scrollLeft,
        ['document.body.scrollTop']: document.body.scrollTop,
        // window
        ['window.pageXOffset']: window.pageXOffset,
        ['window.pageYOffset']: window.pageYOffset,
        ['window.scrollX']: window.scrollX,
        ['window.scrollY']: window.scrollY,
        ['window.innerWidth']: window.innerWidth,
        ['window.innerHeight']: window.innerHeight,
        ['window.screen.width']: window.screen.width,
        ['window.screen.height']: window.screen.height,
        ['window.visualViewport.offsetLeft']: window.visualViewport.offsetLeft,
        ['window.visualViewport.offsetTop']: window.visualViewport.offsetTop,
        ['window.visualViewport.pageLeft']: window.visualViewport.pageLeft,
        ['window.visualViewport.pageTop']: window.visualViewport.pageTop,
        ['window.visualViewport.width']: window.visualViewport.width,
        ['window.visualViewport.height']: window.visualViewport.height,
        ['window.visualViewport.scale']: window.visualViewport.scale,
      }));
    };

    const handleWindowResize = () => {
      updateLog();
    };

    const handleWindowScroll = () => {
      updateLog();
    };

    const handleWindowMouseMove = (event: MouseEvent) => {
      const { clientX, clientY, pageX, pageY } = event;

      setLog((log) => ({
        ...log,
        [`windowMouseEvent.clientX`]: clientX,
        [`windowMouseEvent.clientY`]: clientY,
        [`windowMouseEvent.pageX`]: pageX,
        [`windowMouseEvent.pageY`]: pageY,
      }));
    };

    const handleTouchMove = (event: TouchEvent) => {
      Array.from(event.touches).map((touch, index) => {
        const { clientX, clientY, pageX, pageY } = touch;
        setLog((log) => ({
          ...log,
          [`windowTouchEvent[${index}].clientX`]: clientX,
          [`windowTouchEvent[${index}].clientY`]: clientY,
          [`windowTouchEvent[${index}].pageX`]: pageX,
          [`windowTouchEvent[${index}].pageY`]: pageY,
        }));
      });
    };

    updateLog();
    addWindowEventListener('mousemove', handleWindowMouseMove);
    addWindowEventListener('touchmove', handleTouchMove);
    addWindowEventListener('scroll', handleWindowScroll);
    addWindowEventListener('resize', handleWindowResize);
    return () => {
      removeWindowEventListener('mousemove', handleWindowMouseMove);
      removeWindowEventListener('touchmove', handleTouchMove);
      removeWindowEventListener('scroll', handleWindowScroll);
      removeWindowEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <Container>
      <input
        type="text"
        placeholder="filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      {Array.from(Object.entries(log))
        .filter(([key]) => key.toLowerCase().includes(filter.toLowerCase()))
        .sort(([key1], [key2]) => {
          return key1.localeCompare(key2);
        })
        .map(([key, value]) => {
          if (filter) {
            const parts = key.split(new RegExp(`(${filter})`, 'gi'));
            return (
              <div key={key}>
                {parts.map((part, i) => (
                  <span
                    key={i}
                    style={
                      part.toLowerCase() === filter.toLowerCase()
                        ? { fontWeight: 'bold' }
                        : {}
                    }
                  >
                    {part}
                  </span>
                ))}
                : {Math.floor(value)}
              </div>
            );
          }

          return (
            <div key={key}>
              {key}: {Math.floor(value)}
            </div>
          );
        })}
    </Container>
  );
}

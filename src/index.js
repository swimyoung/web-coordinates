import './index.css';
import 'normalize.css';

import 'core-js';
import 'regenerator-runtime/runtime';

import { drawCoordinate, drawBoxesDimension } from './draws';
import { LARGE_CONTENT } from './constants';

const BOX_COUNT = 1;

(async () => {
  await new Promise(resolve =>
    window.addEventListener('DOMContentLoaded', resolve),
  );

  const canvases = Array.from(document.getElementsByTagName('canvas'));
  const [
    unitTenCoordinateCanvas,
    unitHundredCoordinateCanvas,
    boxDimensionCanvas,
  ] = canvases;

  let boundingRect;
  {
    const elemSize = document.getElementById('size');
    const { width, height } = window.getComputedStyle(elemSize);
    boundingRect = { width: parseInt(width), height: parseInt(height) };
  }
  const boxes = Array.from({ length: BOX_COUNT }).map(() =>
    renderBox(boundingRect, () =>
      drawBoxesDimension(boxDimensionCanvas, boxes),
    ),
  );
  renderWindowDimension();

  const { width, height } = boundingRect;
  canvases.forEach(
    canvas =>
      canvas.setAttribute('width', width) ||
      canvas.setAttribute('height', height),
  );

  drawCoordinate(unitTenCoordinateCanvas, 10, '#eeeeee');
  drawCoordinate(unitHundredCoordinateCanvas, 100, '#777777', true);
  drawBoxesDimension(boxDimensionCanvas, boxes);
})();

function renderBox(boundingRect, callback) {
  const element = document.createElement('div');
  element.style = `
      position: absolute;
      width: 200px;
      height: 200px;
      margin: 40px;
      border: 50px solid rgba(0, 0, 0, 0);
      padding: 60px;
      overflow: auto;
      transform: translate(${Math.floor(
        Math.random() * (window.innerWidth / 2),
      )}px, ${Math.floor(Math.random() * (window.innerHeight / 2))}px)
    `;

  element.addEventListener('scroll', () => {
    callback(element);
  });

  element.addEventListener('mousedown', event => {
    const { x, y, width, height } = element.getBoundingClientRect();
    const [margin] = Object.entries(window.getComputedStyle(element))
      .filter(([key]) => ['margin'].indexOf(key) !== -1)
      .map(([, value]) => parseInt(value));

    const { pageX: pageXOfMouseDown, pageY: pageYOfMouseDown } = event;
    const baseX = x + window.pageXOffset - margin - pageXOfMouseDown;
    const baseY = y + window.pageYOffset - margin - pageYOfMouseDown;

    const handleWindowMouseMove = event => {
      const { pageX, pageY } = event;
      const boxAreaWidth = width + margin * 2;
      const boxAreaHeight = height + margin * 2;
      let x = baseX + pageX;
      let y = baseY + pageY;

      if (x + boxAreaWidth > boundingRect.width) {
        x = boundingRect.width - boxAreaWidth;
      } else if (x < 0) {
        x = 0;
      }

      if (y + boxAreaHeight > boundingRect.height) {
        y = boundingRect.height - boxAreaHeight;
      } else if (y < 0) {
        y = 0;
      }

      element.style.transform = `translate(${x}px, ${y}px)`;
      callback(element);
    };

    const handleWindowMouseUp = () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  });

  element.innerHTML = `
    ${LARGE_CONTENT}
    <div 
      style="
        width: 100px; 
        height: 100px; 
        top: 300px; 
        left: 500px; 
        position: absolute;
      "
    >&#x1F649;</div>
  `;
  document.body.appendChild(element);

  return element;
}

function renderWindowDimension() {
  const mousePositionElement = document.createElement('pre');
  const windowBoxElement = document.createElement('pre');
  const position = {};

  mousePositionElement.style = windowBoxElement.style = `
    position: absolute;
    margin: 14px;
  `;

  window.addEventListener('resize', () => renderWindowBox());

  window.addEventListener('scroll', () => {
    renderWindowBox();

    if (typeof position.clientX === 'undefined') return;
    const { pageXOffset, pageYOffset } = window;
    Object.assign(position, {
      pageX: position.clientX + pageXOffset,
      pageY: position.clientY + pageYOffset,
    });
    renderMousePosition(
      position.clientX + pageXOffset,
      position.clientY + pageYOffset,
    );
  });

  window.addEventListener('mousemove', event => {
    const { clientX, clientY, pageX, pageY } = event;
    Object.assign(position, { clientX, clientY, pageX, pageY });
    renderMousePosition(pageX, pageY);
  });

  const renderMousePosition = (x, y) => {
    const { clientX, clientY, pageX, pageY } = position;
    mousePositionElement.style.transform = `translate(${x}px, ${y}px)`;
    mousePositionElement.textContent = `clientX: ${clientX}
clientY: ${clientY}
pageX: ${pageX}
pageY: ${pageY}`;
  };

  const renderWindowBox = () => {
    const { innerWidth, innerHeight, pageXOffset, pageYOffset } = window;
    windowBoxElement.style.transform = `translate(${pageXOffset}px, ${pageYOffset}px)`;
    windowBoxElement.textContent = `innerWidth:${innerWidth}
innerHeight:${innerHeight}
pageXOffset:${pageXOffset}
pageYoffset:${pageYOffset}`;
  };

  document.body.appendChild(mousePositionElement);
  document.body.appendChild(windowBoxElement);
  renderWindowBox();
}

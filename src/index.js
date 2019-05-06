import './index.css';
import {
  drawCoordinate,
  drawWindowDimension,
  drawBoxesDimension,
} from './draws';
import { LARGE_CONTENT } from './constants';

const BOX_COUNT = 1;

(async () => {
  await new Promise(resolve => window.addEventListener('load', resolve));

  const canvases = Array.from(document.getElementsByTagName('canvas'));
  const [
    unitTenCoordinateCanvas,
    unitHundredCoordinateCanvas,
    windowDimensionCanvas,
    boxDimensionCanvas,
  ] = canvases;

  let boundingRect;
  {
    const elemSize = document.getElementById('size');
    const { width, height } = window.getComputedStyle(elemSize);
    boundingRect = { width: parseInt(width), height: parseInt(height) };
  }
  const handleBoxMove = () => {
    drawBoxesDimension(boxDimensionCanvas, boxes);
  };
  const boxes = Array.from({ length: BOX_COUNT }).map(() =>
    renderBox(boundingRect, handleBoxMove),
  );

  const { width, height } = boundingRect;
  canvases.forEach(
    canvas =>
      canvas.setAttribute('width', width) ||
      canvas.setAttribute('height', height),
  );

  drawCoordinate(unitTenCoordinateCanvas, 10, '#eeeeee');
  drawCoordinate(unitHundredCoordinateCanvas, 100, '#777777', true);
  drawWindowDimension(windowDimensionCanvas);
  drawBoxesDimension(boxDimensionCanvas, boxes);

  window.addEventListener(
    'resize',
    drawWindowDimension.bind(null, windowDimensionCanvas),
  );
  window.addEventListener(
    'scroll',
    drawWindowDimension.bind(null, windowDimensionCanvas),
  );
  window.addEventListener(
    'mousemove',
    drawWindowDimension.bind(null, windowDimensionCanvas),
  );
})();

function renderBox(boundingRect, callback) {
  const element = document.createElement('div');
  element.style = `
      position: absolute;
      width: 200px;
      height: 200px;
      margin: 30px;
      border: 40px solid rgba(0, 0, 0, 0);
      padding: 50px;
      overflow: auto;
      transform: translate(${Math.floor(
        Math.random() * window.innerWidth,
      )}px, ${Math.floor(Math.random() * window.innerHeight)}px)
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

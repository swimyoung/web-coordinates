import './index.scss';
import {
  drawCoordinate,
  drawWindowDimension,
  drawBoxesDimension,
} from './draws';

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

  window.addEventListener('resize', () => {
    drawWindowDimension(windowDimensionCanvas);
  });

  window.addEventListener('scroll', () => {
    drawWindowDimension(windowDimensionCanvas);
  });
})();

function renderBox(boundingRect, callback) {
  const element = document.createElement('div');
  element.style = `
      position: absolute;
      width: 100px;
      height: 100px;
      margin: 30px;
      border: 40px solid rgba(0, 0, 0, 0);
      padding: 50px;
      transform: translate(${Math.floor(
        Math.random() * window.innerWidth,
      )}px, ${Math.floor(Math.random() * window.innerHeight)}px)
    `;

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
      let x = baseX + pageX;
      let y = baseY + pageY;

      if (x + width > boundingRect.width) x = boundingRect.width - width;
      else if (x < 0) x = 0;

      if (y + height > boundingRect.height) y = boundingRect.height - height;
      else if (y < 0) y = 0;

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

  document.body.appendChild(element);

  return element;
}

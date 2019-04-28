import './index.scss';
import { drawCoordinate, drawWindowDimension } from './draws';

(async () => {
  await new Promise(resolve => window.addEventListener('load', resolve));

  const canvases = Array.from(document.getElementsByTagName('canvas'));
  const elemSize = document.getElementById('size');

  let { width, height } = window.getComputedStyle(elemSize);
  width = parseInt(width);
  height = parseInt(height);

  canvases.forEach(canvas => {
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
  });

  const [
    unitTenCoordinateCanvas,
    unitHundredCoordinateCanvas,
    windowDimensionCanvas,
  ] = canvases;
  drawCoordinate(unitTenCoordinateCanvas, 10, '#eeeeee');
  drawCoordinate(unitHundredCoordinateCanvas, 100, '#777777', true);
  drawWindowDimension(windowDimensionCanvas);

  window.addEventListener('resize', () => {
    drawWindowDimension(windowDimensionCanvas);
  });

  window.addEventListener('scroll', () => {
    drawWindowDimension(windowDimensionCanvas);
  });
})();

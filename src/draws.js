export function drawCoordinate(canvas, unit, color, withUnitText = false) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.font = `12px 'Courier New', Courier, monospace`;

  // Rows
  Array.from({ length: Math.ceil(height / unit) }).forEach((_, index) => {
    const y = index * unit;

    if (y !== 0 && withUnitText) {
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.fillText(y, 0, y + 10);
      ctx.restore();
    }

    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  });
  // Columns
  Array.from({ length: Math.ceil(width / unit) }).forEach((_, index) => {
    const x = index * unit;

    if (x !== 0 && withUnitText) {
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.fillText(x, x, 10);
      ctx.restore();
    }

    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  });

  ctx.stroke();
}

export function drawWindowDimension(canvas) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');
  const { innerWidth, innerHeight, pageXOffset, pageYOffset } = window;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#3d7e9a';
  ctx.font = `14px 'Courier New', Courier, monospace`;

  const x = pageXOffset + innerWidth / 2 - 100;
  ctx.fillText(`innerWidth: ${innerWidth}`, x, pageYOffset + 35);
  ctx.fillText(`innerHeight: ${innerHeight}`, x, pageYOffset + 50);
  ctx.fillText(`pageXOffset: ${pageXOffset}`, x, pageYOffset + 65);
  ctx.fillText(`pageYoffset: ${pageYOffset}`, x, pageYOffset + 80);
}

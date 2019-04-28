export function drawCoordinate(canvas, unit, color, withUnitText = false) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  const ctx = canvas.getContext('2d');
  const { innerWidth, innerHeight, pageXOffset, pageYOffset } = window;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#e4f8e1';
  ctx.font = `14px 'Courier New', Courier, monospace`;

  ctx.save();
  ctx.fillText(`innerWidth:${innerWidth}`, pageXOffset + 30, pageYOffset + 35);
  ctx.fillText(
    `innerHeight:${innerHeight}`,
    pageXOffset + 30,
    pageYOffset + 50,
  );
  ctx.restore();

  const gap = 20;
  ctx.moveTo(pageXOffset, pageYOffset + gap);
  ctx.lineTo(pageXOffset + innerWidth, pageYOffset + gap);
  ctx.moveTo(pageXOffset + gap, pageYOffset);
  ctx.lineTo(pageXOffset + gap, pageYOffset + innerHeight);
  ctx.stroke();
}

function getAngleOfDegree(degree) {
  return (degree * Math.PI) / 180;
}

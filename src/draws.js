export function drawCoordinate(canvas, unit, color, withUnitText = false) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.save();
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
  ctx.restore();
}

export function drawWindowDimension(canvas) {
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');
  const { innerWidth, innerHeight, pageXOffset, pageYOffset } = window;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#3d7e9a';
  ctx.font = `14px 'Courier New', Courier, monospace`;
  const x = pageXOffset + 30;
  ctx.fillText(`innerWidth:${innerWidth}`, x, pageYOffset + 35);
  ctx.fillText(`innerHeight:${innerHeight}`, x, pageYOffset + 50);
  ctx.fillText(`pageXOffset:${pageXOffset}`, x, pageYOffset + 65);
  ctx.fillText(`pageYoffset:${pageYOffset}`, x, pageYOffset + 80);
  ctx.restore();
}

export function drawBoxesDimension(canvas, boxOrBoxes) {
  const boxes = [].concat(boxOrBoxes);
  const { width, height } = canvas;
  const { pageXOffset, pageYOffset } = window;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  const fontSize = 14;
  ctx.font = `${fontSize}px 'Courier New', Courier, monospace`;

  boxes.forEach(box => {
    const {
      x: clientRectX,
      y: clientRectY,
      width,
      height,
    } = box.getBoundingClientRect();
    const { clientWidth, clientHeight, clientTop, clientLeft } = box;
    const [border, margin, padding] = Object.entries(
      window.getComputedStyle(box),
    )
      .filter(([key]) => ['border', 'margin', 'padding'].indexOf(key) !== -1)
      .map(([, value]) => parseInt(value));

    const x = clientRectX + pageXOffset;
    const y = clientRectY + pageYOffset;

    // margin edge
    ctx.fillStyle = 'rgba(88, 46, 155, 0.2)';
    ctx.fillRect(
      x - margin,
      y - margin,
      width + margin * 2,
      height + margin * 2,
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(`margin:${margin}px`, x - margin, y - margin);

    // border edge
    ctx.fillStyle = 'rgba(88, 46, 155, 0.2)';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = '#000000';
    ctx.fillText(`border:${border}px`, x, y);

    // clientTop & clientLeft
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.moveTo(x + width - border, y);
    ctx.lineTo(x + width - border, y + border);
    ctx.moveTo(x, y + border + height - border * 2);
    ctx.lineTo(x + border, y + border + height - border * 2);
    ctx.stroke();
    ctx.fillText(`clientTop:${clientTop}px`, x + width - border, y - 2);
    ctx.fillText(
      `clientLeft:${clientLeft}px`,
      x - 90 - border,
      y + border + height - border * 2,
    );

    // padding edge
    ctx.fillStyle = 'rgba(88, 46, 155, 0.2)';
    ctx.fillRect(
      x + border,
      y + border,
      width - border * 2,
      height - border * 2,
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(`padding:${padding}px`, x + border, y + border - 2);

    // clientWidth & clientHeight
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.strokeRect(
      x + border,
      y + border,
      width - border * 2,
      height - border * 2,
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(
      `clientWidth:${clientWidth}px`,
      x + border,
      y + border + height - border * 2 + fontSize,
    );
    ctx.fillText(
      `clientHeight:${clientHeight}px`,
      x + border,
      y + border + height - border * 2 + fontSize * 2,
    );

    // content
    ctx.fillStyle = 'rgba(88, 46, 155, 0.2)';
    ctx.fillRect(
      x + padding + border,
      y + padding + border,
      width - (padding + border) * 2,
      height - (padding + border) * 2,
    );
    ctx.fillStyle = '#000000';
    ctx.fillText(
      `w:${width - (padding + border) * 2}px`,
      x + padding + border,
      y + padding + border,
    );
    ctx.fillText(
      `h:${height - (padding + border) * 2}px`,
      x + padding + border,
      y + padding + border + fontSize,
    );

    // x, y of getBoundingClientRect
    ctx.strokeStyle = 'rgba(88, 46, 155, 0.7)';
    ctx.beginPath();
    ctx.moveTo(pageXOffset, y);
    ctx.lineTo(pageXOffset + clientRectX, y);
    ctx.moveTo(x, pageYOffset);
    ctx.lineTo(x, pageYOffset + clientRectY);
    ctx.stroke();
    ctx.fillText(
      `clientRectX:${clientRectX}`,
      pageXOffset + clientRectX - 140 - margin,
      y - margin,
    );
    ctx.fillText(
      `clientRectY:${clientRectY}`,
      pageXOffset + clientRectX - 140 - margin,
      y - margin + fontSize,
    );
  });

  ctx.restore();
}

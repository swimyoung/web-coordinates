export function drawCoordinate(canvas, unit, color, withUnitText = false) {
  const fontSize = 14;
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.font = `${fontSize}px 'Courier New', Courier, monospace`;

  Array.from({ length: Math.ceil(height / unit) }).forEach((_, index) => {
    const y = index * unit;
    if (y !== 0 && withUnitText) {
      ctx.fillText(y, 0, y + fontSize);
    }
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  });

  Array.from({ length: Math.ceil(width / unit) }).forEach((_, index) => {
    const x = index * unit;
    if (x !== 0 && withUnitText) {
      ctx.fillText(x, x, fontSize);
    }
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  });

  ctx.stroke();
  ctx.restore();
}

export function drawBoxesDimension(canvas, boxOrBoxes) {
  const TEXT_Y_GAP = 10;
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
    const {
      offsetWidth,
      offsetHeight,
      clientWidth,
      clientHeight,
      clientTop,
      clientLeft,
      scrollTop,
      scrollLeft,
    } = box;
    const [border, margin, padding] = Object.entries(
      window.getComputedStyle(box),
    )
      .filter(([key]) => ['border', 'margin', 'padding'].indexOf(key) !== -1)
      .map(([, value]) => parseInt(value));

    const x = clientRectX + pageXOffset;
    const y = clientRectY + pageYOffset;

    // margin edge
    ctx.setLineDash([15, 5]);
    ctx.lineWidth = 3;
    ctx.strokeRect(
      x - margin,
      y - margin,
      width + margin * 2,
      height + margin * 2,
    );
    ctx.fillText(`margin:${margin}`, x - margin, y - margin - TEXT_Y_GAP);

    // border edge
    ctx.setLineDash([]);
    ctx.strokeRect(x, y, width, height);
    ctx.fillText(`border:${border}`, x, y - TEXT_Y_GAP);

    // padding edge
    ctx.setLineDash([15, 5]);
    ctx.lineWidth = 1;
    ctx.strokeRect(
      x + border,
      y + border,
      width - border * 2,
      height - border * 2,
    );
    ctx.fillText(`padding:${padding}`, x + border, y + border - TEXT_Y_GAP);

    // content
    ctx.setLineDash([]);
    ctx.strokeRect(
      x + padding + border,
      y + padding + border,
      width - (padding + border) * 2,
      height - (padding + border) * 2,
    );
    ctx.fillText(
      `w:${width - (padding + border) * 2}`,
      x + padding + border,
      y + padding + border - fontSize - TEXT_Y_GAP,
    );
    ctx.fillText(
      `h:${height - (padding + border) * 2}`,
      x + padding + border,
      y + padding + border - TEXT_Y_GAP,
    );

    // clientWidth & clientHeight
    ctx.fillText(
      `clientWidth:${clientWidth}`,
      x + border,
      y + border + height - border * 2 + fontSize,
    );
    ctx.fillText(
      `clientHeight:${clientHeight}`,
      x + border,
      y + border + height - border * 2 + fontSize * 2,
    );

    // offsetWidth & offsetHeight
    ctx.fillText(`offsetWidth:${offsetWidth}`, x, y + height + fontSize);
    ctx.fillText(`offsetHeight:${offsetHeight}`, x, y + height + fontSize * 2);

    // scrollTop & scrollLeft
    ctx.fillText(
      `scrollTop:${scrollTop}`,
      x + border + clientWidth / 2,
      y + border - TEXT_Y_GAP - fontSize,
    );
    ctx.fillText(
      `scrollLeft:${scrollLeft}`,
      x + border + clientWidth / 2,
      y + border - TEXT_Y_GAP,
    );

    // x, y of getBoundingClientRect
    ctx.beginPath();
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
    // clientTop & clientLeft
    ctx.fillText(
      `clientTop:${clientTop}`,
      pageXOffset + clientRectX - 140 - margin,
      y - margin + fontSize * 2,
    );
    ctx.fillText(
      `clientLeft:${clientLeft}`,
      pageXOffset + clientRectX - 140 - margin,
      y - margin + fontSize * 3,
    );
  });

  ctx.restore();
}

function drawRectAroundCenter(ctx, tile, tileHeight) {
  const step = 0;
  const {centerX, centerY, drawOps} = tile;
  const halfHeight = tileHeight / 2;
  ctx.beginPath();
  ctx.fillStyle = drawOps.fillStyle || 'black';
  ctx.strokeStyle = drawOps.strokeStyle || 'black';
  ctx.lineWidth = drawOps.lineWidth || 1;
  ctx.moveTo(centerX, centerY - halfHeight + step);
  ctx.lineTo(centerX + step - tileHeight, centerY);
  ctx.lineTo(centerX, centerY + halfHeight - step);
  ctx.lineTo(centerX + tileHeight - step, centerY);
  ctx.lineTo(centerX, centerY - halfHeight + step);
  drawOps.strokeStyle && ctx.stroke();
  drawOps.fillStyle && ctx.fill();
  ctx.closePath();
}
export default drawRectAroundCenter;

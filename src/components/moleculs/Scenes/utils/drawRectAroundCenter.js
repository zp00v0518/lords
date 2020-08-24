function drawRectAroundCenter(ctx, center = {}, tileHeight, ops = {}) {
  const step = 0;
  const centerX = center.x;
  const centerY = center.y;
  const halfHeight = tileHeight / 2;
  ctx.beginPath();
  ctx.fillStyle = ops.fillStyle;
  ctx.strokeStyle = ops.strokeStyle || 'black';
  ctx.lineWidth = ops.lineWidth || 1;
  ctx.moveTo(centerX, centerY - halfHeight + step);
  ctx.lineTo(centerX + step - tileHeight, centerY);
  ctx.lineTo(centerX, centerY + halfHeight - step);
  ctx.lineTo(centerX + tileHeight - step, centerY);
  ctx.lineTo(centerX, centerY - halfHeight + step);
  ctx.stroke();
  ops.fillStyle && ctx.fill();
  ctx.closePath();
}
export default drawRectAroundCenter;

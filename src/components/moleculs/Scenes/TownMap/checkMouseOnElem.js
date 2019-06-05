function checkMouseCoordsOnMap() {
  const coords = this.borderIsoMap;
  const left = coords.left;
  const top = coords.top;
  const right = coords.right;
  const bottom = coords.bottom;
  const ctx = this.ctx;
  ctx.beginPath();
  ctx.strokeStyle = 'transparent';
  ctx.moveTo(left.x, left.y);
  ctx.lineTo(top.x, top.y);
  ctx.lineTo(right.x, right.y);
  ctx.lineTo(bottom.x, bottom.y);
  ctx.stroke();
  ctx.closePath();
  const flag = ctx.isPointInPath(this.mouseCoords.x, this.mouseCoords.y);
  this.cursorOnScene = flag;
  return flag;
}

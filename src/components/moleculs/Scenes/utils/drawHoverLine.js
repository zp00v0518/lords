import drawRectAroundCenter from './drawRectAroundCenter';

function drawHoverLine(rombIndex) {
  let x = rombIndex.x;
  let y = rombIndex.y;
  let obj = this.currentMap[x][y];
  if (!obj) return;
  let ctx = this.ctx;
  let tileWidth = this.tileWidth;
  let tileHeight = tileWidth / 2;
  drawRectAroundCenter(ctx, { x: obj.centerX, y: obj.centerY }, tileHeight, { strokeStyle: 'yellow', lineWidth: 2 });
  return true;
}

export default drawHoverLine;

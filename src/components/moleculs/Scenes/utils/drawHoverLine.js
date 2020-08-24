import drawRectAroundCenter from './drawRectAroundCenter';

function drawHoverLine(rombIndex) {
  let x = rombIndex.x;
  let y = rombIndex.y;
  let tile = this.currentMap[x][y];
  if (!tile) return;
  let ctx = this.ctx;
  let tileWidth = this.tileWidth;
  let tileHeight = tileWidth / 2;
  tile.drawOps.strokeStyle = 'yellow';
  tile.drawOps.lineWidth = 2;
  drawRectAroundCenter(ctx, tile, tileHeight);
  return true;
}

export default drawHoverLine;

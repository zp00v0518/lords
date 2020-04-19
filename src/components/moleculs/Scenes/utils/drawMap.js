// https://habr.com/ru/post/332922/ - одна из статей
// https://www.youtube.com/watch?v=nls0dyTeEns&list=PLHcq_lDrZqm0pcMN36rKfFUnxQvasRGRP
function drawMap() {
  let mapArr = this.currentMap;
  let ctx = this.ctx;
  const { canvas } = ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const tileWidth = this.tileWidth;
  const tileHeight = tileWidth / 2;
  const halfHeight = tileHeight / 2;
  // сдвиг начала оси Х влево
  const startX = this.isoCoords.x;
  const startY = this.isoCoords.y + halfHeight;
  for (let x = 0; x < mapArr.length; x++) {
    const row = mapArr[x];
    for (let y = 0; y < row.length; y++) {
      const centerX = getIsoX(x, y) * tileHeight + startX;
      const centerY = getIsoY(x, y) * tileHeight + startY;
      this.currentMap[x][y].centerX = centerX;
      this.currentMap[x][y].centerY = centerY;
      drawRectAroundCenter(centerX, centerY, mapArr[x][y].type);
      drawCoords(this.currentMap[x][y]);
    }
  }
  function drawCoords(tile) {
    const shit = tileHeight / 2;
    const str = `x:${tile.x}  y:${tile.y}`;
    ctx.fillStyle = 'black';
    ctx.fillText(str, tile.centerX - shit, tile.centerY + shit / 6);
  }
  function drawRectAroundCenter(centerX, centerY, grid) {
    const step = 0;
    ctx.beginPath();
    ctx.fillStyle = colors[grid];
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1;
    ctx.moveTo(centerX, centerY - halfHeight + step);
    ctx.lineTo(centerX + step - tileHeight, centerY);
    ctx.lineTo(centerX, centerY + halfHeight - step);
    ctx.lineTo(centerX + tileHeight - step, centerY);
    ctx.lineTo(centerX, centerY - halfHeight + step);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
  this.drawAnotherObjects && this.drawAnotherObjects();
}

const colors = {
  0: 'rgba(26,128,0,0.7)', // green
  1: 'blue',
  2: 'brown',
  3: 'rgba(0,0,0,0.4)'
};

function getIsoX(x, y) {
  return x - y;
}
function getIsoY(x, y) {
  return (x + y) / 2;
}

export default drawMap;

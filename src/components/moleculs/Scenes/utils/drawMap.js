// https://habr.com/ru/post/332922/ - одна из статей
// https://www.youtube.com/watch?v=nls0dyTeEns&list=PLHcq_lDrZqm0pcMN36rKfFUnxQvasRGRP
import iso from './iso';

function drawMap() {
  const { currentSector, $store } = this;
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
      const centerX = iso.getIsoX(x, y) * tileHeight + startX;
      const centerY = iso.getIsoY(x, y) * tileHeight + startY;
      const tile = this.currentMap[x][y];
      tile.centerX = centerX;
      tile.centerY = centerY;
      let color = colors[tile.type];
      if (currentSector.x === tile.x && currentSector.y === tile.y) {
        color = colors.center;
      }
      drawRectAroundCenter(centerX, centerY, color);
      drawGameImage(ctx, tile, tileWidth, $store, currentSector);
    }
  }
  function drawRectAroundCenter(centerX, centerY, color) {
    const step = 0;
    ctx.beginPath();
    ctx.fillStyle = color;
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
function drawGameImage(ctx, tile, tileWidth, $store, curSector) {
  const { globalConfig, gameSources } = $store.state;
  const { centerX, centerY } = tile;
  const raceIndex = curSector.town.race;
  const raceName = globalConfig.all.Race.typeList[raceIndex];
  const tileHeight = tileWidth / 2;
  if (tile.type === 1) {
    const img = gameSources.towns[raceName].ico[raceName];
    const scale = tileWidth / img.width;
    const imgSize = img.width * scale;
    const x = centerX - imgSize / 2;
    const y = centerY - imgSize + tileHeight / 2;
    ctx.drawImage(img, x, y, imgSize, imgSize);
  } else if (tile.type === 2 && tile.class !== 'map') {
    const tileSector = tile.sector;
    const { type } = tileSector;
    const classSector = tileSector.class;
    const img = gameSources.region[classSector][type];
    const scale = img.width / tileWidth;
    const x = centerX - tileHeight;
    const y = centerY - tileHeight;
    ctx.drawImage(img, x, y, img.width / scale, img.height / scale);
  } else if (tile.type === 0 && tile.class !== 'map') {
    // const typeName = globalConfig.all.Region.typeList[tile.type];
    // const img = gameSources.terrain[typeName];
    // const scaleWidth = tileWidth / img.width;
    // const scaleHeight = tileHeight / img.height;
    // const x = centerX - (img.width * scaleWidth) / 2;
    // const y = centerY - ((img.height * scaleHeight) / 2)- tileHeight / 4;
    // ctx.drawImage(img, x, y, img.width * scaleWidth, img.height * scaleHeight);
  }
}

const colors = {
  0: 'rgba(26,128,0,0.7)', // green
  1: 'blue',
  2: 'brown',
  // 2: 'rgba(26,128,0,0.7)',
  3: 'rgba(0,0,0,0.4)',
  center: 'white'
};

export default drawMap;

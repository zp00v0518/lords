const getSectorOnMatrix = require('./getSectorOnMatrix');

function getGlobalMapSector(user, server) {
  const result = [];
  const length = GlobalMap[server].length;
  const zoom = user.globalMap.zoom;
  let rangeSize = gameVariables.viewSectionGlobalMapNow * zoom; //10*zoom;
  const centerX = user.globalMap.centerMap.x;
  const centerY = user.globalMap.centerMap.y;
  const computedCoords = getSectorOnMatrix(length, rangeSize, { x: centerX, y: centerY });
  for (let i = 0; i < computedCoords.length; i++) {
    result[i] = [];
    for (let j = 0; j < computedCoords.length; j++) {
      const item = computedCoords[i][j];
      const { x, y } = item;
      result[i].push(GlobalMap[server][x][y]);
    }
  }
  // версия до рефакторинга

  // rangeSize = rangeSize % 2 !== 0 ? rangeSize : rangeSize + 1;
  // const halfSize = Math.floor(rangeSize / 2);

  // let nowX = user.globalMap.centerMap.x - halfSize;
  // let nowY = user.globalMap.centerMap.y - halfSize;
  // if (nowX < 0) nowX += length;
  // if (nowY < 0) nowY += length;
  // for (let i = 0; i < rangeSize; i++) {
  //   result[i] = [];
  //   for (let j = 0; j < rangeSize; j++) {
  //     const x = (nowX + i) % length;
  //     const y = (nowY + j) % length;
  //     result[i].push(GlobalMap[server][x][y]);
  //   }
  // }
  return result;
}

module.exports = getGlobalMapSector;

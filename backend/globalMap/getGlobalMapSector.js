function getGlobalMapSector(user, server) {
  const result = [];
  const length = GlobalMap[server].length;
  const zoom = user.globalMap.zoom;
  let rangeSize = gameVariables.viewSectionGlobalMapNow * zoom; //10*zoom;
  rangeSize = rangeSize % 2 !== 0 ? rangeSize : rangeSize + 1;
  const halfSize = Math.floor(rangeSize / 2);

  let nowX = user.globalMap.centerMap.x - halfSize;
  let nowY = user.globalMap.centerMap.y - halfSize;
  if (nowX < 0) nowX += length;
  if (nowY < 0) nowY += length;
  for (let i = 0; i < rangeSize; i++) {
    result[i] = [];
    for (let j = 0; j < rangeSize; j++) {
      const x = (nowX + i) % length;
			const y = (nowY + j) % length;
      result[i].push(GlobalMap[server][x][y]);
    }
	}
  return result;
}

module.exports = getGlobalMapSector;

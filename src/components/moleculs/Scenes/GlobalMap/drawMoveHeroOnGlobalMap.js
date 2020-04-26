/* eslint-disable */ 
function drawMoveHeroOnGlobalMap() {
  if (this.mode && this.mode !== 'global') return;
  const { ctx, eventList, currentMap, tileWidth, settings, getTileByCoords } = this;
  ctx.fillStyle = settings.baseColor;
  eventList.forEach(event => {
    const { target, init } = event;
    const startCoords = { x: init.x, y: init.y };
    const endCoords = { x: target.x, y: target.y };
    const WorldMap = this.globalConfig.all.WorldMap;
    const sizeMap = WorldMap.numSectionGlobalMap;
    const width = this.tileWidth;
    const height = width / 2;
    let startTile = getTileByCoords(currentMap, startCoords.x, startCoords.y);
    let endTile = getTileByCoords(currentMap, endCoords.x, endCoords.y);
    if (startTile && !endTile) {
      endTile = algebra.getMinPath(startTile, endCoords, sizeMap);
      iso.addCenterPoints(startTile, endTile, height);
    } else if (!startTile && endTile) {
      startTile = algebra.getMinPath(endTile, startCoords, sizeMap);
      iso.addCenterPoints(endTile, startTile, height);
    } else if (!startTile && !endTile) {
      startTile = algebra.getMinPath(currentMap[0][0], startCoords, sizeMap);
      endTile = algebra.getMinPath(startTile, endCoords, sizeMap);
      iso.addCenterPoints(currentMap[0][0], startTile, height);
      iso.addCenterPoints(startTile, endTile, height);
    }
    const baseCoords = [startTile.centerX, startTile.centerY, endTile.centerX, endTile.centerY];
    const fullLength = algebra.getStraightLength(...baseCoords);
    let heroLength = this.getLengthHeroOnStraight(fullLength, event.start, event.end);
    if (heroLength > fullLength) heroLength = fullLength;
    const step = tileWidth / 4;
    for (let i = 0; i < fullLength + 1; i += step) {
      const coords = algebra.getPointOnStraight(...baseCoords, i);
      const { viewportPath } = this;
      const isPoint = ctx.isPointInPath(viewportPath, coords.x, coords.y);
      if (!isPoint) continue;
      ctx.beginPath();
      const r = i > heroLength ? 2 : 4;
      ctx.arc(coords.x, coords.y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
    const heroCoords = algebra.getPointOnStraight(...baseCoords, heroLength);
    this.drawHeroOnMap(ctx, heroCoords);
  });
}

export default drawMoveHeroOnGlobalMap;

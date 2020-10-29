const WorldMap = require('../../globalMap/WorldMap');

function getSectorsForAttack(start, map) {
  const result = [];
  const startX = start.x;
  const startY = start.y;
  result.push(map[startX][startY]);
  const top = map[startX][startY - 1];
  const tileTypes = WorldMap.types;
  if (top && top.type !== tileTypes.town.id) result.push(top);
  const right = map[startX + 1] ? map[startX + 1][startY] : undefined;
  if (right && right.type !== tileTypes.town.id) result.push(right);
  const bottom = map[startX][startY + 1];
  if (bottom && bottom.type !== tileTypes.town.id) result.push(bottom);
  const left = map[startX - 1] ? map[startX - 1][startY] : undefined;
  if (left && left.type !== tileTypes.town.id) result.push(left);
  return result;
}

module.exports = getSectorsForAttack;

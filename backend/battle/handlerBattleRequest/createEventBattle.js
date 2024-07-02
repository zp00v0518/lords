import { Heroes } from '../../heroes/index.js';
import { Event } from '../../events/index.js';
import Battle from '../Battle.js';
import { WorldMap } from '../../globalMap/index.js';

function createEventBattle({ startCoords, endCoords, army, initSector, targetSector, initHero, map = 'region' }) {
  // TODOЖ при атаке на другой регион, для высиления скорости, необходимо использовать другой метод getTimeMoveOnMap
  let time = Heroes.getTimeMove(startCoords, endCoords);
  if (map === 'world') {
    time = WorldMap.getTimeMoveOnMap(startCoords, endCoords);
  }
  const start = new Date().getTime();
  const end = start + time;
  const init = {
    sector: initSector._id,
    race: initSector.town.race,
    user: initSector.userId,
    x: initSector.x,
    y: initSector.y
  };
  let target = init;
  const typeBattle = targetSector === undefined ? Battle.types.region.name : Battle.types.enemyRegion.name;
  if (targetSector !== undefined) {
    target = {
      user: targetSector.userId,
      sector: targetSector._id,
      x: targetSector.x,
      y: targetSector.y
    };
  }
  const data = {
    startCoords,
    endCoords,
    army,
    typeBattle,
    initHero: initHero._id
  };
  return {
    // data: JSON.parse(JSON.stringify(data)),
    data,
    target,
    start,
    end,
    init,
    type: Event.types.battle
  };
}

export default createEventBattle;

const { Heroes } = require('../../heroes');
const { Event } = require('../../events');
const Battle = require('../Battle');

function createEventBattle({ startCoords, endCoords, army, initSector, targetSector, initHero }) {
  const time = Heroes.getTimeMove(startCoords, endCoords);
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

module.exports = createEventBattle;

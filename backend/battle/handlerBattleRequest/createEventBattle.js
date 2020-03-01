const { Heroes } = require('../../heroes');
const { Event } = require('../../events');
const Battle = require('../Battle');

function createEventBattle({ startCoords, endCoords, army, initSector, targetSector }) {
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
  const target = targetSector === undefined ? init : '';
  let typeBattle = '';
  if (targetSector === undefined) {
    typeBattle = Battle.types.region.name;
  }
  const data = {
    startCoords,
    endCoords,
    army,
    typeBattle
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

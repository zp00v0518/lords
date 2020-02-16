const { Heroes } = require("../../heroes");
const { Event } = require("../../events");

function createEventBattle({
  startCoords,
  endCoords,
  army,
  initSector,
  targetSector
}) {
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
  const target = targetSector === undefined ? init : "";
  const data = {
    startCoords,
    endCoords,
    army
  };
  return {
    data: JSON.parse(JSON.stringify(data)),
    target,
    start,
    end,
    init,
    type: Event.types.battle
  };
}

module.exports = createEventBattle;

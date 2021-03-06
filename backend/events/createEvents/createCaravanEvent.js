const Ev = require('../Event');
const Caravan = require('../../caravan/Caravan');

function createCaravanEvent(initSector, targetSector, payload) {
  const init = {
    sector: initSector._id,
    user: initSector.userId,
    x: initSector.x,
    y: initSector.y
  };
  const target = {
    sector: targetSector._id,
    user: targetSector.userId,
    x: targetSector.x,
    y: targetSector.y
  };
  const start = Date.now();
  const end = start + Caravan.getTimeMoveCaravanOnMap(initSector, targetSector);
  const data = {
    payload
  };
  return {
    init,
    target,
    type: Ev.types.sendCaravan,
    start,
    end,
    data
  };
}

module.exports = createCaravanEvent;

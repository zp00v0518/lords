const { getOneTownFromDB, updateStateTown } = require('../../town/DB');
const { inActiveteEvent } = require('../../events/db');
const removeBusyCaravan = require('../removeBusyCaravan');

async function handlerCaravanBackToTownEvent(event) {
  const { serverName, init, data } = event;
  const initSector = await getOneTownFromDB(serverName, init.sector);
  if (!initSector || !initSector.town) {
    return false;
  }
  const { payload } = data;
  const { caravan } = initSector.town;
  removeBusyCaravan(caravan, payload);
  await inActiveteEvent(event);
  await updateStateTown(initSector);
}

module.exports = handlerCaravanBackToTownEvent;

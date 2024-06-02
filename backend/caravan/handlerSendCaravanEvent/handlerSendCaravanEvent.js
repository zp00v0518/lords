const { getOneTownFromDB, updateStateTown } = require('../../town/DB');
const addResourceToStorageFromCaravan = require('../addResourceToStorageFromCaravan');
const createCaravanBackToTownEvent = require('./createCaravanBackToTownEvent');
const { inActiveteEvent, addEventToDB } = require('../../events/db');

async function handlerSendCaravanEvent(event) {
  const { serverName, init, target, data } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  const initSector = await getOneTownFromDB(serverName, init.sector);
  if (!targetSector || !targetSector.town || !initSector || !initSector.town) {
    return false;
  }
  const { payload } = data;
  const { storage } = targetSector.town;
  addResourceToStorageFromCaravan(payload, storage);
  await updateStateTown(targetSector);
  const newEvent = createCaravanBackToTownEvent(event);
  await inActiveteEvent(event);
  await addEventToDB(newEvent, serverName);
}

module.exports = handlerSendCaravanEvent;

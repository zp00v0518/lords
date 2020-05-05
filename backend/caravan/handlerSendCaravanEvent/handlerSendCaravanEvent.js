const { getOneTownFromDB } = require('../../town/DB');
const { updateStateSector } = require('../../sector/db');
const addResourceToStorageFromCaravan = require('../addResourceToStorageFromCaravan');

async function handlerSendCaravanEvent(event) {
  const { serverName, init, target, data } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  const initSector = await getOneTownFromDB(serverName, init.sector);
  if (!targetSector || !targetSector.town || !initSector || !initSector.town) {
    return false;
  }
  const { payload } = data;
  const storage = targetSector.town.storage;
  addResourceToStorageFromCaravan(payload);
}

module.exports = handlerSendCaravanEvent;

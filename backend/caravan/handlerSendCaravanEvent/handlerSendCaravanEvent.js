import { getOneTownFromDB, updateStateTown } from '../../town/DB/index.js';
import addResourceToStorageFromCaravan from '../addResourceToStorageFromCaravan.js';
import createCaravanBackToTownEvent from './createCaravanBackToTownEvent.js';
import { inActiveteEvent, addEventToDB } from '../../events/db/index.js';

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

export default handlerSendCaravanEvent;

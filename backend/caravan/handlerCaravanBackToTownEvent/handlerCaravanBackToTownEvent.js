import { getOneTownFromDB, updateStateTown } from '../../town/DB/index.js';
import { inActiveteEvent } from '../../events/db/index.js';
import removeBusyCaravan from '../removeBusyCaravan.js';

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

export default handlerCaravanBackToTownEvent;

import upValueInStorage from '../../town/storage/upValueInStorage.js';
import { updateStateTown } from '../../town/DB/index.js';
import { inActiveteEvent } from '../../events/db/index.js';
import { updateStateRegion } from '../../region/db/index.js';

async function handlerStopMineEvent(event, sector) {
  const { data } = event;
  const { mineCoords } = data;
  const region = sector.region;
  const mine = region[mineCoords.x][mineCoords.y].sector;
  const workSection = mine.work;
  const { storage } = sector.town;
  upValueInStorage(mine.type, workSection.addValue, storage);
  workSection.is = true;
  workSection.date = 0;
  await updateStateTown(sector);
  await updateStateRegion(sector);
  await inActiveteEvent(event);
}

export default handlerStopMineEvent

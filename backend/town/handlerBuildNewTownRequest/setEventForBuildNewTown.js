import createBuildNewTownEvent from './createBuildNewTownEvent.js';
import { addEventToDB } from '../../events/index.js';

async function setEventForBuildNewTown(sector, targetSector, hero, race) {
  const ev = createBuildNewTownEvent(sector, targetSector, hero, race);
  const result = await addEventToDB(ev, sector.serverName);
  return result;
}

export default setEventForBuildNewTown;

import { inActiveteEvent } from '../../events/db/index.js';
import { getOneTownFromDB } from '../DB/index.js';
import { transferHeroBetweenTown, getHeroesFromDB, heroActivate } from '../../heroes/db/index.js';
import { setControlWeightAfterTransferHero } from '../../heroes/methods/index.js';
import { getOneSectorForGlobalMap } from '../../globalMap/db/index.js';

async function handlerHeroTransferEvent(event) {
  const { serverName, target, init, data } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  const hero = await getHeroesFromDB(serverName, { heroId: data.initHero });
  if (!targetSector && hero) {
    await heroActivate(serverName, hero._id);
    return;
  }
  if (targetSector && !hero) {
    await inActiveteEvent(event);
    return;
  }
  await transferHeroBetweenTown(serverName, hero._id, init.sector, target.sector);
  await setControlWeightAfterTransferHero(serverName, hero, init.sector, target.sector);
  await heroActivate(serverName, hero._id);
  const newSector = await getOneSectorForGlobalMap(serverName, targetSector._id);
  global.GlobalMap[serverName][targetSector.x][targetSector.y] = newSector;
  inActiveteEvent(event);
}

export default handlerHeroTransferEvent;

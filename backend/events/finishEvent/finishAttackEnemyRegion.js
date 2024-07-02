import { getOneTownFromDB, updateStateTown } from '../../town/DB/index.js';
import { addLootResourcesToStorage } from '../../town/storage/methods/index.js';
import { inActiveteEvent } from '../../events/db/index.js';
import { updateHeroInDB } from '../../heroes/db/index.js';

async function finishAttackEnemyRegion(event) {
  const { target, serverName } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  if (!targetSector) {
    console.log('Sector not found');
    return;
  }
  const { storage } = targetSector.town;
  const { data } = event;
  const { result, initHero } = data;
  if (!result || !result.loot || !result.loot.resources) {
    console.log('Loot not found');
    return;
  }
  const resourcesLoot = result.loot.resources;
  addLootResourcesToStorage(resourcesLoot, storage);
  await updateStateTown(targetSector);
  await updateHeroInDB(serverName, initHero, { active: true });
  await inActiveteEvent(event);
}

export default finishAttackEnemyRegion;

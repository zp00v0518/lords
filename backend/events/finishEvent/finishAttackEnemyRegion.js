const template = require('template_func');
const console = new template.Log(__filename);
const { getOneTownFromDB, updateStateTown } = require('../../town/db');
const { addLootResourcesToStorage } = require('../../town/storage/methods');
const { inActiveteEvent } = require('../../events/db');
const { updateHeroInDB } = require('../../heroes/db');

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

module.exports = finishAttackEnemyRegion;

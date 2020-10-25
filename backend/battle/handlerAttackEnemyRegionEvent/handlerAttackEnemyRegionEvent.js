const template = require('template_func');
const console = new template.Log(__filename);
const { getUsersTownFromDB } = require('../../town');
const { getSectorsForAttack, Region } = require('../../region');
const { getLootResources } = require('../../region/mine');
const { calcStorageNowValue, reduceGrowthResources } = require('../../town/storage');
const { createBackToTownEvent, createStopMineEvent } = require('../../events/createEvents');
const { addEventToDB, inActiveteEvent } = require('../../events/db');
const resources = require('../../resources');

async function handlerAttackEnemyRegionEvent(event, defTown) {
  const { serverName, init, data } = event;
  const initTowns = await getUsersTownFromDB(init.user, serverName);
  // TODO: подумать над действиями, когда, якобы, герой атакует собственный город;
  if (initTowns.find(i => i.id.toString() === defTown._id.toString())) return;
  const f = initTowns.filter(i => i.town.army.units.length > 0);
  const { goal } = data;
  const { coords } = goal;
  const targetSectors = getSectorsForAttack(coords, defTown.region);
  const mineId = Region.types.mine.id;
  const sectorsWithMine = targetSectors.filter(i => i.type === mineId);
  const resourcesLoot = getLootResources(sectorsWithMine, coords);
  const storage = defTown.town.storage;
  calcStorageNowValue(storage);
  reduceGrowthResources(sectorsWithMine, storage);
  const resultAttack = {
    loot: {
      resources: resourcesLoot
    }
  };
  const backToTownEvent = createBackToTownEvent(event, resultAttack);
  await addEventToDB(backToTownEvent, serverName);
  for (const mine of sectorsWithMine) {
    const workSection = mine.sector.work;
    const stopMineEvent = createStopMineEvent(serverName, event.target.user, workSection.date, {
      x: mine.x,
      y: mine.y
    });
    await addEventToDB(stopMineEvent, serverName);
  }
  await inActiveteEvent(event);
}

module.exports = handlerAttackEnemyRegionEvent;

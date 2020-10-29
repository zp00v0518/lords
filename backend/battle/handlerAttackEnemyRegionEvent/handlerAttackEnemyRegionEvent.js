const template = require('template_func');
const console = new template.Log(__filename);
const { getUsersTownFromDB, updateStateTown } = require('../../town');
const { getSectorsForAttack, Region, updateStateRegion } = require('../../region');
const { getLootResources } = require('../../region/mine');
const { calcStorageNowValue, reduceGrowthResources } = require('../../town/storage');
const { createBackToTownEvent } = require('../../events/createEvents');
const { addEventToDB, inActiveteEvent, getOneEventFromDb, updateEndEventInDb } = require('../../events/db');
const Event = require('../../events/Event');
const createAndAddEventStopMine = require('./createAndAddEventStopMine');

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
  const storage = defTown.town.storage;
  sectorsWithMine.forEach(mine => {
    const workSection = mine.sector.work;
    if (workSection.is) {
      reduceGrowthResources(mine, storage);
      workSection.is = false;
    }
  });
  const resourcesLoot = getLootResources(sectorsWithMine, coords);
  calcStorageNowValue(storage);
  await updateStateTown(defTown);
  const resultAttack = {
    loot: {
      resources: resourcesLoot
    }
  };
  const backToTownEvent = createBackToTownEvent(event, resultAttack, false);
  const targetForEvent = {
    user: event.target.user,
    sector: defTown._id
  };
  await addEventToDB(backToTownEvent, serverName);
  for (const mine of sectorsWithMine) {
    if (!mine.events || mine.events.length === 0) {
      await createAndAddEventStopMine(event, mine, targetForEvent);
    } else {
      for (const eventId of mine.events) {
        const eventFromDb = await getOneEventFromDb(serverName, eventId);
        if (eventFromDb.type === Event.types.stopMine) {
          const workSection = mine.sector.work;
          await updateEndEventInDb(serverName, eventId, workSection.date);
        } else {
          await createAndAddEventStopMine(event, mine, targetForEvent);
        }
      }
    }
  }
  await updateStateRegion(defTown);
  await inActiveteEvent(event);
}

module.exports = handlerAttackEnemyRegionEvent;

const { getOneTownFromDB } = require('../DB');
const { inActiveteEvent } = require('../../events/db');
const createTown = require('../createTown');
const WorldMap = require('../../globalMap/WorldMap');
const { getArmyRange, changeArmyOnRegion } = require('../../army');
const { updateStateSector } = require('../../sector');
const { getUsersTownFromDB } = require('../../town/DB');
const { getOneUserFromDB } = require('../../user');
const { transferHeroBetweenTown, getHeroesFromDB, heroActivate } = require('../../heroes/db');
const { getOneSectorForGlobalMap } = require('../../globalMap/db');
const { createBackToTownEvent } = require('../../events/createEvents');
const { addEventToDB } = require('../../events/db');

async function handlerBuildNewTown(event) {
  const { serverName, target, init, data } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  if (!targetSector || targetSector.town) {
    // здесь надо повернуть героя назад (backTotown)
    const backToTownEvent = createBackToTownEvent(event);
    await addEventToDB(backToTownEvent, serverName);
    inActiveteEvent(event);
    return;
  }
  const { race } = data;
  const user = await getOneUserFromDB(init.user);
  const hero = await getHeroesFromDB(serverName, { heroId: data.initHero });
  if (!user || !hero) {
    inActiveteEvent(event);
    return;
  }
  const newTown = createTown({ race, sectorId: targetSector._id });
  const userTowns = await getUsersTownFromDB(init.user, serverName);
  const armyRange = getArmyRange(userTowns.length + 1);
  const region = targetSector.region;
  changeArmyOnRegion(region, armyRange);
  const newDocs = {
    region,
    town: newTown,
    nickName: user.nickName,
    type: WorldMap.types.town.id,
    userId: user._id
  };
  await updateStateSector(targetSector, newDocs);
  await transferHeroBetweenTown(serverName, hero._id, init.sector, target.sector);
  await heroActivate(serverName, hero._id);

  const newSector = await getOneSectorForGlobalMap(serverName, targetSector._id);
  global.GlobalMap[serverName][targetSector.x][targetSector.y] = newSector;
  
  inActiveteEvent(event);
  return;
}

module.exports = handlerBuildNewTown;

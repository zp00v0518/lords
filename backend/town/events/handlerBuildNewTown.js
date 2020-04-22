const { getOneTownFromDB } = require('../DB');
const { finishEventGlobal } = require('../../events/db');
const createTown = require('../createTown');
const WorldMap = require('../../globalMap/WorldMap');
const { getArmyRange, changeArmyOnRegion } = require('../../army');
const { updateStateSector } = require('../../sector');
const { getUsersTownFromDB } = require('../../town/DB');
const { getOneUserFromDB } = require('../../user');
const { transferHeroBetweenTown, getHeroesFromDB } = require('../../heroes/db');

async function handlerBuildNewTown(event) {
  const { serverName, target, init, data } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  if (!targetSector || targetSector.town) {
    // здесь надо повернуть героя назад (backTotown)
    finishEventGlobal(event);
    return;
  }
  const { race } = data;
  const user = await getOneUserFromDB(init.user);
  const hero = await getHeroesFromDB(serverName, { heroId: data.initHero });
  if (!user || !hero) {
    finishEventGlobal(event);
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
  transferHeroBetweenTown(serverName, hero._id, init.sector, target.sector)
  finishEventGlobal(event);
  return;
}

module.exports = handlerBuildNewTown;

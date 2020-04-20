const { getOneTownFromDB } = require('../DB');
const { finishEventGlobal } = require('../../events/db');
const createTown = require('../createTown');
const WorldMap = require('../../globalMap/WorldMap');
const {getArmyRange, changeArmyOnRegion} = require('../../army');
const {updateStateSector} = require('../../sector');
const {getUsersTownFromDB} = require('../../town/DB');
const {getOneUserFromDB} = require('../../user');

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
  const newTown = createTown({ race, sectorId: targetSector._id });
  const userTowns = await getUsersTownFromDB(init.user, serverName);
  console.log(userTowns)
  const armyRange = getArmyRange(userTowns.length + 1);
  const region = targetSector.region;
  changeArmyOnRegion(region, armyRange);
  const newDocs = {
    region,
    town: newTown,
    nickName: user.nickName,
    type: WorldMap.types.town.id,
    userId: user._id
  }
  const resultUpdate = await updateStateSector(targetSector, newDocs);
  console.log(resultUpdate);
  console.log(user)
  console.log(newTown);
  finishEventGlobal(event);
  // console.log(targetSector)
  return;
}

module.exports = handlerBuildNewTown;

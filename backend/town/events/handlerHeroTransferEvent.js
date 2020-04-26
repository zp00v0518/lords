const { inActiveteEvent } = require('../../events/db');
const { getOneTownFromDB } = require('../DB');
const { transferHeroBetweenTown, getHeroesFromDB, heroActivate } = require('../../heroes/db');
const { getOneSectorForGlobalMap } = require('../../globalMap/db');

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
  await heroActivate(serverName, hero._id);
  const newSector = await getOneSectorForGlobalMap(serverName, targetSector._id);
  global.GlobalMap[serverName][targetSector.x][targetSector.y] = newSector;
  inActiveteEvent(event);
}

module.exports = handlerHeroTransferEvent;

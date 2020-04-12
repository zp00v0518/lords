const createBuildNewTownEvent = require('./createBuildNewTownEvent');
const {addEventToDB} = require('../../events');

async function setEventForBuildNewTown(sector, targetSector, hero) {
  const ev = createBuildNewTownEvent(sector, targetSector, hero);
  const result = await addEventToDB(ev, sector.serverName);
  return result;
}

module.exports = setEventForBuildNewTown;

const createBuildNewTownEvent = require('./createBuildNewTownEvent');
const {addEventToDB} = require('../../events');

async function setEventForBuildNewTown(sector, targetSector, hero, race) {
  const ev = createBuildNewTownEvent(sector, targetSector, hero, race);
  const result = await addEventToDB(ev, sector.serverName);
  return result;
}

module.exports = setEventForBuildNewTown;

const createBuildNewTownEvent = require('./createBuildNewTownEvent');

async function setEventForBuildNewTown(sector, targetSector, hero) {
  const event = createBuildNewTownEvent(sector, targetSector, hero);
  return event;
}

module.exports = setEventForBuildNewTown;

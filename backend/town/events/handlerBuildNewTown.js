const { getOneTownFromDB } = require('../DB');
const { finishEventGlobal } = require('../../events/db');

async function handlerBuildNewTown(event) {
  const { serverName, target, init } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  if (!targetSector || targetSector.town) {
    finishEventGlobal(event);
    return;
  }
	finishEventGlobal(event);
	// console.log(targetSector)
  return;
}

module.exports = handlerBuildNewTown;

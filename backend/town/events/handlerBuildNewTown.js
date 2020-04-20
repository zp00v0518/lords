const { getOneTownFromDB } = require('../DB');
const { finishEventGlobal } = require('../../events/db');
const createTown = require('../createTown');

async function handlerBuildNewTown(event) {
  const { serverName, target, init } = event;
  const targetSector = await getOneTownFromDB(serverName, target.sector);
  if (!targetSector || targetSector.town) {
    // здесь надо повернуть героя назад (backTotown)
    finishEventGlobal(event);
    return;
  }
  console.log(event)
	finishEventGlobal(event);
	// console.log(targetSector)
  return;
}

module.exports = handlerBuildNewTown;

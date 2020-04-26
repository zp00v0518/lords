const createHeroTransferEvent = require('./createHeroTransferEvent');
const { addEventToDB } = require('../../events');

async function setEventHeroTransfer(initSector, targetSector, hero) {
  const ev = createHeroTransferEvent(initSector, targetSector, hero);
  const result = await addEventToDB(ev, initSector.serverName);
  return result;
}

module.exports = setEventHeroTransfer;

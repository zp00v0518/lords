import createHeroTransferEvent from './createHeroTransferEvent.js';
import { addEventToDB } from '../../events/index.js';

async function setEventHeroTransfer(initSector, targetSector, hero) {
  const ev = createHeroTransferEvent(initSector, targetSector, hero);
  const result = await addEventToDB(ev, initSector.serverName);
  return result;
}

export default setEventHeroTransfer;

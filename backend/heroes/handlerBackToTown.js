import inActiveteEvent from '../events/db/inActiveteEvent.js';
import { finishAttackEnemyRegion } from '../events/finishEvent/index.js';
import { updateHeroInDB } from '../heroes/db/index.js';
const { Battle } = require('../battle');

async function handlerBackToTown(event) {
  const { serverName, data } = event;
  if (data.typeBattle === Battle.types.enemyRegion.name) {
    await finishAttackEnemyRegion(event);
    return;
  }
  const { initHero } = data;
  await updateHeroInDB(serverName, initHero, { active: true });
  await inActiveteEvent(event);
}

module.exports = handlerBackToTown;

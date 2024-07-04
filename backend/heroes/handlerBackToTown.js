import inActiveteEvent from '../events/db/inActiveteEvent.js';
import finishEvent from '../events/finishEvent/index.js';
const { finishAttackEnemyRegion } = finishEvent;
import { updateHeroInDB } from '../heroes/db/index.js';
import { Battle } from '../battle/index.js';

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

export default handlerBackToTown;

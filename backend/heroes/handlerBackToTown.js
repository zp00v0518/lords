const template = require('template_func');
const console = new template.Log(__filename);
const inActiveteEvent = require('../events/db/inActiveteEvent');
const { finishAttackEnemyRegion } = require('../events/finishEvent');
const { updateHeroInDB } = require('../heroes/db');
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

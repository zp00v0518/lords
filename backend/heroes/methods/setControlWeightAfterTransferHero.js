const template = require('template_func');
const console = new template.Log(__filename);
const { getControlWeightFromArmy } = require('../../zoneControl/methods');
const { setValueInSectorById } = require('../../zoneControl/db');

async function setControlWeightAfterTransferHero(server, hero, initId, targetId) {
  const army = hero.army;
  const weight = getControlWeightFromArmy(army);
  await setValueInSectorById(server, targetId, weight);
  await setValueInSectorById(server, initId, -weight);
}

module.exports = setControlWeightAfterTransferHero;

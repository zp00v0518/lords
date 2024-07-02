import { getControlWeightFromArmy } from '../../zoneControl/methods/index.js';
import { setValueInSectorById } from '../../zoneControl/db/index.js';

async function setControlWeightAfterTransferHero(server, hero, initId, targetId) {
  const army = hero.army;
  const weight = getControlWeightFromArmy(army);
  await setValueInSectorById(server, targetId, weight);
  await setValueInSectorById(server, initId, -weight);
}

export default setControlWeightAfterTransferHero;

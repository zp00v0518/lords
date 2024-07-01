import Race from '../../race/Race.js';
import typeResources from '../../resources/type_resources.js';

function getControlWeightFromBuilding(building, raceIndex) {
  const raceName = Race.typeList[raceIndex];
  const raceBuildings = Race[raceName].buildings;
  const target = raceBuildings[building.type];
  const price = target.lvl[building.lvl].price;
  const gold = price.find(i => i.resource === typeResources.gold);
  return gold.value;
}

export default getControlWeightFromBuilding;

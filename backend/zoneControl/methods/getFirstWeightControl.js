import getControlWeightFromBuilding from './getControlWeightFromBuilding.js';
import Town from '../../town/Town.js';
const listBuilding = Town.listBuildings;

function getFirstWeightControl(townElem) {
  let result = 0;
  Object.values(listBuilding).forEach(item => {
    const key = item.name;
    const building = townElem[key];
    if (!building || building.lvl === 0) return;
    const weight = getControlWeightFromBuilding(building, townElem.race);
    result += weight;
  });
  return result;
}
export default getFirstWeightControl;

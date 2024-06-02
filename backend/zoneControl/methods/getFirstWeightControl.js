const template = require('template_func');
const console = new template.Log(__filename);
const getControlWeightFromBuilding = require('./getControlWeightFromBuilding');
const Town = require('../../town/Town');
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
module.exports = getFirstWeightControl;

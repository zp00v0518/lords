const template = require('template_func');
const console = new template.Log(__filename);
const Race = require('../../race/Race');
const typeResources = require('../../resources/type_resources');

function getControlWeight(building, raceIndex) {
  const raceName = Race.typeList[raceIndex];
  const raceBuildings = Race[raceName].buildings;
  const target = raceBuildings[building.type];
  const price = target.lvl[building.lvl].price;
  const gold = price.find(i => i.resource === typeResources.gold);
  return gold.value;
}

module.exports = getControlWeight;

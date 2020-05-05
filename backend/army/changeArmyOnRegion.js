const Race = require('../race/Race');
const regionTypes = require('../region/Region').types;
const { createArmy } = require('../army');

function changeArmyOnRegion(region, range) {
  region.forEach(sectorRow => {
    sectorRow.forEach(tile => {
      if (tile.type === regionTypes.forest.id || tile.type === regionTypes.empty.id) {
        const armyRace = Race.getRandom();
        const units = Object.values(Race[armyRace.name].units);
        const army = createArmy({ range, units });
        tile.army = army;
        tile.type = regionTypes.forest.id;
      }
    });
  });
}

module.exports = changeArmyOnRegion;

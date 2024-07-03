import Race from '../race/Race.js';
import Region from '../region/Region.js';
const regionTypes = Region.types;
import { createArmy } from './baseArmy/index.js';

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

export default changeArmyOnRegion;

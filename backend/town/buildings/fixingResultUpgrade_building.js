// const { updateDB } = require("../../tube.js");
import { inActiveteEvent } from '../../events/db/index.js';
import { updateStateTown } from '../DB/index.js';

async function fixingResultUpgrade_building(eventItem, sector) {
  let typeBuilding = eventItem.data.type;
  const building = sector.town[typeBuilding];
  building.upgrade.is = false;
  building.lvl++;
  building.upgrade.date = 0;
  building.work.is = true;
  try {
    if (eventItem) {
      await inActiveteEvent(eventItem);
    }
    await updateStateTown(sector);
  } catch (err) {
    console.log('fixingResultUpgrade_building  ', err);
  }
  return building;
}

export default fixingResultUpgrade_building;

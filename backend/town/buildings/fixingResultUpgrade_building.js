// const { updateDB } = require("../../tube.js");
const { inActiveteEvent } = require('../../events/db');
const { updateStateTown } = require('../DB');

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
    console.log(__filename, err);
  }
}

module.exports = fixingResultUpgrade_building;

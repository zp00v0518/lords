const { updateDB } = require('../../tube.js');
const update = new updateDB();

function fixingResultUpgrade_building(building, eventItem) {
  building.upgrade.is = false;
  building.lvl++;
  building.upgrade.date = 0;
  if (eventItem) {
    const optionsForUpdate = {
      collectionName: eventItem.serverName,
      filtr: { _id: eventItem._id },
      updateDoc: { $set: { status: false } }
    };
    update.one(optionsForUpdate).then(result => {});
  }
}

module.exports = fixingResultUpgrade_building;

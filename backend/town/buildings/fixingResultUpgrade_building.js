// const { updateDB } = require("../../tube.js");
const { updateDB } = require("../../workWithMongoDB");
const update = new updateDB();

function fixingResultUpgrade_building(
  building,
  eventItem,
  callback = () => {}
) {
  return new Promise((resolve, reject) => {
    building.upgrade.is = false;
    building.lvl++;
    building.upgrade.date = 0;
    building.work.is = true;
    if (eventItem) {
      const optionsForUpdate = {
        collectionName: eventItem.serverName,
        filtr: { _id: eventItem._id },
        updateDoc: { $set: { status: false } }
      };
      update
        .one(optionsForUpdate)
        .then(result => {
          callback(null, result);
          return resolve(result);
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    }
    callback(null);
    return resolve();
  });
}

module.exports = fixingResultUpgrade_building;

// const Mine = gameVariables.mine;
const Mine = require("../mine/Mine");
const { updateDB } = require("../../tube.js");
const update = new updateDB();
const { addValueToStorage } = require("../../town/storage");

function fixingResultUpgradeMine(mine, eventItem, sector, callback = () => {}) {
  return new Promise((resolve, reject) => {
    // важно зафиксировать предыдущее число до всех вычеслений
    const previosValue = mine.work.addValue;
    mine.upgrade.is = false;
    mine.lvl++;
    mine.work.addValue = mine.lvl * Mine.valueMining[mine.type];
    mine.upgrade.date = 0;
    const storage = sector.town.storage;
    if (eventItem) {
      const optionsForUpdate = {
        collectionName: eventItem.serverName,
        filtr: { _id: eventItem._id },
        updateDoc: { $set: { status: false } }
      };
      update
        .one(optionsForUpdate)
        .then(result => {
          const dif = mine.work.addValue - previosValue;
          addValueToStorage(mine.type, dif, storage);
          optionsForUpdate.filtr = { _id: sector._id };
          optionsForUpdate.updateDoc = sector;
          update.replaceOne(optionsForUpdate).then(resultReplace => {
            callback(null, result);
            return resolve(result);
          });
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    }
  });
}

module.exports = fixingResultUpgradeMine;
